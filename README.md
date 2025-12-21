# Scholr.link

## Overview
Scholr.link is a decentralized platform designed to facilitate the creation, management, and exploration of campaigns, leveraging blockchain technology for transparency and security. The project consists of a Next.js frontend and a Solana Anchor-based smart contract backend.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Statistics](#statistics)
- [License](#license)

## Features
- User authentication and wallet integration
- Campaign creation and management
- Dashboard for user campaigns
- Explore public campaigns
- 3D badge rendering (SoulboundBadge3D)
- Blockchain integration via Solana and Anchor

## Project Structure
```
app/
  ├── public/                # Static assets
  ├── src/
  │   ├── app/               # Next.js app directory
  │   ├── components/        # React components
  │   ├── contexts/          # React context providers
  │   ├── idl/               # Solana program IDL
  │   ├── lib/               # Utility libraries
  │   └── types/             # TypeScript types
scholr_program/              # Solana Anchor program
  ├── migrations/            # Anchor migrations
  ├── programs/              # Rust smart contract
  └── target/                # Build artifacts
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- Yarn or npm
- Rust (for Solana program)
- Anchor CLI (`cargo install --git https://github.com/coral-xyz/anchor avm --locked`)
- Solana CLI

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/scholr.link.git
cd scholr.link
```

### 2. Install Dependencies
#### Frontend
```bash
cd app
npm install
# or
yarn install
```
#### Backend (Solana Program)
```bash
cd scholr_program
anchor install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `app/` directory. Example:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=your_program_id
```

### 4. Build and Run
#### Frontend
```bash
cd app
npm run dev
```
#### Backend (Solana Program)
```bash
cd scholr_program
anchor build
anchor test
```

## Development
- The frontend is built with Next.js and TypeScript.
- The backend smart contract is written in Rust using Anchor.
- Use the provided scripts in each directory for development and testing.

## Testing
- Frontend: Use `npm run test` in the `app/` directory (if tests are implemented).
- Backend: Use `anchor test` in the `scholr_program/` directory.

## Deployment
- Deploy the Solana program using Anchor:
  ```bash
  anchor deploy
  ```
- Deploy the frontend using Vercel, Netlify, or your preferred platform.

## Statistics
- **Frontend:** Next.js, TypeScript, Supabase, Solana wallet adapter
- **Backend:** Rust, Anchor, Solana
- **Lines of Code:**
  - Frontend: ~2,000+ (estimate)
  - Backend: ~500+ (estimate)
- **Smart Contract:** 1 main program (`scholr_program`)
- **Components:** 10+ reusable React components
- **Tests:** Rust unit/integration tests for smart contract

## License
This project is licensed under the MIT License.
