use anchor_lang::prelude::*;
use crate::MAX_USER_ROUTINE;
use crate::Exercise;
#[account]
pub struct Routines {
    pub userid: String, // 8 bytes
    pub routines: Vec<Routine>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Routine {
    pub routineid: String, //8 bytes
    pub name: String, // 8 bytes
    pub exercises: Vec<Exercise>, // 4260 bytes
}

impl Routines {
    pub const SIZE: usize =
        100;
    pub fn len(number_routines: usize) -> usize {
        Routines::SIZE + (number_routines * MAX_USER_ROUTINE)
    }
}