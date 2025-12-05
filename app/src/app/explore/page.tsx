import { CampaignCard } from "@/components/CampaignCard";
import * as anchor from "@coral-xyz/anchor";
import scholrIdl from "@/idl/scholr_program.json" assert { type: "json" };
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "engineering", label: "Engineering" },
  { id: "hardware", label: "Hardware" },
  { id: "arts", label: "Arts" },
  { id: "social", label: "Social Impact" },
];

async function fetchCampaigns() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const programId = new PublicKey((scholrIdl as any).address);

  // Dummy wallet provider for read-only
  const provider = new anchor.AnchorProvider(
    connection,
    {
      publicKey: PublicKey.default,
      signTransaction: async (tx: any) => tx,
      signAllTransactions: async (txs: any[]) => txs,
    } as any,
    { preflightCommitment: "confirmed" }
  );

  const program = new anchor.Program(
    scholrIdl as anchor.Idl,
    programId,
    provider
  );

  const all = await (program.account as any)["campaign"].all();
  return all.map(({ publicKey, account }) => ({
    slug: publicKey.toBase58(),
    title: account.title as string,
    description: (account.metadataUri as string) ?? "",
    goal: Number(account.goal),
    raised: Number(account.raised),
    creator: (account.authority as anchor.web3.PublicKey).toBase58(),
    category: "Research",
  }));
}

export default async function ExplorePage() {
  const campaigns = await fetchCampaigns();
  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 lg:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-100 mb-2 sm:mb-3">
            Explore projects
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base max-w-lg">
            Discover student-led innovation and support projects that matter. 
            Every contribution earns you a soulbound Patron Badge.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors min-h-[44px] ${
                cat.id === "all"
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">{campaigns.length} projects</p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.slug} {...campaign} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 sm:mt-12 text-center">
          <button className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 rounded-xl transition-colors min-h-[48px]">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}
