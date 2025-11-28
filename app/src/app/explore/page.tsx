import { CampaignCard } from "@/components/CampaignCard";

// Mock campaigns for explore page
const ALL_CAMPAIGNS = [
  {
    slug: "rust-os",
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project. Need funds for a Raspberry Pi cluster!",
    goal: 200,
    raised: 50,
    creator: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    category: "Engineering",
  },
  {
    slug: "ml-research",
    title: "ML Research: Climate Prediction",
    description: "Training neural networks to predict local weather patterns using historical data. Need GPU cloud credits!",
    goal: 500,
    raised: 125,
    creator: "8yLLtg3DX98e08UKSEqcE6kCljfmU8nfQc84qTJosgBtV",
    category: "Research",
  },
  {
    slug: "robotics-arm",
    title: "3D Printed Robotic Arm",
    description: "Building a low-cost prosthetic arm prototype using 3D printing and Arduino for accessibility research.",
    goal: 350,
    raised: 280,
    creator: "9zMMug4EY09f19VLTFrdF7lDkmgnV9ogRd95rUKptgCuW",
    category: "Hardware",
  },
  {
    slug: "blockchain-voting",
    title: "Decentralized Voting System",
    description: "Creating a transparent and secure voting platform for student government elections using Solana.",
    goal: 300,
    raised: 45,
    creator: "AaMMug5FZ10g20WMUGseG8mEknhW0phrSe06sVLqueDxX",
    category: "Engineering",
  },
  {
    slug: "quantum-sim",
    title: "Quantum Computing Simulator",
    description: "Developing an educational quantum circuit simulator to help students learn quantum programming concepts.",
    goal: 450,
    raised: 200,
    creator: "BbNNvh6GA11h31XNVHtfH9nFlniX1qisTo17tWMrvfEyY",
    category: "Research",
  },
  {
    slug: "eco-monitor",
    title: "Campus Eco-Monitor IoT",
    description: "Building IoT sensors to monitor air quality, noise levels, and energy usage across campus buildings.",
    goal: 600,
    raised: 420,
    creator: "CcOOwi7HB22i42YOWIugI0oGmonY2rjtUp28uXNswgFzZ",
    category: "Hardware",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "engineering", label: "Engineering" },
  { id: "hardware", label: "Hardware" },
  { id: "arts", label: "Arts" },
  { id: "social", label: "Social Impact" },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-3">
            Explore projects
          </h1>
          <p className="text-zinc-500 max-w-lg">
            Discover student-led innovation and support projects that matter. 
            Every contribution earns you a soulbound Patron Badge.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
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
          <p className="text-sm text-zinc-500">{ALL_CAMPAIGNS.length} projects</p>
        </div>

        {/* Campaign Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.slug} {...campaign} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 text-sm font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 rounded-xl transition-colors">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}
