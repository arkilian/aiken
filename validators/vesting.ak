// A simple vesting validator that locks funds until a specific time
// This demonstrates more advanced Aiken concepts

pub type VestingDatum {
  // The beneficiary who can claim the funds
  beneficiary: ByteArray,
  // The deadline (POSIX time) after which funds can be claimed
  deadline: Int,
}

pub type VestingRedeemer {
  // Action to perform
  msg: ByteArray,
}

validator vesting {
  spend(datum: Option<VestingDatum>, _redeemer: VestingRedeemer, _utxo, _self) {
    // Extract datum if present
    expect Some(dat) = datum
    
    // For now, simplified version - just check that datum exists
    // In a real validator, you would:
    // 1. Check that the transaction is signed by the beneficiary
    // 2. Check that the current time is after the deadline
    // 3. Verify the transaction outputs
    
    // Simplified check: deadline must be positive
    dat.deadline > 0
  }

  else(_) {
    fail
  }
}

// Note: Tests for this validator would require more complex setup
// including transaction context, which is beyond basic examples
// In a real project, you would use Aiken's testing framework
