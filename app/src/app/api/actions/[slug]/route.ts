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
import scholrIdl from "../../../../idl/scholr_program.json" assert { type: "json" };
import { TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";

// Mock campaign data - in production, fetch from on-chain or database
const MOCK_CAMPAIGNS: Record<string, {
  title: string;
  description: string;
  goal: number;
  raised: number;
  authority: string;
  image: string;
}> = {
  "rust-os": {
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project. Need funds for a Raspberry Pi cluster!",
    goal: 200,
    raised: 50,
    authority: "11111111111111111111111111111111", // placeholder
    image: "https://raw.githubusercontent.com/nicosantangelo/Solana-Buttons/master/docs/images/blink-preview.png",
  },
  "ml-research": {
    title: "ML Research: Climate Prediction",
    description: "Training neural networks to predict local weather patterns. Need GPU cloud credits!",
    goal: 500,
    raised: 125,
    authority: "11111111111111111111111111111111",
    image: "https://raw.githubusercontent.com/nicosantangelo/Solana-Buttons/master/docs/images/blink-preview.png",
  },
};

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
  const campaign = MOCK_CAMPAIGNS[slug];

  if (!campaign) {
    return new Response(JSON.stringify({ error: "Campaign not found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  const percentRaised = Math.round((campaign.raised / campaign.goal) * 100);
  
  const payload: ActionGetResponse = {
    type: "action",
    icon: campaign.image,
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
    const campaign = MOCK_CAMPAIGNS[slug];

    if (!campaign) {
      return new Response(JSON.stringify({ error: "Campaign not found" }), {
        status: 404,
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
      programId as any,
      provider as any
    );

    // Derive campaign PDA from authority placeholder and title
    const authority = new PublicKey(campaign.authority);
    const campaignPda = getCampaignPda(authority, campaign.title);

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
      .donate(new anchor.BN(Math.round(amount * 1_000_000))) // amount in micro units for demo
      .accounts({
        campaign: campaignPda,
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
        message: `Thank you for supporting "${campaign.title}" with ${amount} SOL! 🎉 Your Patron Badge is on its way.`,
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
