// A simple counter validator demonstrating state management in Aiken
// This shows how to update data stored on-chain

type CounterDatum {
  count: Int,
}

type CounterRedeemer {
  // Increment the counter
  Increment
  // Decrement the counter
  Decrement
  // Reset the counter to zero
  Reset
}

validator {
  fn counter(datum: CounterDatum, redeemer: CounterRedeemer, _context) -> Bool {
    // Pattern match on the redeemer to determine action
    when redeemer is {
      Increment -> {
        // Counter can only increment
        // In a real validator, you would check the output datum
        // to ensure it's datum.count + 1
        True
      }
      Decrement -> {
        // Counter can only decrement if > 0
        // In a real validator, you would check the output datum
        datum.count > 0
      }
      Reset -> {
        // Can always reset
        True
      }
    }
  }
}

// Simple tests for the counter logic
test counter_increment() {
  let datum = CounterDatum { count: 5 }
  counter(datum, Increment, todo) == True
}

test counter_decrement_allowed() {
  let datum = CounterDatum { count: 5 }
  counter(datum, Decrement, todo) == True
}

test counter_decrement_at_zero() {
  let datum = CounterDatum { count: 0 }
  counter(datum, Decrement, todo) == False
}

test counter_reset() {
  let datum = CounterDatum { count: 100 }
  counter(datum, Reset, todo) == True
}
