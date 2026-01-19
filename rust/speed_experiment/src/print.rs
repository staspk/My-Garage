use std::{any, fmt::Display};

pub struct Print;

impl Print {
    pub fn red<T:Display>(value:T) {
        println!("\x1b[31m{}\x1b[0m", value);
    }
}