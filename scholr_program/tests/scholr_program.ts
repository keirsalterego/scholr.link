import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  TOKEN_2022_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  getAccount,
} from "@solana/spl-token";
import { ScholrProgram } from "../target/types/scholr_program";
import { expect } from "chai";

describe("scholr_program", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.scholrProgram as Program<ScholrProgram>;
  const provider = anchor.getProvider();
  const signer = (provider as anchor.AnchorProvider).wallet;

  it("Creates a campaign", async () => {
    const title = "Test Campaign";
    const goal = new anchor.BN(1000);
    const metadataUri = "https://example.com/meta.json";

    // Derive PDA for campaign
    const [campaignPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), signer.publicKey.toBuffer(), Buffer.from(title)],
      program.programId
    );

    const tx = await program.methods
      .initializeCampaign(title, goal, metadataUri)
      .accounts({
        campaign: campaignPda,
        signer: signer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();
    console.log("Campaign created, tx:", tx);

    // Fetch and check campaign data
    const campaign = await program.account.campaign.fetch(campaignPda);
    expect(campaign.title).to.equal(title);
    expect(campaign.goal.toString()).to.equal(goal.toString());
    expect(campaign.raised.toNumber()).to.equal(0);
    expect(campaign.metadataUri).to.equal(metadataUri);
    expect(campaign.authority.toBase58()).to.equal(signer.publicKey.toBase58());
  });

  it("Donates to a campaign and mints badge", async () => {
    // Setup: create a campaign first
    const title = "Donate Campaign";
    const goal = new anchor.BN(5000);
    const metadataUri = "https://example.com/donate-meta.json";
    const [campaignPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("campaign"), signer.publicKey.toBuffer(), Buffer.from(title)],
      program.programId
    );
    await program.methods
      .initializeCampaign(title, goal, metadataUri)
      .accounts({
        campaign: campaignPda,
        signer: signer.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      } as any)
      .rpc();


    // Ensure payer has SOL
    const airdropSig = await provider.connection.requestAirdrop(
      (provider as anchor.AnchorProvider).wallet.publicKey,
      1_000_000_000 // 1 SOL
    );
    await provider.connection.confirmTransaction(airdropSig);

    const mint = anchor.web3.Keypair.generate();
    const amount = new anchor.BN(100);

    const associatedTokenAddress = getAssociatedTokenAddressSync(
      mint.publicKey,
      signer.publicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    // Call donate instruction
    await program.methods
      .donate(amount)
      .accounts({
        campaign: campaignPda,
        signer: signer.publicKey,
        mint: mint.publicKey,
        tokenAccount: associatedTokenAddress,
        systemProgram: anchor.web3.SystemProgram.programId,
        token2022Program: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      } as any)
      .signers([mint])
      .rpc();

    // Fetch and check campaign state
    const campaign = await program.account.campaign.fetch(campaignPda);
    expect(campaign.raised.toNumber()).to.equal(amount.toNumber());

    // Verify minted balance
    const donorAccount = await getAccount(
      provider.connection,
      associatedTokenAddress,
      "confirmed",
      TOKEN_2022_PROGRAM_ID
    );
    expect(Number(donorAccount.amount)).to.equal(1);
  });
});
