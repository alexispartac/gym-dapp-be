use anchor_lang::prelude::*;
use crate::MAX_USER_INPUT_LENGTH;

#[account]
#[derive(InitSpace)]
pub struct User {
    #[max_len(MAX_USER_INPUT_LENGTH)]
    pub userid: String,
    #[max_len(MAX_USER_INPUT_LENGTH)]
    pub username: String,
    #[max_len(MAX_USER_INPUT_LENGTH)]
    pub email: String,
    #[max_len(MAX_USER_INPUT_LENGTH)]
    pub password: String,
}