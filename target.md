Project Name: ScholrLink
1. Executive Summary

ScholrLink is a decentralized protocol that eliminates the friction between academic research and funding. By leveraging Solana Blinks, ScholrLink turns any social media post about a student project into an interactive, embeddable funding terminal. It utilizes Token-2022 extensions to issue non-transferable (Soulbound) "Proof of Patronage" badges to donors, creating an on-chain reputation graph for supporting innovation.

2. The Problem Statement

University innovation is stifled by three specific bottlenecks:
The "Form" Friction:
Current State: Getting a micro-grant ($50–$500) for hardware or resources requires weeks of paperwork.
Pain Point: Innovation moves faster than bureaucracy. Students often pay out of pocket or abandon ideas.
The "Click-Through" Drop-off:
Current State: Sharing a GoFundMe link on Twitter/X requires a user to click a link, leave the app, login, and enter card details.
Pain Point: Every click reduces conversion by ~50%. Viral attention is rarely captured financially.
The Lack of Provenance:
Current State: Donating to a wallet address feels empty. There is no permanent record of the donor's impact.
Pain Point: Donors want recognition and a verifiable history of the projects they "angel invested" in.



3. The Solution: "Fund at the Speed of Feed"
ScholrLink solves this by embedding the financial layer directly into the communication layer.
The User Journey
Step 1: The Student (Creator)
Logs into ScholrLink with their wallet.
Fills out a simple form: Title ("Rust OS Kernel"), Funding Goal ($200), Deadline.
The platform generates a unique link: scholr.link/actions/rust-os.
The student posts a tweet: "Working on my final year OS kernel project. Need $200 for a Raspberry Pi cluster! 🦀 [Link]"
Step 2: The Social Layer (The Blink)
On Twitter/X, the link automatically unfurls into an Interactive Interface.
The UI shows a progress bar (e.g., "$50 / $200 raised").
It displays three buttons: [Donate 5 USDC], [Donate 20 USDC], [Custom Amount].
Step 3: The Donor (Patron)
The donor taps [Donate 5 USDC].
Their wallet (Phantom/Backpack) prompts a signature without leaving Twitter.
Result: The transaction sends USDC to the campaign escrow AND mints a "Patron Badge" to the donor's wallet in one atomic move.

4. Technical Architecture
This is designed to show off high-level Solana competency.
Layer A: The Smart Contract (Rust / Anchor)
Campaign PDA (Program Derived Address):
Stores the state: authority (Student), goal_amount, current_amount, deadline.
Ensures funds are locked until specific conditions are met (or allows immediate withdrawal depending on logic).
Token-2022 Implementation (The "Winning" Tech):
When a donation occurs, the program calls the Token-2022 program via CPI (Cross-Program Invocation).
It mints a Non-Transferable Token (Soulbound) to the donor.
Why this wins: It proves you aren't just copying old tutorials. You are using the new standard.

Layer B: The Action Server (Next.js API)
This acts as the bridge between the Blockchain and the Social Media Client.
GET Request: Returns the metadata (Image, Title, Buttons) formatted according to the Solana Actions Standard.
POST Request:
Receives the user's intent ("Donate 5 USDC").
Constructs the unsigned transaction invoking your Anchor program.
Returns the transaction to the user's wallet.

Layer C: Data & Storage (Irys/Bundlr)
To keep gas costs low, the "Project Description" and "Images" are stored on Irys (Decentralized Storage).
The Smart Contract only stores the link to this metadata.

5. Database Schema (Conceptual)

Even though we are on-chain, you need to structure your data mentally.
On-Chain Account: Campaign
Rust
pub struct Campaign {
    pub authority: Pubkey,      // The Student
    pub title: String,          // Short title (limited chars)
    pub metadata_uri: String,   // Link to full details on Irys
    pub goal: u64,              // Target in USDC atomic units
    pub raised: u64,            // Current raised amount
    pub bump: u8,               // For PDA validation
}


On-Chain Account: PatronReceipt (Token-2022 Metadata)
Name: "Patron: [Project Name]"
Extension: TransferHook (To prevent transfer) or PermanentDelegate (To burn if needed).

6. Development Strategy (The Hackathon Sprint)

Day 1: The Anchor Core
Initialize Anchor project.
Write initialize_campaign instruction.
Write donate instruction (handle the USDC transfer first, ignore the NFT for now).
Write tests in TypeScript.
Day 2: The Blink API (The UI)
Set up Next.js App Router.
Build the route.ts API endpoint.
Use dial.to (Dialect Inspector) to test the buttons visually.
Day 3: The Advanced Tech (Token-2022)
Integrate the Token-2022 minting logic into the donate Rust instruction.
Configure the "Non-Transferable" extension.
Day 4: Integration & Frontend
Build the simple "Create Campaign" dashboard for students.
Connect it to the Smart Contract.
Day 5: Deployment & Demo
Deploy to Devnet.
Crucial: Record the demo video. It must show the Twitter interaction seamlessly.

7. Why This Will Win (Judges' Criteria)

Innovation: It uses Blinks, the newest and most hyped feature in the ecosystem.
Technical Difficulty: Integrating Token-2022 Extensions (Soulbound tokens) separates you from low-effort submissions.
Real-World Utility: It solves a clear problem (funding) for a clear audience (students) in a way that only crypto can (micropayments + instant global settlement).
Mobile First: Blinks work natively on mobile wallets, which fits the "Seeker" mobile phone narrative Solana is pushing.
