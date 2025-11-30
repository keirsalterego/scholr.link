use anchor_lang::prelude::*;
use anchor_lang::system_program::{self, create_account, CreateAccount};
use anchor_spl::{
    associated_token::AssociatedToken,
    token_2022::{self, MintTo, Token2022},
    token_interface::{
        non_transferable_mint_initialize, NonTransferableMintInitialize,
    },
};
use spl_token_2022::extension::ExtensionType;
use spl_token_2022::state::Mint as SplMint;

declare_id!("BpxvjF75QaVnnhNF4QQJNQ2CfRvyNo873LjjkEQbu8kp"); // Updated to match deployed program

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

        // 2. Initialize the Token-2022 Mint with NonTransferable extension
        let mint_size = ExtensionType::try_calculate_account_len::<SplMint>(&[
            ExtensionType::NonTransferable,
        ])?;
        let lamports = (Rent::get()?).minimum_balance(mint_size);

        create_account(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                CreateAccount {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.mint.to_account_info(),
                },
            ),
            lamports,
            mint_size as u64,
            &ctx.accounts.token_2022_program.key(),
        )?;

        non_transferable_mint_initialize(CpiContext::new(
            ctx.accounts.token_2022_program.to_account_info(),
            NonTransferableMintInitialize {
                mint: ctx.accounts.mint.to_account_info(),
                token_program_id: ctx.accounts.token_2022_program.to_account_info(),
            },
        ))?;

        token_2022::initialize_mint2(
            CpiContext::new(
                ctx.accounts.token_2022_program.to_account_info(),
                token_2022::InitializeMint2 {
                    mint: ctx.accounts.mint.to_account_info(),
                },
            ),
            0,
            &ctx.accounts.signer.key(),
            None,
        )?;

        // 3. Create ATA (idempotent) for donor under Token-2022
        anchor_spl::associated_token::create_idempotent(
            CpiContext::new(
                ctx.accounts.associated_token_program.to_account_info(),
                anchor_spl::associated_token::Create {
                    payer: ctx.accounts.signer.to_account_info(),
                    associated_token: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.signer.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                    token_program: ctx.accounts.token_2022_program.to_account_info(),
                },
            ),
        )?;

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

    #[account(mut)]
    pub mint: Signer<'info>,

    /// CHECK: This is the donor's Token-2022 token account. Validated in handler.
    #[account(mut)]
    pub token_account: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    pub token_2022_program: Program<'info, Token2022>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}