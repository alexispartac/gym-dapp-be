#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;
declare_id!("98nD8KDJH5Vkov3a65xuPztmmk1eQHpdgR3Supk4RXb4");

#[program]
pub mod gym_dapp_be {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Initializing the Gym Dapp");
        let program_id = ctx.program_id;
        let program_id_str = program_id.to_string();
        msg!("Program ID: {}", program_id_str);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
