use anchor_lang::prelude::*;

declare_id!("FsCk6ZTdJZgKn42FBivig3GqVR9GADgBP9wuxQmjyWm6");

#[program]
pub mod calculator_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> = &mut ctx.accounts.calculator;
        calculator.result = 0;
        calculator.remainder = 0;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, num1: i64, num2: i64) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }

    pub fn subtract(ctx: Context<Subtract>, num1: i64, num2: i64) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num1 - num2;
        Ok(())
    }

    pub fn multiply(ctx: Context<Multiply>, num1: i64, num2: i64) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num1 * num2;
        Ok(())
    }

    pub fn divide(ctx: Context<Divide>, num1: i64, num2: i64) -> Result<()> {
        let calculator: &mut Account<'_, Calculator> = &mut ctx.accounts.calculator;
        calculator.result = num1 / num2;
        calculator.remainder = num1 % num2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=signer, space=264)]
    pub calculator: Account<'info, Calculator>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Subtract<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Multiply<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[derive(Accounts)]
pub struct Divide<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}


#[account]
pub struct Calculator {
    pub remainder: i64,
    pub result: i64,
}