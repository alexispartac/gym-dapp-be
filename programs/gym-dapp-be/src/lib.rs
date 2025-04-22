use anchor_lang::prelude::*;

declare_id!("98nD8KDJH5Vkov3a65xuPztmmk1eQHpdgR3Supk4RXb4");

#[program]
pub mod gym_dapp_be {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
