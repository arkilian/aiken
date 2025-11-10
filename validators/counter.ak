// A simple counter validator demonstrating state management in Aiken
// This shows how to update data stored on-chain

pub type CounterDatum {
  count: Int,
}

pub type CounterRedeemer {
  // Increment the counter
  Increment
  // Decrement the counter
  Decrement
  // Reset the counter to zero
  Reset
}

validator counter {
  spend(datum: Option<CounterDatum>, redeemer: CounterRedeemer, _utxo, _self) {
    // Extract datum if present
    expect Some(dat) = datum
    
    // Pattern match on the redeemer to determine action
    when redeemer is {
      Increment -> {
        // Counter can only increment
        // In a real validator, you would check the output datum
        // to ensure it's dat.count + 1
        True
      }
      Decrement -> {
        // Counter can only decrement if > 0
        // In a real validator, you would check the output datum
        dat.count > 0
      }
      Reset -> {
        // Can always reset
        True
      }
    }
  }

  else(_) {
    fail
  }
}

// Simple tests for the counter logic
test counter_increment() {
  let datum = Some(CounterDatum { count: 5 })
  counter.spend(datum, Increment, Void, Void)
}

test counter_decrement_allowed() {
  let datum = Some(CounterDatum { count: 5 })
  counter.spend(datum, Decrement, Void, Void)
}

test counter_decrement_at_zero() {
  let datum = Some(CounterDatum { count: 0 })
  !counter.spend(datum, Decrement, Void, Void)
}

test counter_reset() {
  let datum = Some(CounterDatum { count: 100 })
  counter.spend(datum, Reset, Void, Void)
}
