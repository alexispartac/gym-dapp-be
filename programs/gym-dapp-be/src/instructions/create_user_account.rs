use anchor_lang::prelude::*;

use crate::{ User, ANCHOR_DISCRIMINATOR };
use crate::error::LoginError;

#[derive(Accounts)]
#[instruction(userid: String, username: String, email: String, password: String)]
pub struct InitializeUserAccount<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR + User::INIT_SPACE,
        seeds = [
            b"useraccount",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub useraccount: Account<'info, User>,
    pub system_program: Program<'info, System>,
}

pub fn create_user_account(
    ctx: Context<InitializeUserAccount>,
    userid: String,
    username: String,
    email: String,
    password: String,
) -> Result<()> {

    // Validate username
    if username.len() > 256 {
        return Err(LoginError::InvalidUsername.into());
    }
    // Validate email
    if email.len() > 256 {
        return Err(LoginError::InvalidEmail.into());
    }
    // Validate password
    if password.len() > 256 {
        return Err(LoginError::InvalidPassword.into());
    }

    let user_public_key = ctx.accounts.user.key();
    msg!("User Public Key: {}", user_public_key);

    ctx.accounts.useraccount.set_inner(
        User {
            userid,
            username,
            email,
            password
        }
    );

    msg!("User account initialized successfully!");
    msg!("UserId: {}", ctx.accounts.useraccount.userid);
    msg!("Username: {}", ctx.accounts.useraccount.username);
    msg!("Email: {}", ctx.accounts.useraccount.email);
    msg!("Password: {}", ctx.accounts.useraccount.password);
    msg!("Account Address: {}", ctx.accounts.useraccount.key());

    Ok(())
}