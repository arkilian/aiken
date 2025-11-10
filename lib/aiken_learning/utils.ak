// A simple utility library module for learning Aiken

/// Check if a value is positive
pub fn is_positive(value: Int) -> Bool {
  value > 0
}

/// Add two numbers together
pub fn add(a: Int, b: Int) -> Int {
  a + b
}

/// Multiply two numbers
pub fn multiply(a: Int, b: Int) -> Int {
  a * b
}

// Tests for the utility functions
test is_positive_works() {
  is_positive(5) == True
}

test is_positive_negative() {
  is_positive(-5) == False
}

test is_positive_zero() {
  is_positive(0) == False
}

test add_works() {
  add(2, 3) == 5
}

test multiply_works() {
  multiply(3, 4) == 12
}
