use anchor_lang::prelude::*;

use crate::{ Workouts, Workout, ANCHOR_DISCRIMINATOR};

#[derive(Accounts)]
pub struct InitializeUserWorkouts<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR + Workouts::len(0),
        seeds = [
            b"workouts",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub workouts: Account<'info, Workouts>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddUserWorkout<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        realloc = Workouts::len(workouts.workouts.len() + 1),
        realloc::payer = user,
        realloc::zero = true,
        seeds = [
            b"workouts",
            user.key().as_ref(),
        ],
        bump,
    )]

    pub workouts: Account<'info, Workouts>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RemoveUserWorkout<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        realloc = Workouts::len(workouts.workouts.len() - 1),
        realloc::payer = user,
        realloc::zero = true,
        seeds = [
            b"workouts",
            user.key().as_ref(),
        ],
        bump,
    )]

    pub workouts: Account<'info, Workouts>,
    pub system_program: Program<'info, System>,
}

pub fn create_user_workouts(
    ctx: Context<InitializeUserWorkouts>,
    userid: String,
) -> Result<()> {

    let workouts = &mut ctx.accounts.workouts;
    workouts.userid = userid;

    msg!("User workouts account initialized successfully!");
    msg!("UserId: {}", ctx.accounts.workouts.userid);
    Ok(())
}

pub fn add_user_workout(
    ctx: Context<AddUserWorkout>,
    workout: Workout
) -> Result<()> {

    let workouts = &mut ctx.accounts.workouts.workouts;

    workouts.push(workout);
    
    Ok(())
}

pub fn remove_user_workout(
    ctx: Context<RemoveUserWorkout>,
    workoutid: String,
) -> Result<()> {

    let workouts = &mut ctx.accounts.workouts.workouts;

    workouts.retain(|workout| workout.workoutid != workoutid);

    msg!("Workout with id {} removed successfully!", workoutid);
    
    Ok(())
}