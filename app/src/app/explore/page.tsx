import { CampaignCard } from "@/components/CampaignCard";

// Mock campaigns for explore page
const ALL_CAMPAIGNS = [
  {
    slug: "rust-os",
    title: "Rust OS Kernel Project",
    description: "Building a minimal OS kernel in Rust for my final year project. Need funds for a Raspberry Pi cluster!",
    goal: 10,
    raised: 2.5,
    creator: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    category: "Engineering",
  },
  {
    slug: "ml-research",
    title: "ML Research: Climate Prediction",
    description: "Training neural networks to predict local weather patterns using historical data. Need GPU cloud credits!",
    goal: 25,
    raised: 6.25,
    creator: "8yLLtg3DX98e08UKSEqcE6kCljfmU8nfQc84qTJosgBtV",
    category: "Research",
  },
  {
    slug: "robotics-arm",
    title: "3D Printed Robotic Arm",
    description: "Building a low-cost prosthetic arm prototype using 3D printing and Arduino for accessibility research.",
    goal: 17.5,
    raised: 14,
    creator: "9zMMug4EY09f19VLTFrdF7lDkmgnV9ogRd95rUKptgCuW",
    category: "Hardware",
  },
  {
    slug: "blockchain-voting",
    title: "Decentralized Voting System",
    description: "Creating a transparent and secure voting platform for student government elections using Solana.",
    goal: 15,
    raised: 2.25,
    creator: "AaMMug5FZ10g20WMUGseG8mEknhW0phrSe06sVLqueDxX",
    category: "Engineering",
  },
  {
    slug: "quantum-sim",
    title: "Quantum Computing Simulator",
    description: "Developing an educational quantum circuit simulator to help students learn quantum programming concepts.",
    goal: 22.5,
    raised: 10,
    creator: "BbNNvh6GA11h31XNVHtfH9nFlniX1qisTo17tWMrvfEyY",
    category: "Research",
  },
  {
    slug: "eco-monitor",
    title: "Campus Eco-Monitor IoT",
    description: "Building IoT sensors to monitor air quality, noise levels, and energy usage across campus buildings.",
    goal: 30,
    raised: 21,
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
          <p className="text-sm text-zinc-500">{ALL_CAMPAIGNS.length} projects</p>
        </div>

        {/* Campaign Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {ALL_CAMPAIGNS.map((campaign) => (
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
