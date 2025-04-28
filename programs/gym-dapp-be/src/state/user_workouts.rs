use anchor_lang::prelude::*;
use crate::MAX_USER_WORKOUT;

#[account]
pub struct Workouts {
    pub userid: String, // 8 bytes
    pub workouts: Vec<Workout>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Workout {
    pub workoutid: String,  // 8 bytes
    pub exercises: Vec<Exercise>, // Lista de exerciții
    pub date: i64,                   // Data (timestamp UNIX)
    pub duration: u32,               // Durata în minute
    pub volume: u32,                 // Volumul total (kg * reps)
    pub sets: u32,                   // Numărul total de seturi
    pub rewards: u32,                // Recompense obținute
} // len : 8 + 15 * 284 + 8 + 4 + 4 + 4 + 4 = 4292 bytes

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Exercise {
    pub id: String,
    pub name: String,
    pub muscle_group: String,
    pub sets: Vec<Set>, // Lista de seturi
}  // len : 8 + 8 + 8 + 10*26 = 284 bytes

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Set {
    pub set_number: u32, // Numărul setului
    pub kg: f32,         // Greutatea utilizată
    pub reps: u32,       // Numărul de repetări
    pub previous: String, // Informații despre setul anterior (opțional)
    pub done: bool,               // Dacă setul a fost finalizat
} // len : 26 bytes

impl Workouts {
    pub const SIZE: usize = 
        100;
    pub fn len(number_workouts: usize) -> usize {
        Workouts::SIZE + (number_workouts * MAX_USER_WORKOUT)
    }

}