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

    // Funcție pentru inițializarea contului de workouts a utilizator
    pub fn initialize_user_workouts(
        ctx: Context<InitializeUserWorkouts>,
        userid: String,
    ) -> Result<()> {
        create_user_workouts(
            ctx, 
            userid,
        )?;
        Ok(())
    }
    
    // Functie pentru adaugarea unui workout in contul de workouts a utilizatorului
    pub fn add_workout(
        ctx: Context<AddUserWorkout>, // Folosește contextul AddUserWorkout
        workout: Workout,
    ) -> Result<()> {
        add_user_workout(
            ctx, 
            workout
        )?;
        Ok(())
    }

    // Functie pentru stergerea unui workout din contul de workouts a utilizatorului
    pub fn remove_workout(
        ctx: Context<RemoveUserWorkout>, // Folosește contextul AddUserWorkout
        workoutid: String,
    ) -> Result<()> {
        remove_user_workout(
            ctx, 
            workoutid
        )?;
        Ok(())
    }

    // Funcție pentru inițializarea contului de routines a utilizator
    pub fn initialize_user_routine(
        ctx: Context<InitializeUserRoutines>,
        userid: String,
    ) -> Result<()> {
        create_user_routines(
            ctx, 
            userid,
        )?;
        Ok(())
    }
    
    pub fn add_routine(
        ctx: Context<AddUserRoutine>, // Folosește contextul 
        routine: Routine,
    ) -> Result<()> {
        add_user_routine(
            ctx, 
            routine
        )?;
        Ok(())
    }

    pub fn remove_routine(
        ctx: Context<RemoveUserRoutine>, // Folosește contextul 
        routineid: String,
    ) -> Result<()> {
        remove_user_routine(
            ctx, 
            routineid
        )?;
        Ok(())
    }

}

