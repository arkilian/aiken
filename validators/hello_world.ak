// Define the data structure that will be stored on the blockchain
pub type Datum {
  owner: ByteArray,
}

// Define the redeemer type - what the spender must provide
pub type Redeemer {
  msg: ByteArray,
}

// The validator function that checks if a transaction is valid
validator hello_world {
  spend(datum: Option<Datum>, redeemer: Redeemer, _utxo, _self) {
    // Extract datum if present
    expect Some(_dat) = datum
    
    // Check if the redeemer message is "Hello, World!"
    redeemer.msg == "Hello, World!"
  }

  else(_) {
    fail
  }
}

test hello_world_example() {
  let datum = Some(Datum { owner: #"00000000000000000000000000000000000000000000000000000000" })
  let redeemer = Redeemer { msg: "Hello, World!" }
  
  // This should pass - using Void for unused parameters
  hello_world.spend(datum, redeemer, Void, Void)
}

test hello_world_fail_example() {
  let datum = Some(Datum { owner: #"00000000000000000000000000000000000000000000000000000000" })
  let redeemer = Redeemer { msg: "Wrong message" }
  
  // This should fail
  !hello_world.spend(datum, redeemer, Void, Void)
}
