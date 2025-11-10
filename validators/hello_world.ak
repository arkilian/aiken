use aiken/hash.{Blake2b_224, Hash}
use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

// Define the data structure that will be stored on the blockchain
type Datum {
  owner: Hash<Blake2b_224, VerificationKey>,
}

// Define the redeemer type - what the spender must provide
type Redeemer {
  msg: ByteArray,
}

// The validator function that checks if a transaction is valid
validator {
  fn hello_world(datum: Datum, redeemer: Redeemer, context: ScriptContext) -> Bool {
    // Check if the redeemer message is "Hello, World!"
    let must_say_hello = redeemer.msg == "Hello, World!"
    
    must_say_hello
  }
}

// Add a test to verify the validator works correctly
test hello_world_example() {
  let datum = Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }
  let redeemer = Redeemer { msg: "Hello, World!" }
  
  // This should pass
  hello_world(datum, redeemer, todo) == True
}

test hello_world_fail_example() {
  let datum = Datum { owner: #"00000000000000000000000000000000000000000000000000000000" }
  let redeemer = Redeemer { msg: "Wrong message" }
  
  // This should fail
  hello_world(datum, redeemer, todo) == False
}
