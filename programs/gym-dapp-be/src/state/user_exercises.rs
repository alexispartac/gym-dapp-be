use anchor_lang::prelude::*;
use crate::USER_EXERCISE_SIZE;
use crate::Exercise;

#[account]
pub struct Exercises {
    pub userid: String,
    pub exercises: Vec<Exercise>
}

impl Exercises {
    pub const SIZE: usize =
        100;
    pub fn len(number_exercises: usize) -> usize {
        Exercises::SIZE + ( number_exercises * USER_EXERCISE_SIZE)
    }
}