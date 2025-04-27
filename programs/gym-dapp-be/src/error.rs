use anchor_lang::prelude::*;

#[error_code]
pub enum LoginError {
    #[msg("Invalid credentials provided.")]
    InvalidCredentials,
    #[msg("User account not found.")]
    UserNotFound,
    #[msg("Invalid user ID provided.")]
    InvalidUserId,
    #[msg("Invalid username provided.")]
    InvalidUsername,
    #[msg("Invalid email provided.")]
    InvalidEmail,
    #[msg("Invalid password provided.")]
    InvalidPassword,
}