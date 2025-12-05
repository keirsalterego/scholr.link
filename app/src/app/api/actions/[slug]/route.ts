import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import { TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

// Devnet connection
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const programId = new PublicKey((scholrIdl as any).address);

function getCampaignPda(authority: PublicKey, title: string): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from("campaign"), authority.toBuffer(), Buffer.from(title)],
    programId
  );
  return pda;
}

// GET: Returns the Blink metadata
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // slug is the campaign PDA (base58)
  let pda: PublicKey;
  try {
    pda = new PublicKey(slug);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid campaign address" }), {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  const idl = scholrIdl as any;
  const coder = new anchor.BorshAccountsCoder(idl);
  const info = await connection.getAccountInfo(pda);
  if (!info) {
    return new Response(JSON.stringify({ error: "Campaign not found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  const decoded: any = coder.decode("Campaign", info.data);
  const campaign = {
    title: decoded.title as string,
    description: (decoded.metadataUri as string) ?? "",
    goal: Number(decoded.goal),
    raised: Number(decoded.raised),
    authority: (decoded.authority as PublicKey).toBase58(),
  };

  const percentRaised = Math.round((campaign.raised / campaign.goal) * 100);
  
  const payload: ActionGetResponse = {
    type: "action",
    icon: "https://raw.githubusercontent.com/nicosantangelo/Solana-Buttons/master/docs/images/blink-preview.png",
    title: campaign.title,
    description: `${campaign.description}\n\n💰 ${campaign.raised} SOL / ${campaign.goal} SOL raised (${percentRaised}%)`,
    label: "Fund this project",
    links: {
      actions: [
        {
          type: "transaction",
          label: "Donate 0.25 SOL",
          href: `/api/actions/${slug}?amount=0.25`,
        },
        {
          type: "transaction",
          label: "Donate 1 SOL",
          href: `/api/actions/${slug}?amount=1`,
        },
        {
          type: "transaction",
          label: "Donate 2.5 SOL",
          href: `/api/actions/${slug}?amount=2.5`,
        },
        {
          type: "transaction",
          label: "Custom Amount",
          href: `/api/actions/${slug}?amount={amount}`,
          parameters: [
            {
              name: "amount",
              label: "Enter SOL amount",
              required: true,
              type: "number",
            },
          ],
        },
      ],
    },
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      ...ACTIONS_CORS_HEADERS,
      "Content-Type": "application/json",
    },
  });
}

// OPTIONS: CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

// POST: Build and return the transaction
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    let pda: PublicKey;
    try {
      pda = new PublicKey(slug);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid campaign address" }), {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const url = new URL(request.url);
    const amountParam = url.searchParams.get("amount");
    const amount = amountParam ? parseFloat(amountParam) : 5;

    if (isNaN(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const body: ActionPostRequest = await request.json();
    const userPubkey = new PublicKey(body.account);

    // Set up Anchor provider pointing to devnet with a dummy wallet (fee payer is the user)
    const provider = new anchor.AnchorProvider(
      connection,
      {
        publicKey: userPubkey,
        signTransaction: async (tx: Transaction) => tx,
        signAllTransactions: async (txs: Transaction[]) => txs,
      } as any,
      { preflightCommitment: "confirmed" }
    );
    const program = new anchor.Program(
      scholrIdl as anchor.Idl,
      programId,
      provider
    );

    // Fetch campaign to include title in message
    const account = await (program.account as any)["campaign"].fetch(pda);
    const title = (account.title as string) ?? "this campaign";

    // Generate a new mint keypair for Token-2022 badge
    const mint = anchor.web3.Keypair.generate();
    const tokenAccount = getAssociatedTokenAddressSync(
      mint.publicKey,
      userPubkey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    // Build the donate instruction using Anchor's method builder
    const ix = await program.methods
      .donate(new anchor.BN(Math.round(amount * LAMPORTS_PER_SOL)))
      .accounts({
        campaign: pda,
        signer: userPubkey,
        mint: mint.publicKey,
        tokenAccount,
        systemProgram: anchor.web3.SystemProgram.programId,
        token2022Program: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([mint])
      .instruction();

    const transaction = new Transaction().add(ix);

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = userPubkey;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: `Thank you for supporting "${title}" with ${amount} SOL! 🎉 Your Patron Badge is on its way.`,
      },
    });

    return new Response(JSON.stringify(payload), {
      headers: {
        ...ACTIONS_CORS_HEADERS,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing donation:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create transaction" }),
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
}
