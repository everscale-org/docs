---
title: Network Changelog
---

# Everscale Network Changelog

## block version 24 and before

### `Activated` in the mainnet

- New `ZEROROTRIF` instruction
  `ZEROROTRIF (x y – x y or 0 x y)`, pushes a Zero under the second stack entry from the top, but only if the topmost `Integer y` is non-zero.
- New `ZEROROTRIF2` instruction
  `ZEROROTRIF2 (x y – x y or 0 0 x y)`, pushes two Zeros under the second stack entry from the top, but only if the topmost `Integer y` is non-zero. Equivalent to `ZEROROTRIF`; `ZEROROTRIF`.
- New `ZEROROTRIFNOT` instruction
  `ZEROROTRIFNOT (x y – x y or 0 x y)`, pushes a Zero under the second stack entry from the top, but only if the topmost `Integer y` is zero.
- New `ZEROROTRIFNOT2` instruction
  `ZEROSWAPIFNOT2 (x – x or 0 0 x)`, pushes two Zeros under the topmost Integer x, but only if `x = 0`. Equivalent to `ZEROSWAPIFNOT`; `ZEROSWAPIFNOT`.
- New `ZEROSWAPIF` instruction
  `ZEROSWAPIF (x – x or 0 x)`, pushes a Zero under the topmost `Integer x`, but only if `x <> 0`.
- New `ZEROSWAPIF2` instruction
  `ZEROSWAPIF2 (x – x or 0 0 x)`, pushes two Zeros under the topmost `Integer x`, but only if `x <> 0`. Equivalent to `ZEROSWAPIF`; `ZEROSWAPIF`.
- New `ZEROSWAPIFNOT` instruction
  `ZEROSWAPIFNOT (x – x or 0 x)`, pushes a Zero under the topmost `Integer x`, but only if `x = 0`.
- New `ZEROSWAPIFNOT2` instruction
  `ZEROSWAPIFNOT2 (x – x or 0 0 x)`, pushes two Zeros under the topmost `Integer x`, but only if `x = 0`. Equivalent to `ZEROSWAPIFNOT`; `ZEROSWAPIFNOT`.
- Disabled setlibcode, changelibcode instruction
- Validator not validating in some cases fix
- Security fix for `ADNL` packet signature
- Improved `DB` restoration
- Fixed several bugs (storage fee calculation, storing last state of validator)

## Config Change 30.05.22

### `Activated` in the mainnet

- Prohibit to send anycast messages
- New `MYCODE` instruction
  `MYCODE (- s)` — returns the Cell with the current code of the smart-contract. Equivalent to `GETPARAM 10`. Smart-contract has own code which cell representation can be obtained by this instruction see [TIP-1.2](concept/standard/TIP-1/2.md).

## block version 28

### `Activated` in the mainnet

- Prohibit to send anycast messages
- New `MYCODE` instruction
  `MYCODE (- s)` — returns the Cell with the current code of the smartcontract. Equivalent to `GETPARAM 10`. Smartcontract has own code which cell representation can be obtained by this instruction see [TIP-1.2](concept/standard/TIP-1/2.md).

**In the mainnet, not activated yet (using blockchain capabilities):**

- New `INITCODEHASH` Instruction
  `INITCODEHASH (- x)` — returns the integer represented `256bit` hash of code cell with contract was deployed. Equivalent to `GETPARAM 11` see [TIP-1.2](concept/standard/TIP-1/2.md).
- Changed account format
- Changed the `TLB` scheme for Account data to reflect new functionality (hash value of the initial account code). Accounts updated recently cannot be deserialized with old software for this reason, update is mandatory.
- Increased storage fee calculation performance for accounts with large data size
- Traffic compression

### In devnet not in mainnet

- Optimization and refactoring of operations with cells
- Automated `DB` versioning and update
- Fixed a bug with persistent zerostate deletion during `GC` process
- Fixed security issues found (in data deserialization and states/archives requests)
- New `COPYLEFT` instrustion
  `COPYLEFT (s, n - )` — where s — is slice of `256bit` `AccountId` and `n` — is type of license. Add license payment to code creator. The license payment calculates from `compute_phase_fees` taking the appropriate percentage. If summary payment is less than `license_payment_threshold`, then value saves in `unsplit_shard_state` of masterblock. If summary payment in `unsplit_shard_state` is more than `license_payment_threshold` then node sends internal message to account address in masterchain, specified in slice `s`  see [TIP-1.1](concept/standard/TIP-1/1.md).
- New `STORAGEFEE` instruction
  `STORAGEFEE ( -- x)`, returns the `Integer~x` with collected storage fee from account in this transaction. Equivalent to `GETPARAM 12`
- Full bounce: bounced message will contain `init_state` and full body of original message in first reference of the body
- Changes in `currency_collections`:
    - Changed calculation of bounced message fee if bounced message consists `currency_collections`
    - Changed some error codes in `currency_collections` operations
    - Now you can create account with zero grams and non-zero `extra_currencies`
    - Changed error in value with deleted and immediately created account with `currency_collections`
