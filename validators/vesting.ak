use aiken/hash.{Blake2b_224, Hash}
use aiken/list
use aiken/transaction.{ScriptContext, Spend}
use aiken/transaction/credential.{VerificationKey}

// A simple vesting validator that locks funds until a specific time
// This demonstrates more advanced Aiken concepts

type VestingDatum {
  // The beneficiary who can claim the funds
  beneficiary: Hash<Blake2b_224, VerificationKey>,
  // The deadline (POSIX time) after which funds can be claimed
  deadline: Int,
}

type VestingRedeemer {
  // Action to perform
  msg: ByteArray,
}

validator {
  fn vesting(datum: VestingDatum, redeemer: VestingRedeemer, context: ScriptContext) -> Bool {
    // Get the transaction information
    let ScriptContext { transaction, purpose } = context
    
    // Ensure we're spending from a script
    expect Spend(_) = purpose
    
    // Check that the transaction is signed by the beneficiary
    let must_be_signed_by_beneficiary =
      list.has(transaction.extra_signatories, datum.beneficiary)
    
    // Get the validity range of the transaction
    let transaction_valid_range = transaction.validity_range
    
    // Check that the deadline has passed
    // For simplicity, we check that the lower bound is after the deadline
    let deadline_reached = when transaction_valid_range.lower_bound.bound_type is {
      // If there's a finite lower bound, check it's after the deadline
      Finite(tx_earliest_time) -> tx_earliest_time >= datum.deadline
      // Reject unbounded transactions
      _ -> False
    }
    
    // Both conditions must be met
    must_be_signed_by_beneficiary && deadline_reached
  }
}

// Note: Tests for this validator would require more complex setup
// including transaction context, which is beyond basic examples
// In a real project, you would use Aiken's testing framework
