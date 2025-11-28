use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_2022::{self, MintTo, Token2022},
};

// Use Anchor's internal re-exports to avoid version conflicts
use anchor_spl::token_2022::spl_token_2022::{
    extension::ExtensionType,
    state::Mint as MintState,
};
use anchor_lang::solana_program;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"); // <--- UPDATE THIS AFTER 'anchor keys list'

#[program]
pub mod scholr_program {
    use super::*;

    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        title: String,
        goal: u64,
        metadata_uri: String,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.authority = ctx.accounts.signer.key();
        campaign.title = title;
        campaign.goal = goal;
        campaign.raised = 0;
        campaign.metadata_uri = metadata_uri;
        campaign.bump = ctx.bumps.campaign;
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        // 1. Transfer SOL from Donor to Campaign
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.campaign.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, amount)?;

        // Update state
        let campaign = &mut ctx.accounts.campaign;
        campaign.raised += amount;

        // 2. Initialize the Soulbound Token (SBT)
        // Calculate space required for Mint + NonTransferable extension
        let space = ExtensionType::try_calculate_account_len::<MintState>(&[
            ExtensionType::NonTransferable,
        ])?;

        let lamports_required = (Rent::get()?).minimum_balance(space);

        anchor_lang::system_program::create_account(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::CreateAccount {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.mint.to_account_info(),
                },
            ),
            lamports_required,
            space as u64,
            &ctx.accounts.token_2022_program.key(),
        )?;

        // Initialize the actual Mint with NonTransferable extension
        token_2022::initialize_mint(
            CpiContext::new(
                ctx.accounts.token_2022_program.to_account_info(),
                token_2022::InitializeMint {
                    mint: ctx.accounts.mint.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
            ),
            0, // Decimals (0 for NFT/Badge)
            &ctx.accounts.signer.key(),
            Some(&ctx.accounts.signer.key()),
        )?;

        // 3. Create the Associated Token Account (ATA) for the donor
        // (Handled automatically by Anchor macros in the Donate struct)

        // 4. Mint exactly 1 token to the donor
        token_2022::mint_to(
            CpiContext::new(
                ctx.accounts.token_2022_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.signer.to_account_info(),
                },
            ),
            1,
        )?;

        Ok(())
    }
}

#[account]
pub struct Campaign {
    pub authority: Pubkey,    // 32
    pub title: String,        // 4 + len
    pub goal: u64,            // 8
    pub raised: u64,          // 8
    pub metadata_uri: String, // 4 + len
    pub bump: u8,             // 1
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct InitializeCampaign<'info> {
    #[account(
        init,
        payer = signer,
        // Space calculation: Disc(8) + Auth(32) + Title(4+50) + Goal(8) + Raised(8) + Uri(4+100) + Bump(1)
        space = 8 + 32 + (4 + 50) + 8 + 8 + (4 + 100) + 1, 
        seeds = [b"campaign", signer.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,

    #[account(mut)]
    pub signer: Signer<'info>, // The Donor

    /// CHECK: This is a Token-2022 Mint. Validated in handler.
    #[account(mut)]
    pub mint: AccountInfo<'info>,

    /// CHECK: This is the donor's Token-2022 token account. Validated in handler.
    #[account(mut)]
    pub token_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub token_2022_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}