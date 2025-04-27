#![allow(unexpected_cfgs)]
pub mod error;
pub mod constants;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
pub use constants::*;
pub use state::*;
pub use instructions::*;
pub use error::*;

declare_id!("9akkfdTGrGZaavswyVC7jqBu3AsTBim634xuUhKSoYMr");

#[program]
pub mod gym_dapp_be {

    use super::*;
    // Funcție pentru inițializarea contului utilizator
    pub fn initialize_user_account(
        ctx: Context<InitializeUserAccount>,
        userid: String,
        username: String,
        email: String,
        password: String,
    ) -> Result<()> {
        create_user_account(
            ctx, 
            userid,
            username,
            email,
            password,
        )?;
        Ok(())
    }
}

