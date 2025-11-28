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
  SystemProgram,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

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
    description: `${campaign.description}\n\n💰 $${campaign.raised} / $${campaign.goal} raised (${percentRaised}%)`,
    label: "Fund this project",
    links: {
      actions: [
        {
          type: "transaction",
          label: "Donate 5 USDC",
          href: `/api/actions/${slug}?amount=5`,
        },
        {
          type: "transaction",
          label: "Donate 20 USDC",
          href: `/api/actions/${slug}?amount=20`,
        },
        {
          type: "transaction",
          label: "Donate 50 USDC",
          href: `/api/actions/${slug}?amount=50`,
        },
        {
          type: "transaction",
          label: "Custom Amount",
          href: `/api/actions/${slug}?amount={amount}`,
          parameters: [
            {
              name: "amount",
              label: "Enter USDC amount",
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

    // For demo purposes, we're using SOL instead of USDC
    // In production, you'd use SPL Token transfer to campaign escrow
    const campaignAuthority = new PublicKey(campaign.authority);
    
    // Create a simple SOL transfer transaction (placeholder for actual program call)
    // In production, this would invoke the Anchor program's donate instruction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userPubkey,
        toPubkey: campaignAuthority,
        lamports: amount * LAMPORTS_PER_SOL * 0.01, // Demo: 0.01 SOL per "USDC"
      })
    );

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.lastValidBlockHeight = lastValidBlockHeight;
    transaction.feePayer = userPubkey;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: `Thank you for supporting "${campaign.title}" with ${amount} USDC! 🎉 Your Patron Badge is on its way.`,
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
