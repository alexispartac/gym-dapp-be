use anchor_lang::prelude::*;
use crate::{ Exercise, Exercises, ANCHOR_DISCRIMINATOR};

#[derive(Accounts)]
pub struct InitializeUserExercises<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR + Exercises::len(0),
        seeds = [
            b"exercises",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub exercises: Account<'info, Exercises>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateUserExercises<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        seeds = [
            b"exercises",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub exercises: Account<'info, Exercises>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddUserExercise<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        realloc = Exercises::len(exercises.exercises.len() + 1),
        realloc::payer = user,
        realloc::zero = true,
        seeds = [
            b"exercises",
            user.key().as_ref(),
        ],
        bump,
    )]
    pub exercises: Account<'info, Exercises>,
    pub system_program: Program<'info, System>,
}


pub fn create_user_exercises(
    ctx: Context<InitializeUserExercises>,
    userid: String,
) -> Result<()> {

    let exercises = &mut ctx.accounts.exercises;
    exercises.userid = userid;
    
    msg!("User exercises account initialized successfully!");
    msg!("UserId: {}", ctx.accounts.exercises.userid);
    Ok(())
}

pub fn update_user_exercises(
    ctx: Context<UpdateUserExercises>,
    exercise: Exercise,
) -> Result<()> {

    let exercises_account = &mut ctx.accounts.exercises;
    
    for existing_exercise in exercises_account.exercises.iter_mut() {
        if existing_exercise.id == exercise.id {
            *existing_exercise = exercise;
            break;
        }
    }
    
    Ok(())
}

pub fn add_user_exercise(
    ctx: Context<AddUserExercise>,
    exercise: Exercise
) -> Result<()> {

    let exercises = &mut ctx.accounts.exercises.exercises;

    exercises.push(exercise);
    
    Ok(())
}