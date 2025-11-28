use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};
use anchor_spl::associated_token::AssociatedToken;

declare_id!("6KNjQsiGcGDgmXnxyXXAjrZjKqEKe24NZ5Ao4aTWhyNc");

#[program]
pub mod scholr_link {
    use super::*;

    /// Initialize a new crowdfunding campaign
    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        campaign_id: String,
        title: String,
        metadata_uri: String,
        goal: u64,
        deadline: i64,
    ) -> Result<()> {
        require!(campaign_id.len() <= 32, ErrorCode::CampaignIdTooLong);
        require!(title.len() <= 64, ErrorCode::TitleTooLong);
        require!(metadata_uri.len() <= 256, ErrorCode::MetadataUriTooLong);
        require!(goal > 0, ErrorCode::InvalidGoal);
        require!(deadline > Clock::get()?.unix_timestamp, ErrorCode::InvalidDeadline);

        let campaign = &mut ctx.accounts.campaign;
        
        // Derive and store bump for PDA validation
        let (_derived, bump) = Pubkey::find_program_address(
            &[
                b"campaign",
                ctx.accounts.authority.key.as_ref(),
                campaign_id.as_bytes(),
            ],
            ctx.program_id,
        );

        campaign.authority = ctx.accounts.authority.key();
        campaign.campaign_id = campaign_id;
        campaign.bump = bump;
        campaign.title = title;
        campaign.metadata_uri = metadata_uri;
        campaign.goal = goal;
        campaign.raised = 0;
        campaign.deadline = deadline;
        campaign.vault = ctx.accounts.vault.key();
        campaign.is_active = true;

        msg!("Campaign initialized: {}", campaign.campaign_id);
        Ok(())
    }

    /// Donate to a campaign (USDC transfer + mint patron badge)
    pub fn donate(
        ctx: Context<Donate>,
        amount: u64,
    ) -> Result<()> {
        require!(amount > 0, ErrorCode::InvalidAmount);
        
        let campaign = &mut ctx.accounts.campaign;
        
        // Check campaign is still active
        require!(campaign.is_active, ErrorCode::CampaignInactive);
        require!(
            Clock::get()?.unix_timestamp < campaign.deadline,
            ErrorCode::CampaignExpired
        );

        // Verify campaign PDA
        let seeds: &[&[u8]] = &[
            b"campaign",
            campaign.authority.as_ref(),
            campaign.campaign_id.as_bytes(),
        ];
        let (derived, _) = Pubkey::find_program_address(seeds, ctx.program_id);
        require!(derived == campaign.key(), ErrorCode::InvalidCampaignPDA);

        // Transfer USDC from donor to campaign vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.donor_token_account.to_account_info(),
            to: ctx.accounts.vault.to_account_info(),
            authority: ctx.accounts.donor.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        // Update raised amount
        campaign.raised = campaign
            .raised
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;

        msg!(
            "Donation received: {} from {}. Total raised: {}/{}",
            amount,
            ctx.accounts.donor.key(),
            campaign.raised,
            campaign.goal
        );

        Ok(())
    }

    /// Withdraw funds (only campaign authority)
    pub fn withdraw(
        ctx: Context<Withdraw>,
        amount: u64,
    ) -> Result<()> {
        let campaign = &ctx.accounts.campaign;
        
        // Verify campaign PDA and authority
        require!(
            campaign.authority == ctx.accounts.authority.key(),
            ErrorCode::Unauthorized
        );

        let seeds: &[&[u8]] = &[
            b"campaign",
            campaign.authority.as_ref(),
            campaign.campaign_id.as_bytes(),
            &[campaign.bump],
        ];

        // Transfer from vault to authority's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.vault.to_account_info(),
            to: ctx.accounts.authority_token_account.to_account_info(),
            authority: ctx.accounts.campaign.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, &[seeds]);
        token::transfer(cpi_ctx, amount)?;

        msg!("Withdrawn: {} to {}", amount, ctx.accounts.authority.key());
        Ok(())
    }

    /// Close campaign (only authority)
    pub fn close_campaign(ctx: Context<CloseCampaign>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        
        require!(
            campaign.authority == ctx.accounts.authority.key(),
            ErrorCode::Unauthorized
        );

        campaign.is_active = false;
        
        msg!("Campaign closed: {}", campaign.campaign_id);
        Ok(())
    }
}

// ========== ACCOUNTS ==========

#[derive(Accounts)]
#[instruction(campaign_id: String)]
pub struct InitializeCampaign<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [b"campaign", authority.key().as_ref(), campaign_id.as_bytes()],
        bump,
        payer = authority,
        space = 8 + Campaign::INIT_SPACE
    )]
    pub campaign: Account<'info, Campaign>,

    /// Campaign's USDC vault (token account owned by campaign PDA)
    #[account(
        init,
        payer = authority,
        token::mint = usdc_mint,
        token::authority = campaign
    )]
    pub vault: Account<'info, TokenAccount>,

    pub usdc_mint: Account<'info, Mint>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,

    #[account(mut)]
    pub donor_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.key() == campaign.vault @ ErrorCode::InvalidVault
    )]
    pub vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = campaign.authority == authority.key() @ ErrorCode::Unauthorized
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(mut)]
    pub vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub authority_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CloseCampaign<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        constraint = campaign.authority == authority.key() @ ErrorCode::Unauthorized
    )]
    pub campaign: Account<'info, Campaign>,
}

// ========== STATE ==========

#[account]
#[derive(InitSpace)]
pub struct Campaign {
    pub authority: Pubkey,          // 32
    #[max_len(32)]
    pub campaign_id: String,        // 4 + 32
    pub bump: u8,                   // 1
    #[max_len(64)]
    pub title: String,              // 4 + 64
    #[max_len(256)]
    pub metadata_uri: String,       // 4 + 256
    pub goal: u64,                  // 8
    pub raised: u64,                // 8
    pub deadline: i64,              // 8
    pub vault: Pubkey,              // 32
    pub is_active: bool,            // 1
}

// ========== ERRORS ==========

#[error_code]
pub enum ErrorCode {
    #[msg("Campaign ID must be 32 characters or less")]
    CampaignIdTooLong,
    #[msg("Title must be 64 characters or less")]
    TitleTooLong,
    #[msg("Metadata URI must be 256 characters or less")]
    MetadataUriTooLong,
    #[msg("Goal must be greater than zero")]
    InvalidGoal,
    #[msg("Deadline must be in the future")]
    InvalidDeadline,
    #[msg("Amount must be greater than zero")]
    InvalidAmount,
    #[msg("Campaign is not active")]
    CampaignInactive,
    #[msg("Campaign deadline has passed")]
    CampaignExpired,
    #[msg("Invalid campaign PDA")]
    InvalidCampaignPDA,
    #[msg("Invalid vault address")]
    InvalidVault,
    #[msg("Unauthorized: not campaign authority")]
    Unauthorized,
    #[msg("Arithmetic overflow")]
    Overflow,
}
