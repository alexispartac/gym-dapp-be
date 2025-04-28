use anchor_lang::prelude::*;

use crate::{ Routine, Routines, ANCHOR_DISCRIMINATOR};



#[derive(Accounts)]
pub struct InitializeUserRoutines<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR + Routines::len(0),
        seeds = [
            b"userroutines",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub userroutines: Account<'info, Routines>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddUserRoutine<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        realloc = Routines::len(userroutines.routines.len() + 1),
        realloc::payer = user,
        realloc::zero = true,
        seeds = [
            b"userroutines",
            user.key().as_ref(),
        ],
        bump,
    )]

    pub userroutines: Account<'info, Routines>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RemoveUserRoutine<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        realloc = Routines::len(userroutines.routines.len() - 1),
        realloc::payer = user,
        realloc::zero = true,
        seeds = [
            b"userroutines",
            user.key().as_ref(),
        ],
        bump,
    )]

    pub userroutines: Account<'info, Routines>,
    pub system_program: Program<'info, System>,
}

pub fn create_user_routines(
    ctx: Context<InitializeUserRoutines>,
    userid: String,
) -> Result<()> {

    let userroutines = &mut ctx.accounts.userroutines;
    userroutines.userid = userid;

    msg!("User routines account initialized successfully!");
    msg!("UserId: {}", ctx.accounts.userroutines.userid);
    Ok(())
}

pub fn add_user_routine(
    ctx: Context<AddUserRoutine>,
    routine: Routine
) -> Result<()> {

    let userroutines = &mut ctx.accounts.userroutines;

    userroutines.routines.push(routine);
    
    Ok(())
}

pub fn remove_user_routine(
    ctx: Context<RemoveUserRoutine>,
    routineid: String,
) -> Result<()> {

    let userroutines = &mut ctx.accounts.userroutines;

    userroutines.routines.retain(|routine| routine.routineid != routineid);

    msg!("Routine with id {} removed successfully!", routineid);
    
    Ok(())
}