| name | alias | opcode | category | fift_asm | stack | gas | tlb | desc |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NOP |  | 0 | stack_basic | NOP | - | 18 | #00 | Does nothing. |
| XCHG s1 | SWAP | 1 | stack_basic | SWAP | x y - y x | 18 | #01 | Same as `s1 XCHG0`. |
| XCHG s(i) | XCHG s0,s(i) | 0i | stack_basic |  |  | 18 |  | interchanges the top of the stack with s(i), 1 ≤ i ≤ 15 |
| XCHG s(i),s(j) |  | 10ij | stack_basic | s[i] s[j] XCHG |  | 26 | #10 i:(## 4) j:(## 4) {1 <= i} {i + 1 <= j} | Interchanges `s[i]` with `s[j]`, `1 <= i < j <= 15`. |
| XCHG s0,s(ii) |  | 11ii | stack_basic | s0 [ii] s() XCHG |  | 26 | #11 ii:uint8 | Interchanges the top of the stack with s(ii), with 0 ≤ ii ≤ 255. |
| XCHG s1,s(i) |  | 1i | stack_basic | s1 s[i] XCHG |  | 18 | #1 i:(## 4) {2 <= i} | Interchanges `s1` with `s[i]`, `2 <= i <= 15`. |
| PUSH |  | 2i | stack_basic | s[i] PUSH |  | 18 | #2 i:uint4 | Pushes a copy of the old `s[i]` into the stack. |
| DUP | PUSH | 20 | stack_basic | DUP | x - x x | 18 | #20 | Same as `s0 PUSH`. |
| OVER | PUSH | 21 | stack_basic | OVER | x y - x y x | 18 | #21 | Same as `s1 PUSH`. |
| POP |  | 3i | stack_basic | s[i] POP |  | 18 | #3 i:uint4 | Pops the old `s0` value into the old `s[i]`. |
| DROP | POP | 30 | stack_basic | DROP | x - | 18 | #30 | Same as `s0 POP`, discards the top-of-stack value. |
| NIP | POP | 31 | stack_basic | NIP | x y - y | 18 | #31 | Same as `s1 POP`. |
| XCHG3 |  | 4ijk | stack_complex | s[i] s[j] s[k] XCHG3 |  | 26 | #4 i:uint4 j:uint4 k:uint4 | Equivalent to `s2 s[i] XCHG` `s1 s[j] XCHG` `s[k] XCHG0`. |
| XCHG2 |  | 50ij | stack_complex | s[i] s[j] XCHG2 |  | 26 | #50 i:uint4 j:uint4 | Equivalent to `s1 s[i] XCHG` `s[j] XCHG0`. |
| XCPU |  | 51ij | stack_complex | s[i] s[j] XCPU |  | 26 | #51 i:uint4 j:uint4 | Equivalent to `s[i] XCHG0` `s[j] PUSH`. |
| PUXC |  | 52ij | stack_complex | s[i] s[j-1] PUXC |  | 26 | #52 i:uint4 j:uint4 | Equivalent to `s[i] PUSH` `SWAP` `s[j] XCHG0`. |
| PUSH2 |  | 53ij | stack_complex | s[i] s[j] PUSH2 |  | 26 | #53 i:uint4 j:uint4 | Equivalent to `s[i] PUSH` `s[j+1] PUSH`. |
| XCHG3_ALT |  | 540ijk | stack_complex | s[i] s[j] s[k] XCHG3_l |  | 34 | #540 i:uint4 j:uint4 k:uint4 | Long form of `XCHG3`. |
| XC2PU |  | 541ijk | stack_complex | s[i] s[j] s[k] XC2PU |  | 34 | #541 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] s[j] XCHG2` `s[k] PUSH`. |
| XCPUXC |  | 542ijk | stack_complex | s[i] s[j] s[k-1] XCPUXC |  | 34 | #542 i:uint4 j:uint4 k:uint4 | Equivalent to `s1 s[i] XCHG` `s[j] s[k-1] PUXC`. |
| XCPU2 |  | 543ijk | stack_complex | s[i] s[j] s[k] XCPU2 |  | 34 | #543 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] XCHG0` `s[j] s[k] PUSH2`. |
| PUXC2 |  | 544ijk | stack_complex | s[i] s[j-1] s[k-1] PUXC2 |  | 34 | #544 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] PUSH` `s2 XCHG0` `s[j] s[k] XCHG2`. |
| PUXCPU |  | 545ijk | stack_complex | s[i] s[j-1] s[k-1] PUXCPU |  | 34 | #545 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] s[j-1] PUXC` `s[k] PUSH`. |
| PU2XC |  | 546ijk | stack_complex | s[i] s[j-1] s[k-2] PU2XC |  | 34 | #546 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] PUSH` `SWAP` `s[j] s[k-1] PUXC`. |
| PUSH3 |  | 547ijk | stack_complex | s[i] s[j] s[k] PUSH3 |  | 34 | #547 i:uint4 j:uint4 k:uint4 | Equivalent to `s[i] PUSH` `s[j+1] s[k+1] PUSH2`. |
| BLKSWAP |  | 55ij | stack_complex | [i+1] [j+1] BLKSWAP |  | 26 | #55 i:uint4 j:uint4 | Permutes two blocks `s[j+i+1] … s[j+1]` and `s[j] … s0`.
`0 <= i,j <= 15`
Equivalent to `[i+1] [j+1] REVERSE` `[j+1] 0 REVERSE` `[i+j+2] 0 REVERSE`. |
| ROT2 | BLKSWAP | 5513 | stack_complex | ROT2
2ROT | a b c d e f - c d e f a b | 26 | #5513 | Rotates the three topmost pairs of stack entries. |
| ROLL | BLKSWAP | 550i | stack_complex | [i+1] ROLL |  | 26 | #550 i:uint4 | Rotates the top `i+1` stack entries.
Equivalent to `1 [i+1] BLKSWAP`. |
| ROLLREV | BLKSWAP | 55i0 | stack_complex | [i+1] -ROLL
[i+1] ROLLREV |  | 26 | #55 i:uint4 zero:(## 4) {zero = 0} | Rotates the top `i+1` stack entries in the other direction.
Equivalent to `[i+1] 1 BLKSWAP`. |
| PUSH_LONG |  | 56ii | stack_complex | [ii] s() PUSH |  | 26 | #56 ii:uint8 | Pushes a copy of the old `s[ii]` into the stack.
`0 <= ii <= 255` |
| POP_LONG |  | 57ii | stack_complex | [ii] s() POP |  | 26 | #57 ii:uint8 | Pops the old `s0` value into the old `s[ii]`.
`0 <= ii <= 255` |
| ROT |  | 58 | stack_complex | ROT | a b c - b c a | 18 | #58 | Equivalent to `1 2 BLKSWAP` or to `s2 s1 XCHG2`. |
| ROTREV |  | 59 | stack_complex | ROTREV
-ROT | a b c - c a b | 18 | #59 | Equivalent to `2 1 BLKSWAP` or to `s2 s2 XCHG2`. |
| SWAP2 |  | 5A | stack_complex | SWAP2
2SWAP | a b c d - c d a b | 18 | #5A | Equivalent to `2 2 BLKSWAP` or to `s3 s2 XCHG2`. |
| DROP2 |  | 5B | stack_complex | DROP2
2DROP | a b - | 18 | #5B | Equivalent to `DROP` `DROP`. |
| DUP2 |  | 5C | stack_complex | DUP2
2DUP | a b - a b a b | 18 | #5C | Equivalent to `s1 s0 PUSH2`. |
| OVER2 |  | 5D | stack_complex | OVER2
2OVER | a b c d - a b c d a b | 18 | #5D | Equivalent to `s3 s2 PUSH2`. |
| REVERSE |  | 5Eij | stack_complex | [i+2] [j] REVERSE |  | 26 | #5E i:uint4 j:uint4 | Reverses the order of `s[j+i+1] … s[j]`. |
| BLKDROP |  | 5F0i | stack_complex | [i] BLKDROP |  | 26 | #5F0 i:uint4 | Equivalent to `DROP` performed `i` times. |
| BLKPUSH |  | 5Fij | stack_complex | [i] [j] BLKPUSH |  | 26 | #5F i:(## 4) j:uint4 {1 <= i} | Equivalent to `PUSH s(j)` performed `i` times.
`1 <= i <= 15`, `0 <= j <= 15`. |
| PICK |  | 60 | stack_complex | PICK
PUSHX |  | 18 | #60 | Pops integer `i` from the stack, then performs `s[i] PUSH`. |
| ROLLX |  | 61 | stack_complex | ROLLX |  | 18 | #61 | Pops integer `i` from the stack, then performs `1 [i] BLKSWAP`. |
| -ROLLX |  | 62 | stack_complex | -ROLLX
ROLLREVX |  | 18 | #62 | Pops integer `i` from the stack, then performs `[i] 1 BLKSWAP`. |
| BLKSWX |  | 63 | stack_complex | BLKSWX |  | 18 | #63 | Pops integers `i`,`j` from the stack, then performs `[i] [j] BLKSWAP`. |
| REVX |  | 64 | stack_complex | REVX |  | 18 | #64 | Pops integers `i`,`j` from the stack, then performs `[i] [j] REVERSE`. |
| DROPX |  | 65 | stack_complex | DROPX |  | 18 | #65 | Pops integer `i` from the stack, then performs `[i] BLKDROP`. |
| TUCK |  | 66 | stack_complex | TUCK | a b - b a b | 18 | #66 | Equivalent to `SWAP` `OVER` or to `s1 s1 XCPU`. |
| XCHGX |  | 67 | stack_complex | XCHGX |  | 18 | #67 | Pops integer `i` from the stack, then performs `s[i] XCHG`. |
| DEPTH |  | 68 | stack_complex | DEPTH | - depth | 18 | #68 | Pushes the current depth of the stack. |
| CHKDEPTH |  | 69 | stack_complex | CHKDEPTH | i - | 18/58 | #69 | Pops integer `i` from the stack, then checks whether there are at least `i` elements, generating a stack underflow exception otherwise. |
| ONLYTOPX |  | 6A | stack_complex | ONLYTOPX |  | 18 | #6A | Pops integer `i` from the stack, then removes all but the top `i` elements. |
| ONLYX |  | 6B | stack_complex | ONLYX |  | 18 | #6B | Pops integer `i` from the stack, then leaves only the bottom `i` elements. Approximately equivalent to `DEPTH` `SWAP` `SUB` `DROPX`. |
| BLKDROP2 |  | 6Cij | stack_complex | [i] [j] BLKDROP2 |  | 26 | #6C i:(## 4) j:uint4 {1 <= i} | Drops `i` stack elements under the top `j` elements.
`1 <= i <= 15`, `0 <= j <= 15`
Equivalent to `[i+j] 0 REVERSE` `[i] BLKDROP` `[j] 0 REVERSE`. |
| NULL |  | 6D | tuple | NULL
PUSHNULL | - null | 18 | #6D | Pushes the only value of type _Null_. |
| ISNULL |  | 6E | tuple | ISNULL | x - ? | 18 | #6E | Checks whether `x` is a _Null_, and returns `-1` or `0` accordingly. |
| TUPLE |  | 6F0n | tuple | [n] TUPLE | x_1 ... x_n - t | 26+n | #6F0 n:uint4 | Creates a new _Tuple_ `t=(x_1, … ,x_n)` containing `n` values `x_1`,..., `x_n`.
`0 <= n <= 15` |
| NIL | TUPLE | 6F00 | tuple | NIL | - t | 26 | #6F00 | Pushes the only _Tuple_ `t=()` of length zero. |
| SINGLE | TUPLE | 6F01 | tuple | SINGLE | x - t | 27 | #6F01 | Creates a singleton `t:=(x)`, i.e., a _Tuple_ of length one. |
| PAIR | TUPLE | 6F02 | tuple | PAIR
CONS | x y - t | 28 | #6F02 | Creates pair `t:=(x,y)`. |
| TRIPLE | TUPLE | 6F03 | tuple | TRIPLE | x y z - t | 29 | #6F03 | Creates triple `t:=(x,y,z)`. |
| INDEX |  | 6F1k | tuple | [k] INDEX | t - x | 26 | #6F1 k:uint4 | Returns the `k`-th element of a _Tuple_ `t`.
`0 <= k <= 15`. |
| FIRST | INDEX | 6F10 | tuple | FIRST
CAR | t - x | 26 | #6F10 | Returns the first element of a _Tuple_. |
| SECOND | INDEX | 6F11 | tuple | SECOND
CDR | t - y | 26 | #6F11 | Returns the second element of a _Tuple_. |
| THIRD | INDEX | 6F12 | tuple | THIRD | t - z | 26 | #6F12 | Returns the third element of a _Tuple_. |
| UNTUPLE |  | 6F2n | tuple | [n] UNTUPLE | t - x_1 ... x_n | 26+n | #6F2 n:uint4 | Unpacks a _Tuple_ `t=(x_1,...,x_n)` of length equal to `0 <= n <= 15`.
If `t` is not a _Tuple_, or if `|t| != n`, a type check exception is thrown. |
| UNSINGLE | UNTUPLE | 6F21 | tuple | UNSINGLE | t - x | 27 | #6F21 | Unpacks a singleton `t=(x)`. |
| UNPAIR | UNTUPLE | 6F22 | tuple | UNPAIR
UNCONS | t - x y | 28 | #6F22 | Unpacks a pair `t=(x,y)`. |
| UNTRIPLE | UNTUPLE | 6F23 | tuple | UNTRIPLE | t - x y z | 29 | #6F23 | Unpacks a triple `t=(x,y,z)`. |
| UNPACKFIRST |  | 6F3k | tuple | [k] UNPACKFIRST | t - x_1 ... x_k | 26+k | #6F3 k:uint4 | Unpacks first `0 <= k <= 15` elements of a _Tuple_ `t`.
If `|t|<k`, throws a type check exception. |
| CHKTUPLE | UNPACKFIRST | 6F30 | tuple | CHKTUPLE | t - | 26 | #6F30 | Checks whether `t` is a _Tuple_. If not, throws a type check exception. |
| EXPLODE |  | 6F4n | tuple | [n] EXPLODE | t - x_1 ... x_m m | 26+m | #6F4 n:uint4 | Unpacks a _Tuple_ `t=(x_1,...,x_m)` and returns its length `m`, but only if `m <= n <= 15`. Otherwise throws a type check exception. |
| SETINDEX |  | 6F5k | tuple | [k] SETINDEX | t x - t' | 26+|t| | #6F5 k:uint4 | Computes _Tuple_ `t'` that differs from `t` only at position `t'_{k+1}`, which is set to `x`.
`0 <= k <= 15`
If `k >= |t|`, throws a range check exception. |
| SETFIRST | SETINDEX | 6F50 | tuple | SETFIRST | t x - t' | 26+|t| | #6F50 | Sets the first component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| SETSECOND | SETINDEX | 6F51 | tuple | SETSECOND | t x - t' | 26+|t| | #6F51 | Sets the second component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| SETTHIRD | SETINDEX | 6F52 | tuple | SETTHIRD | t x - t' | 26+|t| | #6F52 | Sets the third component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| INDEXQ |  | 6F6k | tuple | [k] INDEXQ | t - x | 26 | #6F6 k:uint4 | Returns the `k`-th element of a _Tuple_ `t`, where `0 <= k <= 15`. In other words, returns `x_{k+1}` if `t=(x_1,...,x_n)`. If `k>=n`, or if `t` is _Null_, returns a _Null_ instead of `x`. |
| FIRSTQ | INDEXQ | 6F60 | tuple | FIRSTQ
CARQ | t - x | 26 | #6F60 | Returns the first element of a _Tuple_. |
| SECONDQ | INDEXQ | 6F61 | tuple | SECONDQ
CDRQ | t - y | 26 | #6F61 | Returns the second element of a _Tuple_. |
| THIRDQ | INDEXQ | 6F62 | tuple | THIRDQ | t - z | 26 | #6F62 | Returns the third element of a _Tuple_. |
| SETINDEXQ |  | 6F7k | tuple | [k] SETINDEXQ | t x - t' | 26+|t’| | #6F7 k:uint4 | Sets the `k`-th component of _Tuple_ `t` to `x`, where `0 <= k < 16`, and returns the resulting _Tuple_ `t'`.
If `|t| <= k`, first extends the original _Tuple_ to length `n’=k+1` by setting all new components to _Null_. If the original value of `t` is _Null_, treats it as an empty _Tuple_. If `t` is not _Null_ or _Tuple_, throws an exception. If `x` is _Null_ and either `|t| <= k` or `t` is _Null_, then always returns `t'=t` (and does not consume tuple creation gas). |
| SETFIRSTQ | SETINDEXQ | 6F70 | tuple | SETFIRSTQ | t x - t' | 26+|t’| | #6F70 | Sets the first component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| SETSECONDQ | SETINDEXQ | 6F71 | tuple | SETSECONDQ | t x - t' | 26+|t’| | #6F71 | Sets the second component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| SETTHIRDQ | SETINDEXQ | 6F72 | tuple | SETTHIRDQ | t x - t' | 26+|t’| | #6F72 | Sets the third component of _Tuple_ `t` to `x` and returns the resulting _Tuple_ `t'`. |
| TUPLEVAR |  | 6F80 | tuple | TUPLEVAR | x_1 ... x_n n - t | 26+n | #6F80 | Creates a new _Tuple_ `t` of length `n` similarly to `TUPLE`, but with `0 <= n <= 255` taken from the stack. |
| INDEXVAR |  | 6F81 | tuple | INDEXVAR | t k - x | 26 | #6F81 | Similar to `k INDEX`, but with `0 <= k <= 254` taken from the stack. |
| UNTUPLEVAR |  | 6F82 | tuple | UNTUPLEVAR | t n - x_1 ... x_n | 26+n | #6F82 | Similar to `n UNTUPLE`, but with `0 <= n <= 255` taken from the stack. |
| UNPACKFIRSTVAR |  | 6F83 | tuple | UNPACKFIRSTVAR | t n - x_1 ... x_n | 26+n | #6F83 | Similar to `n UNPACKFIRST`, but with `0 <= n <= 255` taken from the stack. |
| EXPLODEVAR |  | 6F84 | tuple | EXPLODEVAR | t n - x_1 ... x_m m | 26+m | #6F84 | Similar to `n EXPLODE`, but with `0 <= n <= 255` taken from the stack. |
| SETINDEXVAR |  | 6F85 | tuple | SETINDEXVAR | t x k - t' | 26+|t’| | #6F85 | Similar to `k SETINDEX`, but with `0 <= k <= 254` taken from the stack. |
| INDEXVARQ |  | 6F86 | tuple | INDEXVARQ | t k - x | 26 | #6F86 | Similar to `n INDEXQ`, but with `0 <= k <= 254` taken from the stack. |
| SETINDEXVARQ |  | 6F87 | tuple | SETINDEXVARQ | t x k - t' | 26+|t’| | #6F87 | Similar to `k SETINDEXQ`, but with `0 <= k <= 254` taken from the stack. |
| TLEN |  | 6F88 | tuple | TLEN | t - n | 26 | #6F88 | Returns the length of a _Tuple_. |
| QTLEN |  | 6F89 | tuple | QTLEN | t - n or -1 | 26 | #6F89 | Similar to `TLEN`, but returns `-1` if `t` is not a _Tuple_. |
| ISTUPLE |  | 6F8A | tuple | ISTUPLE | t - ? | 26 | #6F8A | Returns `-1` or `0` depending on whether `t` is a _Tuple_. |
| LAST |  | 6F8B | tuple | LAST | t - x | 26 | #6F8B | Returns the last element of a non-empty _Tuple_ `t`. |
| TPUSH |  | 6F8C | tuple | TPUSH
COMMA | t x - t' | 26+|t’| | #6F8C | Appends a value `x` to a _Tuple_ `t=(x_1,...,x_n)`, but only if the resulting _Tuple_ `t'=(x_1,...,x_n,x)` is of length at most 255. Otherwise throws a type check exception. |
| TPOP |  | 6F8D | tuple | TPOP | t - t' x | 26+|t’| | #6F8D | Detaches the last element `x=x_n` from a non-empty _Tuple_ `t=(x_1,...,x_n)`, and returns both the resulting _Tuple_ `t'=(x_1,...,x_{n-1})` and the original last element `x`. |
| ZEROSWAPIF |  | 6FA0 | tuple |  |  |  |  | pushes a zero under the topmost Integer x, but only if x ̸= 0 |
| ZEROSWAPIFNOT |  | 6FA1 | tuple |  |  |  |  | pushes a zero under the topmost Integer x, but only if x = 0. May be used for stack alignment after quiet primitives such as PLDUXQ |
| ZEROROTRIF |  | 6FA2 | tuple |  |  |  |  | pushes a zero under the second stack entry from the top, but only if the topmost Integer y is non-zero |
| ZEROROTRIFNOT |  | 6FA3 | tuple |  |  |  |  | pushes a zero under the second stack entry from the top, but only if the topmost Integer y is zero. May be used for stack alignment after quiet primitives such as LDUXQ |
| ZEROSWAPIF2 |  | 6FA4 | tuple |  |  |  |  | pushes two zeros under the topmost Integer x, but only if x ̸= 0. Equivalent to NULLSWAPIF; NULLSWAPIF |
| ZEROSWAPIFNOT2 |  | 6FA5 | tuple |  |  |  |  | pushes two zeroess under the topmost Integer x, but only if x = 0. Equivalent to NULLSWAPIFNOT; NULLSWAPIFNOT |
| ZEROROTRIF2 |  | 6FA6 | tuple |  |  |  |  | pushes two zeroess under the second stack entry from the top, but only if the topmost Integer y is non-zero. Equivalent to NULLROTRIF; NULLROTRIF |
| ZEROROTRIFNOT2 |  | 6FA7 | tuple |  |  |  |  | pushes two zeroess under the second stack entry from the top, but only if the topmost Integer y is zero. Equivalent to NULLROTRIFNOT; NULLROTRIFNOT |
| NULLSWAPIF |  | 6FA0 | tuple | NULLSWAPIF | x - x or null x | 26 | #6FA0 | Pushes a _Null_ under the topmost _Integer_ `x`, but only if `x!=0`. |
| NULLSWAPIFNOT |  | 6FA1 | tuple | NULLSWAPIFNOT | x - x or null x | 26 | #6FA1 | Pushes a _Null_ under the topmost _Integer_ `x`, but only if `x=0`. May be used for stack alignment after quiet primitives such as `PLDUXQ`. |
| NULLROTRIF |  | 6FA2 | tuple | NULLROTRIF | x y - x y or null x y | 26 | #6FA2 | Pushes a _Null_ under the second stack entry from the top, but only if the topmost _Integer_ `y` is non-zero. |
| NULLROTRIFNOT |  | 6FA3 | tuple | NULLROTRIFNOT | x y - x y or null x y | 26 | #6FA3 | Pushes a _Null_ under the second stack entry from the top, but only if the topmost _Integer_ `y` is zero. May be used for stack alignment after quiet primitives such as `LDUXQ`. |
| NULLSWAPIF2 |  | 6FA4 | tuple | NULLSWAPIF2 | x - x or null null x | 26 | #6FA4 | Pushes two _Null_s under the topmost _Integer_ `x`, but only if `x!=0`.
Equivalent to `NULLSWAPIF` `NULLSWAPIF`. |
| NULLSWAPIFNOT2 |  | 6FA5 | tuple | NULLSWAPIFNOT2 | x - x or null null x | 26 | #6FA5 | Pushes two _Null_s under the topmost _Integer_ `x`, but only if `x=0`.
Equivalent to `NULLSWAPIFNOT` `NULLSWAPIFNOT`. |
| NULLROTRIF2 |  | 6FA6 | tuple | NULLROTRIF2 | x y - x y or null null x y | 26 | #6FA6 | Pushes two _Null_s under the second stack entry from the top, but only if the topmost _Integer_ `y` is non-zero.
Equivalent to `NULLROTRIF` `NULLROTRIF`. |
| NULLROTRIFNOT2 |  | 6FA7 | tuple | NULLROTRIFNOT2 | x y - x y or null null x y | 26 | #6FA7 | Pushes two _Null_s under the second stack entry from the top, but only if the topmost _Integer_ `y` is zero.
Equivalent to `NULLROTRIFNOT` `NULLROTRIFNOT`. |
| INDEX2 |  | 6FBij | tuple | [i] [j] INDEX2 | t - x | 26 | #6FB i:uint2 j:uint2 | Recovers `x=(t_{i+1})_{j+1}` for `0 <= i,j <= 3`.
Equivalent to `[i] INDEX` `[j] INDEX`. |
| CADR | INDEX2 | 6FB4 | tuple | CADR | t - x | 26 | #6FB4 | Recovers `x=(t_2)_1`. |
| CDDR | INDEX2 | 6FB5 | tuple | CDDR | t - x | 26 | #6FB5 | Recovers `x=(t_2)_2`. |
| INDEX3 |  | 6FE_ijk | tuple | [i] [j] [k] INDEX3 | t - x | 26 | #6FE_ i:uint2 j:uint2 k:uint2 | Recovers `x=t_{i+1}_{j+1}_{k+1}`.
`0 <= i,j,k <= 3`
Equivalent to `[i] [j] INDEX2` `[k] INDEX`. |
| CADDR | INDEX3 | 6FD4 | tuple | CADDR | t - x | 26 | #6FD4 | Recovers `x=t_2_2_1`. |
| CDDDR | INDEX3 | 6FD5 | tuple | CDDDR | t - x | 26 | #6FD5 | Recovers `x=t_2_2_2`. |
| PUSHINT_4 |  | 7i | const_int | [x] PUSHINT
[x] INT | - x | 18 | #7 i:uint4 | Pushes integer `x` into the stack. `-5 <= x <= 10`.
Here `i` equals four lower-order bits of `x` (`i=x mod 16`). |
| ZERO | PUSHINT_4 | 70 | const_int | ZERO
FALSE | 0 | 18 | #70 |  |
| ONE | PUSHINT_4 | 71 | const_int | ONE | -1 | 18 | #71 |  |
| TWO | PUSHINT_4 | 72 | const_int | TWO | -2 | 18 | #72 |  |
| TEN | PUSHINT_4 | 7A | const_int | TEN | -10 | 18 | #7A |  |
| TRUE | PUSHINT_4 | 7F | const_int | TRUE | - -1 | 18 | #7F |  |
| PUSHINT_8 |  | 80xx | const_int | [xx] PUSHINT
[xx] INT | - xx | 26 | #80 xx:int8 | Pushes integer `xx`. `-128 <= xx <= 127`. |
| PUSHINT_16 |  | 81xxxx | const_int | [xxxx] PUSHINT
[xxxx] INT | - xxxx | 34 | #81 xxxx:int16 | Pushes integer `xxxx`. `-2^15 <= xx < 2^15`. |
| PUSHINT_LONG |  | 82lxxx | const_int | [xxx] PUSHINT
[xxx] INT | - xxx | 23 | #82 l:(## 5) xxx:(int (8 * l + 19)) | Pushes integer `xxx`.
_Details:_ 5-bit `0 <= l <= 30` determines the length `n=8l+19` of signed big-endian integer `xxx`.
The total length of this instruction is `l+4` bytes or `n+13=8l+32` bits. |
| PUSHPOW2 |  | 83xx | const_int | [xx+1] PUSHPOW2 | - 2^(xx+1) | 26 | #83 xx:uint8 | (Quietly) pushes `2^(xx+1)` for `0 <= xx <= 255`.
`2^256` is a `NaN`. |
| PUSHNAN | PUSHPOW2 | 83FF | const_int | PUSHNAN | - NaN | 26 | #83FF | Pushes a `NaN`. |
| PUSHPOW2DEC |  | 84xx | const_int | [xx+1] PUSHPOW2DEC | - 2^(xx+1)-1 | 26 | #84 xx:uint8 | Pushes `2^(xx+1)-1` for `0 <= xx <= 255`. |
| PUSHNEGPOW2 |  | 85xx | const_int | [xx+1] PUSHNEGPOW2 | - -2^(xx+1) | 26 | #85 xx:uint8 | Pushes `-2^(xx+1)` for `0 <= xx <= 255`. |
| PUSHREF |  | 88 | const_data | [ref] PUSHREF | - c | 18 | #88 c:^Cell | Pushes the reference `ref` into the stack.
_Details:_ Pushes the first reference of `cc.code` into the stack as a _Cell_ (and removes this reference from the current continuation). |
| PUSHREFSLICE |  | 89 | const_data | [ref] PUSHREFSLICE | - s | 118/43 | #89 c:^Cell | Similar to `PUSHREF`, but converts the cell into a _Slice_. |
| PUSHREFCONT |  | 8A | const_data | [ref] PUSHREFCONT | - cont | 118/43 | #8A c:^Cell | Similar to `PUSHREFSLICE`, but makes a simple ordinary _Continuation_ out of the cell. |
| PUSHSLICE |  | 8Bxsss | const_data | [slice] PUSHSLICE
[slice] SLICE | - s | 22 | #8B x:(## 4) sss:((8 * x + 4) * Bit) | Pushes the slice `slice` into the stack.
_Details:_ Pushes the (prefix) subslice of `cc.code` consisting of its first `8x+4` bits and no references (i.e., essentially a bitstring), where `0 <= x <= 15`.
A completion tag is assumed, meaning that all trailing zeroes and the last binary one (if present) are removed from this bitstring.
If the original bitstring consists only of zeroes, an empty slice will be pushed. |
| PUSHSLICE_REFS |  | 8Crxxssss | const_data | [slice] PUSHSLICE
[slice] SLICE | - s | 25 | #8C r:(## 2) xx:(## 5) c:((r + 1) * ^Cell) ssss:((8 * xx + 1) * Bit) | Pushes the slice `slice` into the stack.
_Details:_ Pushes the (prefix) subslice of `cc.code` consisting of its first `1 <= r+1 <= 4` references and up to first `8xx+1` bits of data, with `0 <= xx <= 31`.
A completion tag is also assumed. |
| PUSHSLICE_LONG |  | 8Drxxsssss | const_data | [slice] PUSHSLICE
[slice] SLICE | - s | 28 | #8D r:(#<= 4) xx:(## 7) c:(r * ^Cell) ssss:((8 * xx + 6) * Bit) | Pushes the slice `slice` into the stack.
_Details:_ Pushes the subslice of `cc.code` consisting of `0 <= r <= 4` references and up to `8xx+6` bits of data, with `0 <= xx <= 127`.
A completion tag is assumed. |
|  |  |  | const_data | x{} PUSHSLICE
x{ABCD1234} PUSHSLICE
b{01101} PUSHSLICE | - s |  |  | Examples of `PUSHSLICE`.
`x{}` is an empty slice. `x{...}` is a hexadecimal literal. `b{...}` is a binary literal.
More on slice literals [here](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-51-slice-literals).
Note that the assembler can replace `PUSHSLICE` with `PUSHREFSLICE` in certain situations (e.g. if there’s not enough space in the current continuation). |
|  |  |  | const_data | <b x{AB12} s, b> PUSHREF <b x {    AB12 } s, b> PUSHREFSLICE | - c/s |  |  | Examples of `PUSHREF` and `PUSHREFSLICE`.
More on building cells in fift [here](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-52-builder-primitives). |
| PUSHCONT |  | 8F_rxxcccc | const_data | [builder] PUSHCONT
[builder] CONT | - c | 26 | #8F_ r:(## 2) xx:(## 7) c:(r * ^Cell) ssss:((8 * xx) * Bit) | Pushes a continuation made from `builder`.
_Details:_ Pushes the simple ordinary continuation `cccc` made from the first `0 <= r <= 3` references and the first `0 <= xx <= 127` bytes of `cc.code`. |
| PUSHCONT_SHORT |  | 9xccc | const_data | [builder] PUSHCONT
[builder] CONT | - c | 18 | #9 x:(## 4) ssss:((8 * x) * Bit) | Pushes a continuation made from `builder`.
_Details:_ Pushes an `x`-byte continuation for `0 <= x <= 15`. |
|  |  |  | const_data | <{ code }> PUSHCONT
<{ code }> CONT
CONT:<{ code }> | - c |  |  | Pushes a continuation with code `code`.
Note that the assembler can replace `PUSHCONT` with `PUSHREFCONT` in certain situations (e.g. if there’s not enough space in the current continuation). |
| ADD |  | A0 | arithm_basic | ADD | x y - x+y | 18 | #A0 |  |
| SUB |  | A1 | arithm_basic | SUB | x y - x-y | 18 | #A1 |  |
| SUBR |  | A2 | arithm_basic | SUBR | x y - y-x | 18 | #A2 | Equivalent to `SWAP` `SUB`. |
| NEGATE |  | A3 | arithm_basic | NEGATE | x - -x | 18 | #A3 | Equivalent to `-1 MULCONST` or to `ZERO SUBR`.
Notice that it triggers an integer overflow exception if `x=-2^256`. |
| INC |  | A4 | arithm_basic | INC | x - x+1 | 18 | #A4 | Equivalent to `1 ADDCONST`. |
| DEC |  | A5 | arithm_basic | DEC | x - x-1 | 18 | #A5 | Equivalent to `-1 ADDCONST`. |
| ADDCONST |  | A6cc | arithm_basic | [cc] ADDCONST
[cc] ADDINT
[-cc] SUBCONST
[-cc] SUBINT | x - x+cc | 26 | #A6 cc:int8 | `-128 <= cc <= 127`. |
| MULCONST |  | A7cc | arithm_basic | [cc] MULCONST
[cc] MULINT | x - x*cc | 26 | #A7 cc:int8 | `-128 <= cc <= 127`. |
| MUL |  | A8 | arithm_basic | MUL | x y - x*y | 18 | #A8 |  |
| DIV_BASE |  | A9mscdf | arithm_div |  |  | 26 | #A9 m:uint1 s:uint2 cdft:(Either [ d:uint2 f:uint2 ] [ d:uint2 f:uint2 tt:uint8 ]) | This is the general encoding of division, with an optional pre-multiplication and an optional replacement of the division or multiplication by a shift. Variable fields are as follows:
`0 <= m <= 1`  -  Indicates whether there is pre-multiplication (`MULDIV` and its variants), possibly replaced by a left shift.
`0 <= s <= 2`  -  Indicates whether either the multiplication or the division have been replaced by shifts: `s=0` - no replacement, `s=1` - division replaced by a right shift, `s=2` - multiplication replaced by a left shift (possible only for `m=1`).
`0 <= c <= 1`  -  Indicates whether there is a constant one-byte argument `tt` for the shift operator (if `s!=0`). For `s=0`, `c=0`. If `c=1`, then `0 <= tt <= 255`, and the shift is performed by `tt+1` bits. If `s!=0` and `c=0`, then the shift amount is provided to the instruction as a top-of-stack _Integer_ in range `0...256`.
`1 <= d <= 3`  -  Indicates which results of division are required: `1` - only the quotient, `2` - only the remainder, `3` - both.
`0 <= f <= 2`  -  Rounding mode: `0` - floor, `1` - nearest integer, `2` - ceiling.
All instructions below are variants of this. |
| DIV | DIV_BASE | A904 | arithm_div | DIV | x y - q | 26 | #A904 | `q=floor(x/y)`, `r=x-y*q` |
| DIVR | DIV_BASE | A905 | arithm_div | DIVR | x y - q’ | 26 | #A905 | `q’=round(x/y)`, `r’=x-y*q’` |
| DIVC | DIV_BASE | A906 | arithm_div | DIVC | x y - q'' | 26 | #A906 | `q’’=ceil(x/y)`, `r’’=x-y*q’’` |
| MOD | DIV_BASE | A908 | arithm_div | MOD | x y - r | 26 | #A908 |  |
| DIVMOD | DIV_BASE | A90C | arithm_div | DIVMOD | x y - q r | 26 | #A90C |  |
| DIVMODR | DIV_BASE | A90D | arithm_div | DIVMODR | x y - q' r' | 26 | #A90D |  |
| DIVMODC | DIV_BASE | A90E | arithm_div | DIVMODC | x y - q'' r'' | 26 | #A90E |  |
| RSHIFTR_VAR | DIV_BASE | A925 | arithm_div | RSHIFTR | x y - round(x/2^y) | 26 | #A925 |  |
| RSHIFTC_VAR | DIV_BASE | A926 | arithm_div | RSHIFTC | x y - ceil(x/2^y) | 34 | #A926 |  |
| RSHIFTR | DIV_BASE | A935tt | arithm_div | [tt+1] RSHIFTR# | x y - round(x/2^(tt+1)) | 34 | #A935 tt:uint8 |  |
| RSHIFTC | DIV_BASE | A936tt | arithm_div | [tt+1] RSHIFTC# | x y - ceil(x/2^(tt+1)) | 34 | #A936 tt:uint8 |  |
| MODPOW2 | DIV_BASE | A938tt | arithm_div | [tt+1] MODPOW2# | x - x mod 2^(tt+1) | 26 | #A938 tt:uint8 |  |
| MULDIV | DIV_BASE | A98 | arithm_div | MULDIV | x y z - q | 26 | #A984 | `q=floor(x*y/z)` |
| MULDIVR | DIV_BASE | A985 | arithm_div | MULDIVR | x y z - q' | 26 | #A985 | `q'=round(x*y/z)` |
| MULDIVMOD | DIV_BASE | A98C | arithm_div | MULDIVMOD | x y z - q r | 26 | #A98C | `q=floor(x*y/z)`, `r=x*y-z*q` |
| MULRSHIFT_VAR | DIV_BASE | A9A4 | arithm_div | MULRSHIFT | x y z - floor(x*y/2^z) | 26 | #A9A4 | `0 <= z <= 256` |
| MULRSHIFTR_VAR | DIV_BASE | A9A5 | arithm_div | MULRSHIFTR | x y z - round(x*y/2^z) | 26 | #A9A5 | `0 <= z <= 256` |
| MULRSHIFTC_VAR | DIV_BASE | A9A6 | arithm_div | MULRSHIFTC | x y z - ceil(x*y/2^z) | 34 | #A9A6 | `0 <= z <= 256` |
| MULRSHIFT | DIV_BASE | A9B4tt | arithm_div | [tt+1] MULRSHIFT# | x y - floor(x*y/2^(tt+1)) | 34 | #A9B4 tt:uint8 |  |
| MULRSHIFTR | DIV_BASE | A9B5tt | arithm_div | [tt+1] MULRSHIFTR# | x y - round(x*y/2^(tt+1)) | 34 | #A9B5 tt:uint8 |  |
| MULRSHIFTC | DIV_BASE | A9B6tt | arithm_div | [tt+1] MULRSHIFTC# | x y - ceil(x*y/2^(tt+1)) | 26 | #A9B6 tt:uint8 |  |
| LSHIFTDIV_VAR | DIV_BASE | A9C4 | arithm_div | LSHIFTDIV | x y z - floor(2^z*x/y) | 26 | #A9C4 | `0 <= z <= 256` |
| LSHIFTDIVR_VAR | DIV_BASE | A9C5 | arithm_div | LSHIFTDIVR | x y z - round(2^z*x/y) | 26 | #A9C5 | `0 <= z <= 256` |
| LSHIFTDIVC_VAR | DIV_BASE | A9C6 | arithm_div | LSHIFTDIVC | x y z - ceil(2^z*x/y) | 34 | #A9C6 | `0 <= z <= 256` |
| LSHIFTDIV | DIV_BASE | A9D4tt | arithm_div | [tt+1] LSHIFT#DIV | x y - floor(2^(tt+1)*x/y) | 34 | #A9D4 tt:uint8 |  |
| LSHIFTDIVR | DIV_BASE | A9D5tt | arithm_div | [tt+1] LSHIFT#DIVR | x y - round(2^(tt+1)*x/y) | 34 | #A9D5 tt:uint8 |  |
| LSHIFTDIVC | DIV_BASE | A9D6tt | arithm_div | [tt+1] LSHIFT#DIVC | x y - ceil(2^(tt+1)*x/y) | 26 | #A9D6 tt:uint8 |  |
| LSHIFT |  | AAcc | arithm_logical | [cc+1] LSHIFT# | x - x*2^(cc+1) | 26 | #AA cc:uint8 | `0 <= cc <= 255` |
| RSHIFT |  | ABcc | arithm_logical | [cc+1] RSHIFT# | x - floor(x/2^(cc+1)) | 18 | #AB cc:uint8 | `0 <= cc <= 255` |
| LSHIFT_VAR |  | AC | arithm_logical | LSHIFT | x y - x*2^y | 18 | #AC | `0 <= y <= 1023` |
| RSHIFT_VAR |  | AD | arithm_logical | RSHIFT | x y - floor(x/2^y) | 18 | #AD | `0 <= y <= 1023` |
| POW2 |  | AE | arithm_logical | POW2 | y - 2^y | 18 | #AE | `0 <= y <= 1023`
Equivalent to `ONE` `SWAP` `LSHIFT`. |
| AND |  | B0 | arithm_logical | AND | x y - x&y | 18 | #B0 | Bitwise and of two signed integers `x` and `y`, sign-extended to infinity. |
| OR |  | B1 | arithm_logical | OR | x y - x|y | 18 | #B1 | Bitwise or of two integers. |
| XOR |  | B2 | arithm_logical | XOR | x y - x xor y | 18 | #B2 | Bitwise xor of two integers. |
| NOT |  | B3 | arithm_logical | NOT | x - ~x | 26 | #B3 | Bitwise not of an integer. |
| FITS |  | B4cc | arithm_logical | [cc+1] FITS | x - x | 26/76 | #B4 cc:uint8 | Checks whether `x` is a `cc+1`-bit signed integer for `0 <= cc <= 255` (i.e., whether `-2^cc <= x < 2^cc`).
If not, either triggers an integer overflow exception, or replaces `x` with a `NaN` (quiet version). |
| CHKBOOL | FITS | B400 | arithm_logical | CHKBOOL | x - x | 26/76 | #B400 | Checks whether `x` is a “boolean value'' (i.e., either 0 or -1). |
| UFITS |  | B5cc | arithm_logical | [cc+1] UFITS | x - x | 26/76 | #B5 cc:uint8 | Checks whether `x` is a `cc+1`-bit unsigned integer for `0 <= cc <= 255` (i.e., whether `0 <= x < 2^(cc+1)`). |
| CHKBIT | UFITS | B500 | arithm_logical | CHKBIT | x - x | 26/76 | #B500 | Checks whether `x` is a binary digit (i.e., zero or one). |
| FITSX |  | B600 | arithm_logical | FITSX | x c - x | 26/76 | #B600 | Checks whether `x` is a `c`-bit signed integer for `0 <= c <= 1023`. |
| UFITSX |  | B601 | arithm_logical | UFITSX | x c - x | 26/76 | #B601 | Checks whether `x` is a `c`-bit unsigned integer for `0 <= c <= 1023`. |
| BITSIZE |  | B602 | arithm_logical | BITSIZE | x - c | 26 | #B602 | Computes smallest `c >= 0` such that `x` fits into a `c`-bit signed integer (`-2^(c-1) <= c < 2^(c-1)`). |
| UBITSIZE |  | B603 | arithm_logical | UBITSIZE | x - c | 26 | #B603 | Computes smallest `c >= 0` such that `x` fits into a `c`-bit unsigned integer (`0 <= x < 2^c`), or throws a range check exception. |
| MIN |  | B608 | arithm_logical | MIN | x y - x or y | 26 | #B608 | Computes the minimum of two integers `x` and `y`. |
| MAX |  | B609 | arithm_logical | MAX | x y - x or y | 26 | #B609 | Computes the maximum of two integers `x` and `y`. |
| MINMAX |  | B60A | arithm_logical | MINMAX
INTSORT2 | x y - x y or y x | 26 | #B60A | Sorts two integers. Quiet version of this operation returns two `NaN`s if any of the arguments are `NaN`s. |
| ABS |  | B60B | arithm_logical | ABS | x - |x| | 26 | #B60B | Computes the absolute value of an integer `x`. |
| QADD |  | B7A0 | arithm_quiet | QADD | x y - x+y | 26 | #B7A0 |  |
| QSUB |  | B7A1 | arithm_quiet | QSUB | x y - x-y | 26 | #B7A1 |  |
| QSUBR |  | B7A2 | arithm_quiet | QSUBR | x y - y-x | 26 | #B7A2 |  |
| QNEGATE |  | B7A3 | arithm_quiet | QNEGATE | x - -x | 26 | #B7A3 |  |
| QINC |  | B7A4 | arithm_quiet | QINC | x - x+1 | 26 | #B7A4 |  |
| QDEC |  | B7A5 | arithm_quiet | QDEC | x - x-1 | 26 | #B7A5 |  |
| QMUL |  | B7A8 | arithm_quiet | QMUL | x y - x*y | 26 | #B7A8 |  |
| QDIV |  | B7A904 | arithm_quiet | QDIV | x y - q | 34 | #B7A904 | Division returns `NaN` if `y=0`. |
| QDIVR |  | B7A905 | arithm_quiet | QDIVR | x y - q’ | 34 | #B7A905 |  |
| QDIVC |  | B7A906 | arithm_quiet | QDIVC | x y - q'' | 34 | #B7A906 |  |
| QMOD |  | B7A908 | arithm_quiet | QMOD | x y - r | 34 | #B7A908 |  |
| QDIVMOD |  | B7A90C | arithm_quiet | QDIVMOD | x y - q r | 34 | #B7A90C |  |
| QDIVMODR |  | B7A90D | arithm_quiet | QDIVMODR | x y - q' r' | 34 | #B7A90D |  |
| QDIVMODC |  | B7A90E | arithm_quiet | QDIVMODC | x y - q'' r'' | 34 | #B7A90E |  |
| QMULDIVR |  | B7A985 | arithm_quiet | QMULDIVR | x y z - q' | 34 | #B7A985 |  |
| QMULDIVMOD |  | B7A98C | arithm_quiet | QMULDIVMOD | x y z - q r | 34 | #B7A98C |  |
| QLSHIFT |  | B7AC | arithm_quiet | QLSHIFT | x y - x*2^y | 26 | #B7AC |  |
| QRSHIFT |  | B7AD | arithm_quiet | QRSHIFT | x y - floor(x/2^y) | 26 | #B7AD |  |
| QPOW2 |  | B7AE | arithm_quiet | QPOW2 | y - 2^y | 26 | #B7AE |  |
| QAND |  | B7B0 | arithm_quiet | QAND | x y - x&y | 26 | #B7B0 |  |
| QOR |  | B7B1 | arithm_quiet | QOR | x y - x|y | 26 | #B7B1 |  |
| QXOR |  | B7B2 | arithm_quiet | QXOR | x y - x xor y | 26 | #B7B2 |  |
| QNOT |  | B7B3 | arithm_quiet | QNOT | x - ~x | 26 | #B7B3 |  |
| QFITS |  | B7B4cc | arithm_quiet | [cc+1] QFITS | x - x | 34 | #B7B4 cc:uint8 | Replaces `x` with a `NaN` if x is not a `cc+1`-bit signed integer, leaves it intact otherwise. |
| QUFITS |  | B7B5cc | arithm_quiet | [cc+1] QUFITS | x - x | 34 | #B7B5 cc:uint8 | Replaces `x` with a `NaN` if x is not a `cc+1`-bit unsigned integer, leaves it intact otherwise. |
| QFITSX |  | B7B600 | arithm_quiet | QFITSX | x c - x | 34 | #B7B600 | Replaces `x` with a `NaN` if x is not a c-bit signed integer, leaves it intact otherwise. |
| QUFITSX |  | B7B601 | arithm_quiet | QUFITSX | x c - x | 34 | #B7B601 | Replaces `x` with a `NaN` if x is not a c-bit unsigned integer, leaves it intact otherwise. |
| SGN |  | B8 | compare_int | SGN | x - sgn(x) | 18 | #B8 | Computes the sign of an integer `x`:
`-1` if `x<0`, `0` if `x=0`, `1` if `x>0`. |
| LESS |  | B9 | compare_int | LESS | x y - x<y | 18 | #B9 | Returns `-1` if `x<y`, `0` otherwise. |
| EQUAL |  | BA | compare_int | EQUAL | x y - x=y | 18 | #BA | Returns `-1` if `x=y`, `0` otherwise. |
| LEQ |  | BB | compare_int | LEQ | x y - x<=y | 18 | #BB |  |
| GREATER |  | BC | compare_int | GREATER | x y - x>y | 18 | #BC |  |
| NEQ |  | BD | compare_int | NEQ | x y - x!=y | 18 | #BD | Equivalent to `EQUAL` `NOT`. |
| GEQ |  | BE | compare_int | GEQ | x y - x>=y | 18 | #BE | Equivalent to `LESS` `NOT`. |
| CMP |  | BF | compare_int | CMP | x y - sgn(x-y) | 18 | #BF | Computes the sign of `x-y`:
`-1` if `x<y`, `0` if `x=y`, `1` if `x>y`.
No integer overflow can occur here unless `x` or `y` is a `NaN`. |
| EQINT |  | C0yy | compare_int | [yy] EQINT | x - x=yy | 26 | #C0 yy:int8 | Returns `-1` if `x=yy`, `0` otherwise.
`-2^7 <= yy < 2^7`. |
| ISZERO | EQINT | C000 | compare_int | ISZERO | x - x=0 | 26 | #C000 | Checks whether an integer is zero. Corresponds to Forth's `0=`. |
| LESSINT |  | C1yy | compare_int | [yy] LESSINT
[yy-1] LEQINT | x - x<yy | 26 | #C1 yy:int8 | Returns `-1` if `x<yy`, `0` otherwise.
`-2^7 <= yy < 2^7`. |
| ISNEG | LESSINT | C100 | compare_int | ISNEG | x - x<0 | 26 | #C100 | Checks whether an integer is negative. Corresponds to Forth's `0<`. |
| ISNPOS | LESSINT | C101 | compare_int | ISNPOS | x - x<=0 | 26 | #C101 | Checks whether an integer is non-positive. |
| GTINT |  | C2yy | compare_int | [yy] GTINT
[yy+1] GEQINT | x - x>yy | 26 | #C2 yy:int8 | Returns `-1` if `x>yy`, `0` otherwise.
`-2^7 <= yy < 2^7`. |
| ISPOS | GTINT | C200 | compare_int | ISPOS | x - x>0 | 26 | #C200 | Checks whether an integer is positive. Corresponds to Forth's `0>`. |
| ISNNEG | GTINT | C2FF | compare_int | ISNNEG | x - x >=0 | 26 | #C2FF | Checks whether an integer is non-negative. |
| NEQINT |  | C3yy | compare_int | [yy] NEQINT | x - x!=yy | 26 | #C3 yy:int8 | Returns `-1` if `x!=yy`, `0` otherwise.
`-2^7 <= yy < 2^7`. |
| ISNAN |  | C4 | compare_int | ISNAN | x - x=NaN | 18 | #C4 | Checks whether `x` is a `NaN`. |
| CHKNAN |  | C5 | compare_int | CHKNAN | x - x | 18/68 | #C5 | Throws an arithmetic overflow exception if `x` is a `NaN`. |
| SEMPTY |  | C700 | compare_other | SEMPTY | s - ? | 26 | #C700 | Checks whether a _Slice_ `s` is empty (i.e., contains no bits of data and no cell references). |
| SDEMPTY |  | C701 | compare_other | SDEMPTY | s - ? | 26 | #C701 | Checks whether _Slice_ `s` has no bits of data. |
| SREMPTY |  | C702 | compare_other | SREMPTY | s - ? | 26 | #C702 | Checks whether _Slice_ `s` has no references. |
| SDFIRST |  | C703 | compare_other | SDFIRST | s - ? | 26 | #C703 | Checks whether the first bit of _Slice_ `s` is a one. |
| SDLEXCMP |  | C704 | compare_other | SDLEXCMP | s s' - x | 26 | #C704 | Compares the data of `s` lexicographically with the data of `s'`, returning `-1`, 0, or 1 depending on the result. |
| SDEQ |  | C705 | compare_other | SDEQ | s s' - ? | 26 | #C705 | Checks whether the data parts of `s` and `s'` coincide, equivalent to `SDLEXCMP` `ISZERO`. |
| SDPFX |  | C708 | compare_other | SDPFX | s s' - ? | 26 | #C708 | Checks whether `s` is a prefix of `s'`. |
| SDPFXREV |  | C709 | compare_other | SDPFXREV | s s' - ? | 26 | #C709 | Checks whether `s'` is a prefix of `s`, equivalent to `SWAP` `SDPFX`. |
| SDPPFX |  | C70A | compare_other | SDPPFX | s s' - ? | 26 | #C70A | Checks whether `s` is a proper prefix of `s'` (i.e., a prefix distinct from `s'`). |
| SDPPFXREV |  | C70B | compare_other | SDPPFXREV | s s' - ? | 26 | #C70B | Checks whether `s'` is a proper prefix of `s`. |
| SDSFX |  | C70C | compare_other | SDSFX | s s' - ? | 26 | #C70C | Checks whether `s` is a suffix of `s'`. |
| SDSFXREV |  | C70D | compare_other | SDSFXREV | s s' - ? | 26 | #C70D | Checks whether `s'` is a suffix of `s`. |
| SDPSFX |  | C70E | compare_other | SDPSFX | s s' - ? | 26 | #C70E | Checks whether `s` is a proper suffix of `s'`. |
| SDPSFXREV |  | C70F | compare_other | SDPSFXREV | s s' - ? | 26 | #C70F | Checks whether `s'` is a proper suffix of `s`. |
| SDCNTLEAD0 |  | C710 | compare_other | SDCNTLEAD0 | s - n | 26 | #C710 | Returns the number of leading zeroes in `s`. |
| SDCNTLEAD1 |  | C711 | compare_other | SDCNTLEAD1 | s - n | 26 | #C711 | Returns the number of leading ones in `s`. |
| SDCNTTRAIL0 |  | C712 | compare_other | SDCNTTRAIL0 | s - n | 26 | #C712 | Returns the number of trailing zeroes in `s`. |
| SDCNTTRAIL1 |  | C713 | compare_other | SDCNTTRAIL1 | s - n | 26 | #C713 | Returns the number of trailing ones in `s`. |
| NEWC |  | C8 | cell_build | NEWC | - b | 18 | #C8 | Creates a new empty _Builder_. |
| ENDC |  | C9 | cell_build | ENDC | b - c | 518 | #C9 | Converts a _Builder_ into an ordinary _Cell_. |
| STI |  | CAcc | cell_build | [cc+1] STI | x b - b' | 26 | #CA cc:uint8 | Stores a signed `cc+1`-bit integer `x` into _Builder_ `b` for `0 <= cc <= 255`, throws a range check exception if `x` does not fit into `cc+1` bits. |
| STU |  | CBcc | cell_build | [cc+1] STU | x b - b' | 26 | #CB cc:uint8 | Stores an unsigned `cc+1`-bit integer `x` into _Builder_ `b`. In all other respects it is similar to `STI`. |
| STREF |  | CC | cell_build | STREF | c b - b' | 18 | #CC | Stores a reference to _Cell_ `c` into _Builder_ `b`. |
| STBREFR |  | CD | cell_build | STBREFR
ENDCST | b b'' - b | 518 | #CD | Equivalent to `ENDC` `SWAP` `STREF`. |
| STSLICE |  | CE | cell_build | STSLICE | s b - b' | 18 | #CE | Stores _Slice_ `s` into _Builder_ `b`. |
| STIX |  | CF00 | cell_build | STIX | x b l - b' | 26 | #CF00 | Stores a signed `l`-bit integer `x` into `b` for `0 <= l <= 257`. |
| STUX |  | CF01 | cell_build | STUX | x b l - b' | 26 | #CF01 | Stores an unsigned `l`-bit integer `x` into `b` for `0 <= l <= 256`. |
| STIXR |  | CF02 | cell_build | STIXR | b x l - b' | 26 | #CF02 | Similar to `STIX`, but with arguments in a different order. |
| STUXR |  | CF03 | cell_build | STUXR | b x l - b' | 26 | #CF03 | Similar to `STUX`, but with arguments in a different order. |
| STIXQ |  | CF04 | cell_build | STIXQ | x b l - x b f or b' 0 | 26 | #CF04 | A quiet version of `STIX`. If there is no space in `b`, sets `b'=b` and `f=-1`.
If `x` does not fit into `l` bits, sets `b'=b` and `f=1`.
If the operation succeeds, `b'` is the new _Builder_ and `f=0`.
However, `0 <= l <= 257`, with a range check exception if this is not so. |
| STUXQ |  | CF05 | cell_build | STUXQ | x b l - x b f or b' 0 | 26 | #CF05 | A quiet version of `STUX`. |
| STIXRQ |  | CF06 | cell_build | STIXRQ | b x l - b x f or b' 0 | 26 | #CF06 | A quiet version of `STIXR`. |
| STUXRQ |  | CF07 | cell_build | STUXRQ | b x l - b x f or b' 0 | 26 | #CF07 | A quiet version of `STUXR`. |
| STI_ALT |  | CF08cc | cell_build | [cc+1] STI_l | x b - b' | 34 | #CF08 cc:uint8 | A longer version of `[cc+1] STI`. |
| STU_ALT |  | CF09cc | cell_build | [cc+1] STU_l | x b - b' | 34 | #CF09 cc:uint8 | A longer version of `[cc+1] STU`. |
| STIR |  | CF0Acc | cell_build | [cc+1] STIR | b x - b' | 34 | #CF0A cc:uint8 | Equivalent to `SWAP` `[cc+1] STI`. |
| STUR |  | CF0Bcc | cell_build | [cc+1] STUR | b x - b' | 34 | #CF0B cc:uint8 | Equivalent to `SWAP` `[cc+1] STU`. |
| STIQ |  | CF0Ccc | cell_build | [cc+1] STIQ | x b - x b f or b' 0 | 34 | #CF0C cc:uint8 | A quiet version of `STI`. |
| STUQ |  | CF0Dcc | cell_build | [cc+1] STUQ | x b - x b f or b' 0 | 34 | #CF0D cc:uint8 | A quiet version of `STU`. |
| STIRQ |  | CF0Ecc | cell_build | [cc+1] STIRQ | b x - b x f or b' 0 | 34 | #CF0E cc:uint8 | A quiet version of `STIR`. |
| STURQ |  | CF0Fcc | cell_build | [cc+1] STURQ | b x - b x f or b' 0 | 34 | #CF0F cc:uint8 | A quiet version of `STUR`. |
| STREF_ALT |  | CF10 | cell_build | STREF_l | c b - b' | 26 | #CF10 | A longer version of `STREF`. |
| STBREF |  | CF11 | cell_build | STBREF | b' b - b'' | 526 | #CF11 | Equivalent to `SWAP` `STBREFR`. |
| STSLICE_ALT |  | CF12 | cell_build | STSLICE_l | s b - b' | 26 | #CF12 | A longer version of `STSLICE`. |
| STB |  | CF13 | cell_build | STB | b' b - b'' | 26 | #CF13 | Appends all data from _Builder_ `b'` to _Builder_ `b`. |
| STREFR |  | CF14 | cell_build | STREFR | b c - b' | 26 | #CF14 | Equivalent to `SWAP` `STREF`. |
| STBREFR_ALT |  | CF15 | cell_build | STBREFR_l | b b' - b'' | 526 | #CF15 | A longer encoding of `STBREFR`. |
| STSLICER |  | CF16 | cell_build | STSLICER | b s - b' | 26 | #CF16 | Equivalent to `SWAP` `STSLICE`. |
| STBR |  | CF17 | cell_build | STBR
BCONCAT | b b' - b'' | 26 | #CF17 | Concatenates two _Builder_s
Equivalent to `SWAP` `STB`. |
| STREFQ |  | CF18 | cell_build | STREFQ | c b - c b -1 or b' 0 | 26 | #CF18 | Quiet version of `STREF`. |
| STBREFQ |  | CF19 | cell_build | STBREFQ | b' b - b' b -1 or b'' 0 | 526 | #CF19 | Quiet version of `STBREF`. |
| STSLICEQ |  | CF1A | cell_build | STSLICEQ | s b - s b -1 or b' 0 | 26 | #CF1A | Quiet version of `STSLICE`. |
| STBQ |  | CF1B | cell_build | STBQ | b' b - b' b -1 or b'' 0 | 26 | #CF1B | Quiet version of `STB`. |
| STREFRQ |  | CF1C | cell_build | STREFRQ | b c - b c -1 or b' 0 | 26 | #CF1C | Quiet version of `STREFR`. |
| STBREFRQ |  | CF1D | cell_build | STBREFRQ | b b' - b b' -1 or b'' 0 | 526 | #CF1D | Quiet version of `STBREFR`. |
| STSLICERQ |  | CF1E | cell_build | STSLICERQ | b s - b s -1 or b'' 0 | 26 | #CF1E | Quiet version of `STSLICER`. |
| STBRQ |  | CF1F | cell_build | STBRQ
BCONCATQ | b b' - b b' -1 or b'' 0 | 26 | #CF1F | Quiet version of `STBR`. |
| STREFCONST |  | CF20 | cell_build | [ref] STREFCONST | b - b’ | 26 | #CF20 c:^Cell | Equivalent to `PUSHREF` `STREFR`. |
| STREF2CONST |  | CF21 | cell_build | [ref] [ref] STREF2CONST | b - b’ | 26 | #CF21 c1:^Cell c2:^Cell | Equivalent to `STREFCONST` `STREFCONST`. |
| ENDXC |  | CF23 | cell_build |  | b x - c | 526 | #CF23 | If `x!=0`, creates a _special_ or _exotic_ cell from _Builder_ `b`.
The type of the exotic cell must be stored in the first 8 bits of `b`.
If `x=0`, it is equivalent to `ENDC`. Otherwise some validity checks on the data and references of `b` are performed before creating the exotic cell. |
| STILE4 |  | CF28 | cell_build | STILE4 | x b - b' | 26 | #CF28 | Stores a little-endian signed 32-bit integer. |
| STULE4 |  | CF29 | cell_build | STULE4 | x b - b' | 26 | #CF29 | Stores a little-endian unsigned 32-bit integer. |
| STILE8 |  | CF2A | cell_build | STILE8 | x b - b' | 26 | #CF2A | Stores a little-endian signed 64-bit integer. |
| STULE8 |  | CF2B | cell_build | STULE8 | x b - b' | 26 | #CF2B | Stores a little-endian unsigned 64-bit integer. |
| BDEPTH |  | CF30 | cell_build | BDEPTH | b - x | 26 | #CF30 | Returns the depth of _Builder_ `b`. If no cell references are stored in `b`, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `b`. |
| BBITS |  | CF31 | cell_build | BBITS | b - x | 26 | #CF31 | Returns the number of data bits already stored in _Builder_ `b`. |
| BREFS |  | CF32 | cell_build | BREFS | b - y | 26 | #CF32 | Returns the number of cell references already stored in `b`. |
| BBITREFS |  | CF33 | cell_build | BBITREFS | b - x y | 26 | #CF33 | Returns the numbers of both data bits and cell references in `b`. |
| BREMBITS |  | CF35 | cell_build | BREMBITS | b - x' | 26 | #CF35 | Returns the number of data bits that can still be stored in `b`. |
| BREMREFS |  | CF36 | cell_build | BREMREFS | b - y' | 26 | #CF36 | Returns the number of references that can still be stored in `b`. |
| BREMBITREFS |  | CF37 | cell_build | BREMBITREFS | b - x' y' | 26 | #CF37 | Returns the numbers of both data bits and references that can still be stored in `b`. |
| BCHKBITS |  | CF38cc | cell_build | [cc+1] BCHKBITS# | b - | 34/84 | #CF38 cc:uint8 | Checks whether `cc+1` bits can be stored into `b`, where `0 <= cc <= 255`. |
| BCHKBITS_VAR |  | CF39 | cell_build | BCHKBITS | b x - | 26/76 | #CF39 | Checks whether `x` bits can be stored into `b`, `0 <= x <= 1023`. If there is no space for `x` more bits in `b`, or if `x` is not within the range `0...1023`, throws an exception. |
| BCHKREFS |  | CF3A | cell_build | BCHKREFS | b y - | 26/76 | #CF3A | Checks whether `y` references can be stored into `b`, `0 <= y <= 7`. |
| BCHKBITREFS |  | CF3B | cell_build | BCHKBITREFS | b x y - | 26/76 | #CF3B | Checks whether `x` bits and `y` references can be stored into `b`, `0 <= x <= 1023`, `0 <= y <= 7`. |
| BCHKBITSQ |  | CF3Ccc | cell_build | [cc+1] BCHKBITSQ# | b - ? | 34 | #CF3C cc:uint8 | Checks whether `cc+1` bits can be stored into `b`, where `0 <= cc <= 255`. |
| BCHKBITSQ_VAR |  | CF3D | cell_build | BCHKBITSQ | b x - ? | 26 | #CF3D | Checks whether `x` bits can be stored into `b`, `0 <= x <= 1023`. |
| BCHKREFSQ |  | CF3E | cell_build | BCHKREFSQ | b y - ? | 26 | #CF3E | Checks whether `y` references can be stored into `b`, `0 <= y <= 7`. |
| BCHKBITREFSQ |  | CF3F | cell_build | BCHKBITREFSQ | b x y - ? | 26 | #CF3F | Checks whether `x` bits and `y` references can be stored into `b`, `0 <= x <= 1023`, `0 <= y <= 7`. |
| STZEROES |  | CF40 | cell_build | STZEROES | b n - b' | 26 | #CF40 | Stores `n` binary zeroes into _Builder_ `b`. |
| STONES |  | CF41 | cell_build | STONES | b n - b' | 26 | #CF41 | Stores `n` binary ones into _Builder_ `b`. |
| STSAME |  | CF42 | cell_build | STSAME | b n x - b' | 26 | #CF42 | Stores `n` binary `x`es (`0 <= x <= 1`) into _Builder_ `b`. |
| STSLICECONST |  | CFC0_xysss | cell_build | [slice] STSLICECONST | b - b' | 24 | #CFC0_ x:(## 2) y:(## 3) c:(x * ^Cell) sss:((8 * y + 2) * Bit) | Stores a constant subslice `sss`.
_Details:_ `sss` consists of `0 <= x <= 3` references and up to `8y+2` data bits, with `0 <= y <= 7`. Completion bit is assumed.
Note that the assembler can replace `STSLICECONST` with `PUSHSLICE` `STSLICER` if the slice is too big. |
| STZERO | STSLICECONST | CF81 | cell_build | STZERO | b - b' | 24 | #CF81 | Stores one binary zero. |
| STONE | STSLICECONST | CF83 | cell_build | STONE | b - b' | 24 | #CF83 | Stores one binary one. |
| CTOS |  | D0 | cell_parse | CTOS | c - s | 118/43 | #D0 | Converts a _Cell_ into a _Slice_. Notice that `c` must be either an ordinary cell, or an exotic cell which is automatically _loaded_ to yield an ordinary cell `c'`, converted into a _Slice_ afterwards. |
| ENDS |  | D1 | cell_parse | ENDS | s - | 18/68 | #D1 | Removes a _Slice_ `s` from the stack, and throws an exception if it is not empty. |
| LDI |  | D2cc | cell_parse | [cc+1] LDI | s - x s' | 26 | #D2 cc:uint8 | Loads (i.e., parses) a signed `cc+1`-bit integer `x` from _Slice_ `s`, and returns the remainder of `s` as `s'`. |
| LDU |  | D3cc | cell_parse | [cc+1] LDU | s - x s' | 26 | #D3 cc:uint8 | Loads an unsigned `cc+1`-bit integer `x` from _Slice_ `s`. |
| LDREF |  | D4 | cell_parse | LDREF | s - c s' | 18 | #D4 | Loads a cell reference `c` from `s`. |
| LDREFRTOS |  | D5 | cell_parse | LDREFRTOS | s - s' s'' | 118/43 | #D5 | Equivalent to `LDREF` `SWAP` `CTOS`. |
| LDSLICE |  | D6cc | cell_parse | [cc+1] LDSLICE | s - s'' s' | 26 | #D6 cc:uint8 | Cuts the next `cc+1` bits of `s` into a separate _Slice_ `s''`. |
| LDIX |  | D700 | cell_parse | LDIX | s l - x s' | 26 | #D700 | Loads a signed `l`-bit (`0 <= l <= 257`) integer `x` from _Slice_ `s`, and returns the remainder of `s` as `s'`. |
| LDUX |  | D701 | cell_parse | LDUX | s l - x s' | 26 | #D701 | Loads an unsigned `l`-bit integer `x` from (the first `l` bits of) `s`, with `0 <= l <= 256`. |
| PLDIX |  | D702 | cell_parse | PLDIX | s l - x | 26 | #D702 | Preloads a signed `l`-bit integer from _Slice_ `s`, for `0 <= l <= 257`. |
| PLDUX |  | D703 | cell_parse | PLDUX | s l - x | 26 | #D703 | Preloads an unsigned `l`-bit integer from `s`, for `0 <= l <= 256`. |
| LDIXQ |  | D704 | cell_parse | LDIXQ | s l - x s' -1 or s 0 | 26 | #D704 | Quiet version of `LDIX`: loads a signed `l`-bit integer from `s` similarly to `LDIX`, but returns a success flag, equal to `-1` on success or to `0` on failure (if `s` does not have `l` bits), instead of throwing a cell underflow exception. |
| LDUXQ |  | D705 | cell_parse | LDUXQ | s l - x s' -1 or s 0 | 26 | #D705 | Quiet version of `LDUX`. |
| PLDIXQ |  | D706 | cell_parse | PLDIXQ | s l - x -1 or 0 | 26 | #D706 | Quiet version of `PLDIX`. |
| PLDUXQ |  | D707 | cell_parse | PLDUXQ | s l - x -1 or 0 | 26 | #D707 | Quiet version of `PLDUX`. |
| LDI_ALT |  | D708cc | cell_parse | [cc+1] LDI_l | s - x s' | 34 | #D708 cc:uint8 | A longer encoding for `LDI`. |
| LDU_ALT |  | D709cc | cell_parse | [cc+1] LDU_l | s - x s' | 34 | #D709 cc:uint8 | A longer encoding for `LDU`. |
| PLDI |  | D70Acc | cell_parse | [cc+1] PLDI | s - x | 34 | #D70A cc:uint8 | Preloads a signed `cc+1`-bit integer from _Slice_ `s`. |
| PLDU |  | D70Bcc | cell_parse | [cc+1] PLDU | s - x | 34 | #D70B cc:uint8 | Preloads an unsigned `cc+1`-bit integer from `s`. |
| LDIQ |  | D70Ccc | cell_parse | [cc+1] LDIQ | s - x s' -1 or s 0 | 34 | #D70C cc:uint8 | A quiet version of `LDI`. |
| LDUQ |  | D70Dcc | cell_parse | [cc+1] LDUQ | s - x s' -1 or s 0 | 34 | #D70D cc:uint8 | A quiet version of `LDU`. |
| PLDIQ |  | D70Ecc | cell_parse | [cc+1] PLDIQ | s - x -1 or 0 | 34 | #D70E cc:uint8 | A quiet version of `PLDI`. |
| PLDUQ |  | D70Fcc | cell_parse | [cc+1] PLDUQ | s - x -1 or 0 | 34 | #D70F cc:uint8 | A quiet version of `PLDU`. |
| PLDUZ |  | D714_c | cell_parse | [32(c+1)] PLDUZ | s - s x | 26 | #D714_ c:uint3 | Preloads the first `32(c+1)` bits of _Slice_ `s` into an unsigned integer `x`, for `0 <= c <= 7`. If `s` is shorter than necessary, missing bits are assumed to be zero. This operation is intended to be used along with `IFBITJMP` and similar instructions. |
| LDSLICEX |  | D718 | cell_parse | LDSLICEX | s l - s'' s' | 26 | #D718 | Loads the first `0 <= l <= 1023` bits from _Slice_ `s` into a separate _Slice_ `s''`, returning the remainder of `s` as `s'`. |
| PLDSLICEX |  | D719 | cell_parse | PLDSLICEX | s l - s'' | 26 | #D719 | Returns the first `0 <= l <= 1023` bits of `s` as `s''`. |
| LDSLICEXQ |  | D71A | cell_parse | LDSLICEXQ | s l - s'' s' -1 or s 0 | 26 | #D71A | A quiet version of `LDSLICEX`. |
| PLDSLICEXQ |  | D71B | cell_parse | PLDSLICEXQ | s l - s' -1 or 0 | 26 | #D71B | A quiet version of `LDSLICEXQ`. |
| LDSLICE_ALT |  | D71Ccc | cell_parse | [cc+1] LDSLICE_l | s - s'' s' | 34 | #D71C cc:uint8 | A longer encoding for `LDSLICE`. |
| PLDSLICE |  | D71Dcc | cell_parse | [cc+1] PLDSLICE | s - s'' | 34 | #D71D cc:uint8 | Returns the first `0 < cc+1 <= 256` bits of `s` as `s''`. |
| LDSLICEQ |  | D71Ecc | cell_parse | [cc+1] LDSLICEQ | s - s'' s' -1 or s 0 | 34 | #D71E cc:uint8 | A quiet version of `LDSLICE`. |
| PLDSLICEQ |  | D71Fcc | cell_parse | [cc+1] PLDSLICEQ | s - s'' -1 or 0 | 34 | #D71F cc:uint8 | A quiet version of `PLDSLICE`. |
| SDCUTFIRST |  | D720 | cell_parse | SDCUTFIRST | s l - s' | 26 | #D720 | Returns the first `0 <= l <= 1023` bits of `s`. It is equivalent to `PLDSLICEX`. |
| SDSKIPFIRST |  | D721 | cell_parse | SDSKIPFIRST | s l - s' | 26 | #D721 | Returns all but the first `0 <= l <= 1023` bits of `s`. It is equivalent to `LDSLICEX` `NIP`. |
| SDCUTLAST |  | D722 | cell_parse | SDCUTLAST | s l - s' | 26 | #D722 | Returns the last `0 <= l <= 1023` bits of `s`. |
| SDSKIPLAST |  | D723 | cell_parse | SDSKIPLAST | s l - s' | 26 | #D723 | Returns all but the last `0 <= l <= 1023` bits of `s`. |
| SDSUBSTR |  | D724 | cell_parse | SDSUBSTR | s l l' - s' | 26 | #D724 | Returns `0 <= l' <= 1023` bits of `s` starting from offset `0 <= l <= 1023`, thus extracting a bit substring out of the data of `s`. |
| SDBEGINSX |  | D726 | cell_parse | SDBEGINSX | s s' - s'' | 26 | #D726 | Checks whether `s` begins with (the data bits of) `s'`, and removes `s'` from `s` on success. On failure throws a cell deserialization exception. Primitive `SDPFXREV` can be considered a quiet version of `SDBEGINSX`. |
| SDBEGINSXQ |  | D727 | cell_parse | SDBEGINSXQ | s s' - s'' -1 or s 0 | 26 | #D727 | A quiet version of `SDBEGINSX`. |
| SDBEGINS |  | D72A_xsss | cell_parse | [slice] SDBEGINS | s - s'' | 31 | #D72A_ x:(## 7) sss:((8 * x + 3) * Bit) | Checks whether `s` begins with constant bitstring `sss` of length `8x+3` (with continuation bit assumed), where `0 <= x <= 127`, and removes `sss` from `s` on success. |
| SDBEGINSQ |  | D72E_xsss | cell_parse | [slice] SDBEGINSQ | s - s'' -1 or s 0 | 31 | #D72E_ x:(## 7) sss:((8 * x + 3) * Bit) | A quiet version of `SDBEGINS`. |
| SCUTFIRST |  | D730 | cell_parse | SCUTFIRST | s l r - s' | 26 | #D730 | Returns the first `0 <= l <= 1023` bits and first `0 <= r <= 4` references of `s`. |
| SSKIPFIRST |  | D731 | cell_parse | SSKIPFIRST | s l r - s' | 26 | #D731 | Returns all but the first `l` bits of `s` and `r` references of `s`. |
| SCUTLAST |  | D732 | cell_parse | SCUTLAST | s l r - s' | 26 | #D732 | Returns the last `0 <= l <= 1023` data bits and last `0 <= r <= 4` references of `s`. |
| SSKIPLAST |  | D733 | cell_parse | SSKIPLAST | s l r - s' | 26 | #D733 | Returns all but the last `l` bits of `s` and `r` references of `s`. |
| SUBSLICE |  | D734 | cell_parse | SUBSLICE | s l r l' r' - s' | 26 | #D734 | Returns `0 <= l' <= 1023` bits and `0 <= r' <= 4` references from _Slice_ `s`, after skipping the first `0 <= l <= 1023` bits and first `0 <= r <= 4` references. |
| SPLIT |  | D736 | cell_parse | SPLIT | s l r - s' s'' | 26 | #D736 | Splits the first `0 <= l <= 1023` data bits and first `0 <= r <= 4` references from `s` into `s'`, returning the remainder of `s` as `s''`. |
| SPLITQ |  | D737 | cell_parse | SPLITQ | s l r - s' s'' -1 or s 0 | 26 | #D737 | A quiet version of `SPLIT`. |
| XCTOS |  | D739 | cell_parse |  | c - s ? |  | #D739 | Transforms an ordinary or exotic cell into a _Slice_, as if it were an ordinary cell. A flag is returned indicating whether `c` is exotic. If that be the case, its type can later be deserialized from the first eight bits of `s`. |
| XLOAD |  | D73A | cell_parse |  | c - c' |  | #D73A | Loads an exotic cell `c` and returns an ordinary cell `c'`. If `c` is already ordinary, does nothing. If `c` cannot be loaded, throws an exception. |
| XLOADQ |  | D73B | cell_parse |  | c - c' -1 or c 0 |  | #D73B | Loads an exotic cell `c` and returns an ordinary cell `c'`. If `c` is already ordinary, does nothing. If `c` cannot be loaded, returns 0. |
| SCHKBITS |  | D741 | cell_parse | SCHKBITS | s l - | 26/76 | #D741 | Checks whether there are at least `l` data bits in _Slice_ `s`. If this is not the case, throws a cell deserialisation (i.e., cell underflow) exception. |
| SCHKREFS |  | D742 | cell_parse | SCHKREFS | s r - | 26/76 | #D742 | Checks whether there are at least `r` references in _Slice_ `s`. |
| SCHKBITREFS |  | D743 | cell_parse | SCHKBITREFS | s l r - | 26/76 | #D743 | Checks whether there are at least `l` data bits and `r` references in _Slice_ `s`. |
| SCHKBITSQ |  | D745 | cell_parse | SCHKBITSQ | s l - ? | 26 | #D745 | Checks whether there are at least `l` data bits in _Slice_ `s`. |
| SCHKREFSQ |  | D746 | cell_parse | SCHKREFSQ | s r - ? | 26 | #D746 | Checks whether there are at least `r` references in _Slice_ `s`. |
| SCHKBITREFSQ |  | D747 | cell_parse | SCHKBITREFSQ | s l r - ? | 26 | #D747 | Checks whether there are at least `l` data bits and `r` references in _Slice_ `s`. |
| PLDREFVAR |  | D748 | cell_parse | PLDREFVAR | s n - c | 26 | #D748 | Returns the `n`-th cell reference of _Slice_ `s` for `0 <= n <= 3`. |
| SBITS |  | D749 | cell_parse | SBITS | s - l | 26 | #D749 | Returns the number of data bits in _Slice_ `s`. |
| SREFS |  | D74A | cell_parse | SREFS | s - r | 26 | #D74A | Returns the number of references in _Slice_ `s`. |
| SBITREFS |  | D74B | cell_parse | SBITREFS | s - l r | 26 | #D74B | Returns both the number of data bits and the number of references in `s`. |
| PLDREFIDX |  | D74E_n | cell_parse | [n] PLDREFIDX | s - c | 26 | #D74E_ n:uint2 | Returns the `n`-th cell reference of _Slice_ `s`, where `0 <= n <= 3`. |
| PLDREF | PLDREFIDX | D74C | cell_parse | PLDREF | s - c | 26 | #D74C | Preloads the first cell reference of a _Slice_. |
| LDILE4 |  | D750 | cell_parse | LDILE4 | s - x s' | 26 | #D750 | Loads a little-endian signed 32-bit integer. |
| LDULE4 |  | D751 | cell_parse | LDULE4 | s - x s' | 26 | #D751 | Loads a little-endian unsigned 32-bit integer. |
| LDILE8 |  | D752 | cell_parse | LDILE8 | s - x s' | 26 | #D752 | Loads a little-endian signed 64-bit integer. |
| LDULE8 |  | D753 | cell_parse | LDULE8 | s - x s' | 26 | #D753 | Loads a little-endian unsigned 64-bit integer. |
| PLDILE4 |  | D754 | cell_parse | PLDILE4 | s - x | 26 | #D754 | Preloads a little-endian signed 32-bit integer. |
| PLDULE4 |  | D755 | cell_parse | PLDULE4 | s - x | 26 | #D755 | Preloads a little-endian unsigned 32-bit integer. |
| PLDILE8 |  | D756 | cell_parse | PLDILE8 | s - x | 26 | #D756 | Preloads a little-endian signed 64-bit integer. |
| PLDULE8 |  | D757 | cell_parse | PLDULE8 | s - x | 26 | #D757 | Preloads a little-endian unsigned 64-bit integer. |
| LDILE4Q |  | D758 | cell_parse | LDILE4Q | s - x s' -1 or s 0 | 26 | #D758 | Quietly loads a little-endian signed 32-bit integer. |
| LDULE4Q |  | D759 | cell_parse | LDULE4Q | s - x s' -1 or s 0 | 26 | #D759 | Quietly loads a little-endian unsigned 32-bit integer. |
| LDILE8Q |  | D75A | cell_parse | LDILE8Q | s - x s' -1 or s 0 | 26 | #D75A | Quietly loads a little-endian signed 64-bit integer. |
| LDULE8Q |  | D75B | cell_parse | LDULE8Q | s - x s' -1 or s 0 | 26 | #D75B | Quietly loads a little-endian unsigned 64-bit integer. |
| PLDILE4Q |  | D75C | cell_parse | PLDILE4Q | s - x -1 or 0 | 26 | #D75C | Quietly preloads a little-endian signed 32-bit integer. |
| PLDULE4Q |  | D75D | cell_parse | PLDULE4Q | s - x -1 or 0 | 26 | #D75D | Quietly preloads a little-endian unsigned 32-bit integer. |
| PLDILE8Q |  | D75E | cell_parse | PLDILE8Q | s - x -1 or 0 | 26 | #D75E | Quietly preloads a little-endian signed 64-bit integer. |
| PLDULE8Q |  | D75F | cell_parse | PLDULE8Q | s - x -1 or 0 | 26 | #D75F | Quietly preloads a little-endian unsigned 64-bit integer. |
| LDZEROES |  | D760 | cell_parse | LDZEROES | s - n s' | 26 | #D760 | Returns the count `n` of leading zero bits in `s`, and removes these bits from `s`. |
| LDONES |  | D761 | cell_parse | LDONES | s - n s' | 26 | #D761 | Returns the count `n` of leading one bits in `s`, and removes these bits from `s`. |
| LDSAME |  | D762 | cell_parse | LDSAME | s x - n s' | 26 | #D762 | Returns the count `n` of leading bits equal to `0 <= x <= 1` in `s`, and removes these bits from `s`. |
| SDEPTH |  | D764 | cell_parse | SDEPTH | s - x | 26 | #D764 | Returns the depth of _Slice_ `s`. If `s` has no references, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `s`. |
| CDEPTH |  | D765 | cell_parse | CDEPTH | c - x | 26 | #D765 | Returns the depth of _Cell_ `c`. If `c` has no references, then `x=0`; otherwise `x` is one plus the maximum of depths of cells referred to from `c`. If `c` is a _Null_ instead of a _Cell_, returns zero. |
| EXECUTE |  | D8 | cont_basic | EXECUTE
CALLX | c - | 18 | #D8 | _Calls_, or _executes_, continuation `c`. |
| JMPX |  | D9 | cont_basic | JMPX | c - | 18 | #D9 | _Jumps_, or transfers control, to continuation `c`.
The remainder of the previous current continuation `cc` is discarded. |
| CALLXARGS |  | DApr | cont_basic | [p] [r] CALLXARGS | c - | 26 | #DA p:uint4 r:uint4 | _Calls_ continuation `c` with `p` parameters and expecting `r` return values
`0 <= p <= 15`, `0 <= r <= 15` |
| CALLXARGS_VAR |  | DB0p | cont_basic | [p] -1 CALLXARGS | c - | 26 | #DB0 p:uint4 | _Calls_ continuation `c` with `0 <= p <= 15` parameters, expecting an arbitrary number of return values. |
| JMPXARGS |  | DB1p | cont_basic | [p] JMPXARGS | c - | 26 | #DB1 p:uint4 | _Jumps_ to continuation `c`, passing only the top `0 <= p <= 15` values from the current stack to it (the remainder of the current stack is discarded). |
| RETARGS |  | DB2r | cont_basic | [r] RETARGS |  | 26 | #DB2 r:uint4 | _Returns_ to `c0`, with `0 <= r <= 15` return values taken from the current stack. |
| RET |  | DB30 | cont_basic | RET
RETTRUE |  | 26 | #DB30 | _Returns_ to the continuation at `c0`. The remainder of the current continuation `cc` is discarded.
Approximately equivalent to `c0 PUSHCTR` `JMPX`. |
| RETALT |  | DB31 | cont_basic | RETALT
RETFALSE |  | 26 | #DB31 | _Returns_ to the continuation at `c1`.
Approximately equivalent to `c1 PUSHCTR` `JMPX`. |
| BRANCH |  | DB32 | cont_basic | BRANCH
RETBOOL | f - | 26 | #DB32 | Performs `RETTRUE` if integer `f!=0`, or `RETFALSE` if `f=0`. |
| CALLCC |  | DB34 | cont_basic | CALLCC | c - | 26 | #DB34 | _Call with current continuation_, transfers control to `c`, pushing the old value of `cc` into `c`'s stack (instead of discarding it or writing it into new `c0`). |
| JMPXDATA |  | DB35 | cont_basic | JMPXDATA | c - | 26 | #DB35 | Similar to `CALLCC`, but the remainder of the current continuation (the old value of `cc`) is converted into a _Slice_ before pushing it into the stack of `c`. |
| CALLCCARGS |  | DB36pr | cont_basic | [p] [r] CALLCCARGS | c - | 34 | #DB36 p:uint4 r:uint4 | Similar to `CALLXARGS`, but pushes the old value of `cc` (along with the top `0 <= p <= 15` values from the original stack) into the stack of newly-invoked continuation `c`, setting `cc.nargs` to `-1 <= r <= 14`. |
| CALLXVARARGS |  | DB38 | cont_basic | CALLXVARARGS | c p r - | 26 | #DB38 | Similar to `CALLXARGS`, but takes `-1 <= p,r <= 254` from the stack. The next three operations also take `p` and `r` from the stack, both in the range `-1...254`. |
| RETVARARGS |  | DB39 | cont_basic | RETVARARGS | p r - | 26 | #DB39 | Similar to `RETARGS`. |
| JMPXVARARGS |  | DB3A | cont_basic | JMPXVARARGS | c p r - | 26 | #DB3A | Similar to `JMPXARGS`. |
| CALLCCVARARGS |  | DB3B | cont_basic | CALLCCVARARGS | c p r - | 26 | #DB3B | Similar to `CALLCCARGS`. |
| CALLREF |  | DB3C | cont_basic | [ref] CALLREF |  | 126/51 | #DB3C c:^Cell | Equivalent to `PUSHREFCONT` `CALLX`. |
| JMPREF |  | DB3D | cont_basic | [ref] JMPREF |  | 126/51 | #DB3D c:^Cell | Equivalent to `PUSHREFCONT` `JMPX`. |
| JMPREFDATA |  | DB3E | cont_basic | [ref] JMPREFDATA |  | 126/51 | #DB3E c:^Cell | Equivalent to `PUSHREFCONT` `JMPXDATA`. |
| RETDATA |  | DB3F | cont_basic | RETDATA |  | 26 | #DB3F | Equivalent to `c0 PUSHCTR` `JMPXDATA`. In this way, the remainder of the current continuation is converted into a _Slice_ and returned to the caller. |
| IFRET |  | DC | cont_conditional | IFRET
IFNOT: | f - | 18 | #DC | Performs a `RET`, but only if integer `f` is non-zero. If `f` is a `NaN`, throws an integer overflow exception. |
| IFNOTRET |  | DD | cont_conditional | IFNOTRET
IF: | f - | 18 | #DD | Performs a `RET`, but only if integer `f` is zero. |
| IF |  | DE | cont_conditional | IF | f c - | 18 | #DE | Performs `EXECUTE` for `c` (i.e., _executes_ `c`), but only if integer `f` is non-zero. Otherwise simply discards both values. |
|  |  | DE | cont_conditional | IF:<{ code }>
<{ code }>IF | f - |  |  | Equivalent to `<{ code }> CONT` `IF`. |
| IFNOT |  | DF | cont_conditional | IFNOT | f c - | 18 | #DF | Executes continuation `c`, but only if integer `f` is zero. Otherwise simply discards both values. |
|  |  | DF | cont_conditional | IFNOT:<{ code }>
<{ code }>IFNOT | f - |  |  | Equivalent to `<{ code }> CONT` `IFNOT`. |
| IFJMP |  | E0 | cont_conditional | IFJMP | f c - | 18 | #E0 | Jumps to `c` (similarly to `JMPX`), but only if `f` is non-zero. |
|  |  | E0 | cont_conditional | IFJMP:<{ code }> | f - |  |  | Equivalent to `<{ code }> CONT` `IFJMP`. |
| IFNOTJMP |  | E1 | cont_conditional | IFNOTJMP | f c - | 18 | #E1 | Jumps to `c` (similarly to `JMPX`), but only if `f` is zero. |
|  |  | E1 | cont_conditional | IFNOTJMP:<{ code }> | f - |  |  | Equivalent to `<{ code }> CONT` `IFNOTJMP`. |
| IFELSE |  | E2 | cont_conditional | IFELSE | f c c' - | 18 | #E2 | If integer `f` is non-zero, executes `c`, otherwise executes `c'`. Equivalent to `CONDSELCHK` `EXECUTE`. |
|  |  | E2 | cont_conditional | IF:<{ code1 }>ELSE<{ code2 }> | f - |  |  | Equivalent to `<{ code1 }> CONT` `<{ code2 }> CONT` `IFELSE`. |
| IFREF |  | E300 | cont_conditional | [ref] IFREF | f - | 26/126/51 | #E300 c:^Cell | Equivalent to `PUSHREFCONT` `IF`, with the optimization that the cell reference is not actually loaded into a _Slice_ and then converted into an ordinary _Continuation_ if `f=0`.
Gas consumption of this primitive depends on whether `f=0` and whether the reference was loaded before.
Similar remarks apply other primitives that accept a continuation as a reference. |
| IFNOTREF |  | E301 | cont_conditional | [ref] IFNOTREF | f - | 26/126/51 | #E301 c:^Cell | Equivalent to `PUSHREFCONT` `IFNOT`. |
| IFJMPREF |  | E302 | cont_conditional | [ref] IFJMPREF | f - | 26/126/51 | #E302 c:^Cell | Equivalent to `PUSHREFCONT` `IFJMP`. |
| IFNOTJMPREF |  | E303 | cont_conditional | [ref] IFNOTJMPREF | f - | 26/126/51 | #E303 c:^Cell | Equivalent to `PUSHREFCONT` `IFNOTJMP`. |
| CONDSEL |  | E304 | cont_conditional | CONDSEL | f x y - x or y | 26 | #E304 | If integer `f` is non-zero, returns `x`, otherwise returns `y`. Notice that no type checks are performed on `x` and `y`; as such, it is more like a conditional stack operation. Roughly equivalent to `ROT` `ISZERO` `INC` `ROLLX` `NIP`. |
| CONDSELCHK |  | E305 | cont_conditional | CONDSELCHK | f x y - x or y | 26 | #E305 | Same as `CONDSEL`, but first checks whether `x` and `y` have the same type. |
| IFRETALT |  | E308 | cont_conditional | IFRETALT | f - | 26 | #E308 | Performs `RETALT` if integer `f!=0`. |
| IFNOTRETALT |  | E309 | cont_conditional | IFNOTRETALT | f - | 26 | #E309 | Performs `RETALT` if integer `f=0`. |
| IFREFELSE |  | E30D | cont_conditional | [ref] IFREFELSE | f c - | 26/126/51 | #E30D c:^Cell | Equivalent to `PUSHREFCONT` `SWAP` `IFELSE`, with the optimization that the cell reference is not actually loaded into a _Slice_ and then converted into an ordinary _Continuation_ if `f=0`. Similar remarks apply to the next two primitives: _Cell_s are converted into _Continuation_s only when necessary. |
| IFELSEREF |  | E30E | cont_conditional | [ref] IFELSEREF | f c - | 26/126/51 | #E30E c:^Cell | Equivalent to `PUSHREFCONT` `IFELSE`. |
| IFREFELSEREF |  | E30F | cont_conditional | [ref] [ref] IFREFELSEREF | f - | 126/51 | #E30F c1:^Cell c2:^Cell | Equivalent to `PUSHREFCONT` `PUSHREFCONT` `IFELSE`. |
| IFBITJMP |  | E39_n | cont_conditional | [n] IFBITJMP | x c - x | 26 | #E39_ n:uint5 | Checks whether bit `0 <= n <= 31` is set in integer `x`, and if so, performs `JMPX` to continuation `c`. Value `x` is left in the stack. |
| IFNBITJMP |  | E3B_n | cont_conditional | [n] IFNBITJMP | x c - x | 26 | #E3B_ n:uint5 | Jumps to `c` if bit `0 <= n <= 31` is not set in integer `x`. |
| IFBITJMPREF |  | E3D_n | cont_conditional | [ref] [n] IFBITJMPREF | x - x | 126/51 | #E3D_ n:uint5 c:^Cell | Performs a `JMPREF` if bit `0 <= n <= 31` is set in integer `x`. |
| IFNBITJMPREF |  | E3F_n | cont_conditional | [ref] [n] IFNBITJMPREF | x - x | 126/51 | #E3F_ n:uint5 c:^Cell | Performs a `JMPREF` if bit `0 <= n <= 31` is not set in integer `x`. |
| REPEAT |  | E4 | cont_loops | REPEAT | n c - | 18 | #E4 | Executes continuation `c` `n` times, if integer `n` is non-negative. If `n>=2^31` or `n<-2^31`, generates a range check exception.
Notice that a `RET` inside the code of `c` works as a `continue`, not as a `break`. One should use either alternative (experimental) loops or alternative `RETALT` (along with a `SETEXITALT` before the loop) to `break` out of a loop. |
|  |  | E4 | cont_loops | REPEAT:<{ code }>
<{ code }>REPEAT | n - |  |  | Equivalent to `<{ code }> CONT` `REPEAT`. |
| REPEATEND |  | E5 | cont_loops | REPEATEND
REPEAT: | n - | 18 | #E5 | Similar to `REPEAT`, but it is applied to the current continuation `cc`. |
| UNTIL |  | E6 | cont_loops | UNTIL | c - | 18 | #E6 | Executes continuation `c`, then pops an integer `x` from the resulting stack. If `x` is zero, performs another iteration of this loop. The actual implementation of this primitive involves an extraordinary continuation `ec_until` with its arguments set to the body of the loop (continuation `c`) and the original current continuation `cc`. This extraordinary continuation is then saved into the savelist of `c` as `c.c0` and the modified `c` is then executed. The other loop primitives are implemented similarly with the aid of suitable extraordinary continuations. |
|  |  | E6 | cont_loops | UNTIL:<{ code }>
<{ code }>UNTIL | - |  |  | Equivalent to `<{ code }> CONT` `UNTIL`. |
| UNTILEND |  | E7 | cont_loops | UNTILEND
UNTIL: | - | 18 | #E7 | Similar to `UNTIL`, but executes the current continuation `cc` in a loop. When the loop exit condition is satisfied, performs a `RET`. |
| WHILE |  | E8 | cont_loops | WHILE | c' c - | 18 | #E8 | Executes `c'` and pops an integer `x` from the resulting stack. If `x` is zero, exists the loop and transfers control to the original `cc`. If `x` is non-zero, executes `c`, and then begins a new iteration. |
|  |  | E8 | cont_loops | WHILE:<{ cond }>DO<{ code }> | - |  |  | Equivalent to `<{ cond }> CONT` `<{ code }> CONT` `WHILE`. |
| WHILEEND |  | E9 | cont_loops | WHILEEND | c' - | 18 | #E9 | Similar to `WHILE`, but uses the current continuation `cc` as the loop body. |
| AGAIN |  | EA | cont_loops | AGAIN | c - | 18 | #EA | Similar to `REPEAT`, but executes `c` infinitely many times. A `RET` only begins a new iteration of the infinite loop, which can be exited only by an exception, or a `RETALT` (or an explicit `JMPX`). |
|  |  | EA | cont_loops | AGAIN:<{ code }>
<{ code }>AGAIN | - |  |  | Equivalent to `<{ code }> CONT` `AGAIN`. |
| AGAINEND |  | EB | cont_loops | AGAINEND
AGAIN: | - | 18 | #EB | Similar to `AGAIN`, but performed with respect to the current continuation `cc`. |
| REPEATBRK |  | E314 | cont_loops | REPEATBRK | n c - | 26 | #E314 | Similar to `REPEAT`, but also sets `c1` to the original `cc` after saving the old value of `c1` into the savelist of the original `cc`. In this way `RETALT` could be used to break out of the loop body. |
|  |  | E314 | cont_loops | REPEATBRK:<{ code }>
<{ code }>REPEATBRK | n - |  |  | Equivalent to `<{ code }> CONT` `REPEATBRK`. |
| REPEATENDBRK |  | E315 | cont_loops | REPEATENDBRK | n - | 26 | #E315 | Similar to `REPEATEND`, but also sets `c1` to the original `c0` after saving the old value of `c1` into the savelist of the original `c0`. Equivalent to `SAMEALTSAVE` `REPEATEND`. |
| UNTILBRK |  | E316 | cont_loops | UNTILBRK | c - | 26 | #E316 | Similar to `UNTIL`, but also modifies `c1` in the same way as `REPEATBRK`. |
|  |  | E316 | cont_loops | UNTILBRK:<{ code }> | - |  |  | Equivalent to `<{ code }> CONT` `UNTILBRK`. |
| UNTILENDBRK |  | E317 | cont_loops | UNTILENDBRK
UNTILBRK: | - | 26 | #E317 | Equivalent to `SAMEALTSAVE` `UNTILEND`. |
| WHILEBRK |  | E318 | cont_loops | WHILEBRK | c' c - | 26 | #E318 | Similar to `WHILE`, but also modifies `c1` in the same way as `REPEATBRK`. |
|  |  | E318 | cont_loops | WHILEBRK:<{ cond }>DO<{ code }> | - |  |  | Equivalent to `<{ cond }> CONT` `<{ code }> CONT` `WHILEBRK`. |
| WHILEENDBRK |  | E319 | cont_loops | WHILEENDBRK | c - | 26 | #E319 | Equivalent to `SAMEALTSAVE` `WHILEEND`. |
| AGAINBRK |  | E31A | cont_loops | AGAINBRK | c - | 26 | #E31A | Similar to `AGAIN`, but also modifies `c1` in the same way as `REPEATBRK`. |
|  |  | E31A | cont_loops | AGAINBRK:<{ code }> | - |  |  | Equivalent to `<{ code }> CONT` `AGAINBRK`. |
| AGAINENDBRK |  | E31B | cont_loops | AGAINENDBRK
AGAINBRK: | - | 26 | #E31B | Equivalent to `SAMEALTSAVE` `AGAINEND`. |
| SETCONTARGS_N |  | ECrn | cont_stack | [r] [n] SETCONTARGS | x_1 x_2...x_r c - c' | 26+s” | #EC r:uint4 n:(#<= 14) | Similar to `[r] -1 SETCONTARGS`, but sets `c.nargs` to the final size of the stack of `c'` plus `n`. In other words, transforms `c` into a _closure_ or a _partially applied function_, with `0 <= n <= 14` arguments missing. |
| SETNUMARGS | SETCONTARGS_N | EC0n | cont_stack | [n] SETNUMARGS | c - c' | 26 | #EC0 n:(#<= 14) | Sets `c.nargs` to `n` plus the current depth of `c`'s stack, where `0 <= n <= 14`. If `c.nargs` is already set to a non-negative value, does nothing. |
| SETCONTARGS |  | ECrF | cont_stack | [r] -1 SETCONTARGS | x_1 x_2...x_r c - c' | 26+s” | #EC r:uint4 n:(## 4) {n = 15} | Pushes `0 <= r <= 15` values `x_1...x_r` into the stack of (a copy of) the continuation `c`, starting with `x_1`. If the final depth of `c`'s stack turns out to be greater than `c.nargs`, a stack overflow exception is generated. |
| RETURNARGS |  | ED0p | cont_stack | [p] RETURNARGS | - | 26+s” | #ED0 p:uint4 | Leaves only the top `0 <= p <= 15` values in the current stack (somewhat similarly to `ONLYTOPX`), with all the unused bottom values not discarded, but saved into continuation `c0` in the same way as `SETCONTARGS` does. |
| RETURNVARARGS |  | ED10 | cont_stack | RETURNVARARGS | p - | 26+s” | #ED10 | Similar to `RETURNARGS`, but with Integer `0 <= p <= 255` taken from the stack. |
| SETCONTVARARGS |  | ED11 | cont_stack | SETCONTVARARGS | x_1 x_2...x_r c r n - c' | 26+s” | #ED11 | Similar to `SETCONTARGS`, but with `0 <= r <= 255` and `-1 <= n <= 255` taken from the stack. |
| SETNUMVARARGS |  | ED12 | cont_stack | SETNUMVARARGS | c n - c' | 26 | #ED12 | `-1 <= n <= 255`
If `n=-1`, this operation does nothing (`c'=c`).
Otherwise its action is similar to `[n] SETNUMARGS`, but with `n` taken from the stack. |
| BLESS |  | ED1E | cont_create | BLESS | s - c | 26 | #ED1E | Transforms a _Slice_ `s` into a simple ordinary continuation `c`, with `c.code=s` and an empty stack and savelist. |
| BLESSVARARGS |  | ED1F | cont_create | BLESSVARARGS | x_1...x_r s r n - c | 26+s” | #ED1F | Equivalent to `ROT` `BLESS` `ROTREV` `SETCONTVARARGS`. |
| BLESSARGS |  | EErn | cont_create | [r] [n] BLESSARGS | x_1...x_r s - c | 26 | #EE r:uint4 n:uint4 | `0 <= r <= 15`, `-1 <= n <= 14`
Equivalent to `BLESS` `[r] [n] SETCONTARGS`.
The value of `n` is represented inside the instruction by the 4-bit integer `n mod 16`. |
| BLESSNUMARGS | BLESSARGS | EE0n | cont_create | [n] BLESSNUMARGS | s - c | 26 | #EE0 n:uint4 | Also transforms a _Slice_ `s` into a _Continuation_ `c`, but sets `c.nargs` to `0 <= n <= 14`. |
| PUSHCTR |  | ED4i | cont_registers | c[i] PUSHCTR
c[i] PUSH | - x | 26 | #ED4 i:uint4 | Pushes the current value of control register `c(i)`. If the control register is not supported in the current codepage, or if it does not have a value, an exception is triggered. |
| PUSHROOT | PUSHCTR | ED44 | cont_registers | c4 PUSHCTR
c4 PUSH | - x | 26 | #ED44 | Pushes the “global data root'' cell reference, thus enabling access to persistent smart-contract data. |
| POPCTR |  | ED5i | cont_registers | c[i] POPCTR
c[i] POP | x - | 26 | #ED5 i:uint4 | Pops a value `x` from the stack and stores it into control register `c(i)`, if supported in the current codepage. Notice that if a control register accepts only values of a specific type, a type-checking exception may occur. |
| POPROOT | POPCTR | ED54 | cont_registers | c4 POPCTR
c4 POP | x - | 26 | #ED54 | Sets the “global data root'' cell reference, thus allowing modification of persistent smart-contract data. |
| SETCONTCTR |  | ED6i | cont_registers | c[i] SETCONT
c[i] SETCONTCTR | x c - c' | 26 | #ED6 i:uint4 | Stores `x` into the savelist of continuation `c` as `c(i)`, and returns the resulting continuation `c'`. Almost all operations with continuations may be expressed in terms of `SETCONTCTR`, `POPCTR`, and `PUSHCTR`. |
| SETRETCTR |  | ED7i | cont_registers | c[i] SETRETCTR | x - | 26 | #ED7 i:uint4 | Equivalent to `c0 PUSHCTR` `c[i] SETCONTCTR` `c0 POPCTR`. |
| SETALTCTR |  | ED8i | cont_registers | c[i] SETALTCTR | x - | 26 | #ED8 i:uint4 | Equivalent to `c1 PUSHCTR` `c[i] SETCONTCTR` `c0 POPCTR`. |
| POPSAVE |  | ED9i | cont_registers | c[i] POPSAVE
c[i] POPCTRSAVE | x - | 26 | #ED9 i:uint4 | Similar to `c[i] POPCTR`, but also saves the old value of `c[i]` into continuation `c0`.
Equivalent (up to exceptions) to `c[i] SAVECTR` `c[i] POPCTR`. |
| SAVE |  | EDAi | cont_registers | c[i] SAVE
c[i] SAVECTR |  | 26 | #EDA i:uint4 | Saves the current value of `c(i)` into the savelist of continuation `c0`. If an entry for `c[i]` is already present in the savelist of `c0`, nothing is done. Equivalent to `c[i] PUSHCTR` `c[i] SETRETCTR`. |
| SAVEALT |  | EDBi | cont_registers | c[i] SAVEALT
c[i] SAVEALTCTR |  | 26 | #EDB i:uint4 | Similar to `c[i] SAVE`, but saves the current value of `c[i]` into the savelist of `c1`, not `c0`. |
| SAVEBOTH |  | EDCi | cont_registers | c[i] SAVEBOTH
c[i] SAVEBOTHCTR |  | 26 | #EDC i:uint4 | Equivalent to `DUP` `c[i] SAVE` `c[i] SAVEALT`. |
| PUSHCTRX |  | EDE0 | cont_registers | PUSHCTRX | i - x | 26 | #EDE0 | Similar to `c[i] PUSHCTR`, but with `i`, `0 <= i <= 255`, taken from the stack.
Notice that this primitive is one of the few “exotic'' primitives, which are not polymorphic like stack manipulation primitives, and at the same time do not have well-defined types of parameters and return values, because the type of `x` depends on `i`. |
| POPCTRX |  | EDE1 | cont_registers | POPCTRX | x i - | 26 | #EDE1 | Similar to `c[i] POPCTR`, but with `0 <= i <= 255` from the stack. |
| SETCONTCTRX |  | EDE2 | cont_registers | SETCONTCTRX | x c i - c' | 26 | #EDE2 | Similar to `c[i] SETCONTCTR`, but with `0 <= i <= 255` from the stack. |
| COMPOS |  | EDF0 | cont_registers | COMPOS
BOOLAND | c c' - c'' | 26 | #EDF0 | Computes the composition `compose0(c, c’)`, which has the meaning of “perform `c`, and, if successful, perform `c'`'' (if `c` is a boolean circuit) or simply “perform `c`, then `c'`''. Equivalent to `SWAP` `c0 SETCONT`. |
| COMPOSALT |  | EDF1 | cont_registers | COMPOSALT
BOOLOR | c c' - c'' | 26 | #EDF1 | Computes the alternative composition `compose1(c, c’)`, which has the meaning of “perform `c`, and, if not successful, perform `c'`'' (if `c` is a boolean circuit). Equivalent to `SWAP` `c1 SETCONT`. |
| COMPOSBOTH |  | EDF2 | cont_registers | COMPOSBOTH | c c' - c'' | 26 | #EDF2 | Computes composition `compose1(compose0(c, c’), c’)`, which has the meaning of “compute boolean circuit `c`, then compute `c'`, regardless of the result of `c`''. |
| ATEXIT |  | EDF3 | cont_registers | ATEXIT | c - | 26 | #EDF3 | Sets `c0` to `compose0(c, c0)`. In other words, `c` will be executed before exiting current subroutine. |
|  |  | EDF3 | cont_registers | ATEXIT:<{ code }>
<{ code }>ATEXIT | - |  |  | Equivalent to `<{ code }> CONT` `ATEXIT`. |
| ATEXITALT |  | EDF4 | cont_registers | ATEXITALT | c - | 26 | #EDF4 | Sets `c1` to `compose1(c, c1)`. In other words, `c` will be executed before exiting current subroutine by its alternative return path. |
|  |  | EDF4 | cont_registers | ATEXITALT:<{ code }>
<{ code }>ATEXITALT | - |  |  | Equivalent to `<{ code }> CONT` `ATEXITALT`. |
| SETEXITALT |  | EDF5 | cont_registers | SETEXITALT | c - | 26 | #EDF5 | Sets `c1` to `compose1(compose0(c, c0), c1)`,
In this way, a subsequent `RETALT` will first execute `c`, then transfer control to the original `c0`. This can be used, for instance, to exit from nested loops. |
| THENRET |  | EDF6 | cont_registers | THENRET | c - c' | 26 | #EDF6 | Computes `compose0(c, c0)`. |
| THENRETALT |  | EDF7 | cont_registers | THENRETALT | c - c' | 26 | #EDF7 | Computes `compose0(c, c1)` |
| INVERT |  | EDF8 | cont_registers | INVERT | - | 26 | #EDF8 | Interchanges `c0` and `c1`. |
| BOOLEVAL |  | EDF9 | cont_registers | BOOLEVAL | c - ? | 26 | #EDF9 | Performs `cc:=compose1(compose0(c, compose0(-1 PUSHINT, cc)), compose0(0 PUSHINT, cc))`. If `c` represents a boolean circuit, the net effect is to evaluate it and push either `-1` or `0` into the stack before continuing. |
| SAMEALT |  | EDFA | cont_registers | SAMEALT | - | 26 | #EDFA | Sets `c1` to `c0`. Equivalent to `c0 PUSHCTR` `c1 POPCTR`. |
| SAMEALTSAVE |  | EDFB | cont_registers | SAMEALTSAVE | - | 26 | #EDFB | Sets `c1` to `c0`, but first saves the old value of `c1` into the savelist of `c0`.
Equivalent to `c1 SAVE` `SAMEALT`. |
| CALLDICT |  | F0nn | cont_dict | [nn] CALL
[nn] CALLDICT | - nn |  | #F0 n:uint8 | Calls the continuation in `c3`, pushing integer `0 <= nn <= 255` into its stack as an argument.
Approximately equivalent to `[nn] PUSHINT` `c3 PUSHCTR` `EXECUTE`. |
| CALLDICT_LONG |  | F12_n | cont_dict | [n] CALL
[n] CALLDICT | - n |  | #F12_ n:uint14 | For `0 <= n < 2^14`, an encoding of `[n] CALL` for larger values of `n`. |
| JMPDICT |  | F16_n | cont_dict | [n] JMP | - n |  | #F16_ n:uint14 | Jumps to the continuation in `c3`, pushing integer `0 <= n < 2^14` as its argument.
Approximately equivalent to `n PUSHINT` `c3 PUSHCTR` `JMPX`. |
| PREPAREDICT |  | F1A_n | cont_dict | [n] PREPARE
[n] PREPAREDICT | - n c |  | #F1A_ n:uint14 | Equivalent to `n PUSHINT` `c3 PUSHCTR`, for `0 <= n < 2^14`.
In this way, `[n] CALL` is approximately equivalent to `[n] PREPARE` `EXECUTE`, and `[n] JMP` is approximately equivalent to `[n] PREPARE` `JMPX`.
One might use, for instance, `CALLXARGS` or `CALLCC` instead of `EXECUTE` here. |
| THROW_SHORT |  | F22_n | exceptions | [n] THROW | - 0 n | 76 | #F22_ n:uint6 | Throws exception `0 <= n <= 63` with parameter zero.
In other words, it transfers control to the continuation in `c2`, pushing `0` and `n` into its stack, and discarding the old stack altogether. |
| THROWIF_SHORT |  | F26_n | exceptions | [n] THROWIF | f - | 26/76 | #F26_ n:uint6 | Throws exception `0 <= n <= 63` with  parameter zero only if integer `f!=0`. |
| THROWIFNOT_SHORT |  | F2A_n | exceptions | [n] THROWIFNOT | f - | 26/76 | #F2A_ n:uint6 | Throws exception `0 <= n <= 63` with parameter zero only if integer `f=0`. |
| THROW |  | F2C4_n | exceptions | [n] THROW | - 0 nn | 84 | #F2C4_ n:uint11 | For `0 <= n < 2^11`, an encoding of `[n] THROW` for larger values of `n`. |
| THROWARG |  | F2CC_n | exceptions | [n] THROWARG | x - x nn | 84 | #F2CC_ n:uint11 | Throws exception `0 <= n <  2^11` with parameter `x`, by copying `x` and `n` into the stack of `c2` and transferring control to `c2`. |
| THROWIF |  | F2D4_n | exceptions | [n] THROWIF | f - | 34/84 | #F2D4_ n:uint11 | For `0 <= n < 2^11`, an encoding of `[n] THROWIF` for larger values of `n`. |
| THROWARGIF |  | F2DC_n | exceptions | [n] THROWARGIF | x f - | 34/84 | #F2DC_ n:uint11 | Throws exception `0 <= nn < 2^11` with parameter `x` only if integer `f!=0`. |
| THROWIFNOT |  | F2E4_n | exceptions | [n] THROWIFNOT | f - | 34/84 | #F2E4_ n:uint11 | For `0 <= n < 2^11`, an encoding of `[n] THROWIFNOT` for larger values of `n`. |
| THROWARGIFNOT |  | F2EC_n | exceptions | [n] THROWARGIFNOT | x f - | 34/84 | #F2EC_ n:uint11 | Throws exception `0 <= n < 2^11` with parameter `x` only if integer `f=0`. |
| THROWANY |  | F2F0 | exceptions | THROWANY | n - 0 n | 76 | #F2F0 | Throws exception `0 <= n < 2^16` with parameter zero.
Approximately equivalent to `ZERO` `SWAP` `THROWARGANY`. |
| THROWARGANY |  | F2F1 | exceptions | THROWARGANY | x n - x n | 76 | #F2F1 | Throws exception `0 <= n < 2^16` with parameter `x`, transferring control to the continuation in `c2`.
Approximately equivalent to `c2 PUSHCTR` `2 JMPXARGS`. |
| THROWANYIF |  | F2F2 | exceptions | THROWANYIF | n f - | 26/76 | #F2F2 | Throws exception `0 <= n < 2^16` with parameter zero only if `f!=0`. |
| THROWARGANYIF |  | F2F3 | exceptions | THROWARGANYIF | x n f - | 26/76 | #F2F3 | Throws exception `0 <= n<2^16` with parameter `x` only if `f!=0`. |
| THROWANYIFNOT |  | F2F4 | exceptions | THROWANYIFNOT | n f - | 26/76 | #F2F4 | Throws exception `0 <= n<2^16` with parameter zero only if `f=0`. |
| THROWARGANYIFNOT |  | F2F5 | exceptions | THROWARGANYIFNOT | x n f - | 26/76 | #F2F5 | Throws exception `0 <= n<2^16` with parameter `x` only if `f=0`. |
| TRY |  | F2FF | exceptions | TRY | c c' - | 26 | #F2FF | Sets `c2` to `c'`, first saving the old value of `c2` both into the savelist of `c'` and into the savelist of the current continuation, which is stored into `c.c0` and `c'.c0`. Then runs `c` similarly to `EXECUTE`. If `c` does not throw any exceptions, the original value of `c2` is automatically restored on return from `c`. If an exception occurs, the execution is transferred to `c'`, but the original value of `c2` is restored in the process, so that `c'` can re-throw the exception by `THROWANY` if it cannot handle it by itself. |
|  |  | F2FF | exceptions | TRY:<{ code1 }>CATCH<{ code2 }> | - |  |  | Equivalent to `<{ code1 }> CONT` `<{ code2 }> CONT` `TRY`. |
| TRYARGS |  | F3pr | exceptions | [p] [r] TRYARGS | c c' - | 26 | #F3 p:uint4 r:uint4 | Similar to `TRY`, but with `[p] [r] CALLXARGS` internally used instead of `EXECUTE`.
In this way, all but the top `0 <= p <= 15` stack elements will be saved into current continuation's stack, and then restored upon return from either `c` or `c'`, with the top `0 <= r <= 15` values of the resulting stack of `c` or `c'` copied as return values. |
| NEWDICT | NULL | 6D | dict_create | NEWDICT | - D | 18 | #6D | Returns a new empty dictionary.
It is an alternative mnemonics for `PUSHNULL`. |
| DICTEMPTY | ISNULL | 6E | dict_create | DICTEMPTY | D - ? | 18 | #6E | Checks whether dictionary `D` is empty, and returns `-1` or `0` accordingly.
It is an alternative mnemonics for `ISNULL`. |
| STDICTS | STSLICE | CE | dict_serial | STDICTS
 | s b - b' | 18 | #CE | Stores a _Slice_-represented dictionary `s` into _Builder_ `b`.
It is actually a synonym for `STSLICE`. |
| STDICT |  | F400 | dict_serial | STDICT
STOPTREF | D b - b' | 26 | #F400 | Stores dictionary `D` into _Builder_ `b`, returing the resulting _Builder_ `b'`.
In other words, if `D` is a cell, performs `STONE` and `STREF`; if `D` is _Null_, performs `NIP` and `STZERO`; otherwise throws a type checking exception. |
| SKIPDICT |  | F401 | dict_serial | SKIPDICT
SKIPOPTREF | s - s' | 26 | #F401 | Equivalent to `LDDICT` `NIP`. |
| LDDICTS |  | F402 | dict_serial | LDDICTS | s - s' s'' | 26 | #F402 | Loads (parses) a (_Slice_-represented) dictionary `s'` from _Slice_ `s`, and returns the remainder of `s` as `s''`.
This is a “split function'' for all `HashmapE(n,X)` dictionary types. |
| PLDDICTS |  | F403 | dict_serial | PLDDICTS | s - s' | 26 | #F403 | Preloads a (_Slice_-represented) dictionary `s'` from _Slice_ `s`.
Approximately equivalent to `LDDICTS` `DROP`. |
| LDDICT |  | F404 | dict_serial | LDDICT
LDOPTREF | s - D s' | 26 | #F404 | Loads (parses) a dictionary `D` from _Slice_ `s`, and returns the remainder of `s` as `s'`. May be applied to dictionaries or to values of arbitrary `(^Y)?` types. |
| PLDDICT |  | F405 | dict_serial | PLDDICT
PLDOPTREF | s - D | 26 | #F405 | Preloads a dictionary `D` from _Slice_ `s`.
Approximately equivalent to `LDDICT` `DROP`. |
| LDDICTQ |  | F406 | dict_serial | LDDICTQ | s - D s' -1 or s 0 | 26 | #F406 | A quiet version of `LDDICT`. |
| PLDDICTQ |  | F407 | dict_serial | PLDDICTQ | s - D -1 or 0 | 26 | #F407 | A quiet version of `PLDDICT`. |
| DICTGET |  | F40A | dict_get | DICTGET | k D n - x -1 or 0 |  | #F40A | Looks up key `k` (represented by a _Slice_, the first `0 <= n <= 1023` data bits of which are used as a key) in dictionary `D` of type `HashmapE(n,X)` with `n`-bit keys.
On success, returns the value found as a _Slice_ `x`. |
| DICTGETREF |  | F40B | dict_get | DICTGETREF | k D n - c -1 or 0 |  | #F40B | Similar to `DICTGET`, but with a `LDREF` `ENDS` applied to `x` on success.
This operation is useful for dictionaries of type `HashmapE(n,^Y)`. |
| DICTIGET |  | F40C | dict_get | DICTIGET | i D n - x -1 or 0 |  | #F40C | Similar to `DICTGET`, but with a signed (big-endian) `n`-bit _Integer_ `i` as a key. If `i` does not fit into `n` bits, returns `0`. If `i` is a `NaN`, throws an integer overflow exception. |
| DICTIGETREF |  | F40D | dict_get | DICTIGETREF | i D n - c -1 or 0 |  | #F40D | Combines `DICTIGET` with `DICTGETREF`: it uses signed `n`-bit _Integer_ `i` as a key and returns a _Cell_ instead of a _Slice_ on success. |
| DICTUGET |  | F40E | dict_get | DICTUGET | i D n - x -1 or 0 |  | #F40E | Similar to `DICTIGET`, but with _unsigned_ (big-endian) `n`-bit _Integer_ `i` used as a key. |
| DICTUGETREF |  | F40F | dict_get | DICTUGETREF | i D n - c -1 or 0 |  | #F40F | Similar to `DICTIGETREF`, but with an unsigned `n`-bit _Integer_ key `i`. |
| DICTSET |  | F412 | dict_set | DICTSET | x k D n - D' |  | #F412 | Sets the value associated with `n`-bit key `k` (represented by a _Slice_ as in `DICTGET`) in dictionary `D` (also represented by a _Slice_) to value `x` (again a _Slice_), and returns the resulting dictionary as `D'`. |
| DICTSETREF |  | F413 | dict_set | DICTSETREF | c k D n - D' |  | #F413 | Similar to `DICTSET`, but with the value set to a reference to _Cell_ `c`. |
| DICTISET |  | F414 | dict_set | DICTISET | x i D n - D' |  | #F414 | Similar to `DICTSET`, but with the key represented by a (big-endian) signed `n`-bit integer `i`. If `i` does not fit into `n` bits, a range check exception is generated. |
| DICTISETREF |  | F415 | dict_set | DICTISETREF | c i D n - D' |  | #F415 | Similar to `DICTSETREF`, but with the key a signed `n`-bit integer as in `DICTISET`. |
| DICTUSET |  | F416 | dict_set | DICTUSET | x i D n - D' |  | #F416 | Similar to `DICTISET`, but with `i` an _unsigned_ `n`-bit integer. |
| DICTUSETREF |  | F417 | dict_set | DICTUSETREF | c i D n - D' |  | #F417 | Similar to `DICTISETREF`, but with `i` unsigned. |
| DICTSETGET |  | F41A | dict_set | DICTSETGET | x k D n - D' y -1 or D' 0 |  | #F41A | Combines `DICTSET` with `DICTGET`: it sets the value corresponding to key `k` to `x`, but also returns the old value `y` associated with the key in question, if present. |
| DICTSETGETREF |  | F41B | dict_set | DICTSETGETREF | c k D n - D' c' -1 or D' 0 |  | #F41B | Combines `DICTSETREF` with `DICTGETREF` similarly to `DICTSETGET`. |
| DICTISETGET |  | F41C | dict_set | DICTISETGET | x i D n - D' y -1 or D' 0 |  | #F41C | `DICTISETGET`, but with `i` a signed `n`-bit integer. |
| DICTISETGETREF |  | F41D | dict_set | DICTISETGETREF | c i D n - D' c' -1 or D' 0 |  | #F41D | `DICTISETGETREF`, but with `i` a signed `n`-bit integer. |
| DICTUSETGET |  | F41E | dict_set | DICTUSETGET | x i D n - D' y -1 or D' 0 |  | #F41E | `DICTISETGET`, but with `i` an unsigned `n`-bit integer. |
| DICTUSETGETREF |  | F41F | dict_set | DICTUSETGETREF | c i D n - D' c' -1 or D' 0 |  | #F41F | `DICTISETGETREF`, but with `i` an unsigned `n`-bit integer. |
| DICTREPLACE |  | F422 | dict_set | DICTREPLACE | x k D n - D' -1 or D 0 |  | #F422 | A _Replace_ operation, which is similar to `DICTSET`, but sets the value of key `k` in dictionary `D` to `x` only if the key `k` was already present in `D`. |
| DICTREPLACEREF |  | F423 | dict_set | DICTREPLACEREF | c k D n - D' -1 or D 0 |  | #F423 | A _Replace_ counterpart of `DICTSETREF`. |
| DICTIREPLACE |  | F424 | dict_set | DICTIREPLACE | x i D n - D' -1 or D 0 |  | #F424 | `DICTREPLACE`, but with `i` a signed `n`-bit integer. |
| DICTIREPLACEREF |  | F425 | dict_set | DICTIREPLACEREF | c i D n - D' -1 or D 0 |  | #F425 | `DICTREPLACEREF`, but with `i` a signed `n`-bit integer. |
| DICTUREPLACE |  | F426 | dict_set | DICTUREPLACE | x i D n - D' -1 or D 0 |  | #F426 | `DICTREPLACE`, but with `i` an unsigned `n`-bit integer. |
| DICTUREPLACEREF |  | F427 | dict_set | DICTUREPLACEREF | c i D n - D' -1 or D 0 |  | #F427 | `DICTREPLACEREF`, but with `i` an unsigned `n`-bit integer. |
| DICTREPLACEGET |  | F42A | dict_set | DICTREPLACEGET | x k D n - D' y -1 or D 0 |  | #F42A | A _Replace_ counterpart of `DICTSETGET`: on success, also returns the old value associated with the key in question. |
| DICTREPLACEGETREF |  | F42B | dict_set | DICTREPLACEGETREF | c k D n - D' c' -1 or D 0 |  | #F42B | A _Replace_ counterpart of `DICTSETGETREF`. |
| DICTIREPLACEGET |  | F42C | dict_set | DICTIREPLACEGET | x i D n - D' y -1 or D 0 |  | #F42C | `DICTREPLACEGET`, but with `i` a signed `n`-bit integer. |
| DICTIREPLACEGETREF |  | F42D | dict_set | DICTIREPLACEGETREF | c i D n - D' c' -1 or D 0 |  | #F42D | `DICTREPLACEGETREF`, but with `i` a signed `n`-bit integer. |
| DICTUREPLACEGET |  | F42E | dict_set | DICTUREPLACEGET | x i D n - D' y -1 or D 0 |  | #F42E | `DICTREPLACEGET`, but with `i` an unsigned `n`-bit integer. |
| DICTUREPLACEGETREF |  | F42F | dict_set | DICTUREPLACEGETREF | c i D n - D' c' -1 or D 0 |  | #F42F | `DICTREPLACEGETREF`, but with `i` an unsigned `n`-bit integer. |
| DICTADD |  | F432 | dict_set | DICTADD | x k D n - D' -1 or D 0 |  | #F432 | An _Add_ counterpart of `DICTSET`: sets the value associated with key `k` in dictionary `D` to `x`, but only if it is not already present in `D`. |
| DICTADDREF |  | F433 | dict_set | DICTADDREF | c k D n - D' -1 or D 0 |  | #F433 | An _Add_ counterpart of `DICTSETREF`. |
| DICTIADD |  | F434 | dict_set | DICTIADD | x i D n - D' -1 or D 0 |  | #F434 | `DICTADD`, but with `i` a signed `n`-bit integer. |
| DICTIADDREF |  | F435 | dict_set | DICTIADDREF | c i D n - D' -1 or D 0 |  | #F435 | `DICTADDREF`, but with `i` a signed `n`-bit integer. |
| DICTUADD |  | F436 | dict_set | DICTUADD | x i D n - D' -1 or D 0 |  | #F436 | `DICTADD`, but with `i` an unsigned `n`-bit integer. |
| DICTUADDREF |  | F437 | dict_set | DICTUADDREF | c i D n - D' -1 or D 0 |  | #F437 | `DICTADDREF`, but with `i` an unsigned `n`-bit integer. |
| DICTADDGET |  | F43A | dict_set | DICTADDGET | x k D n - D' -1 or D y 0 |  | #F43A | An _Add_ counterpart of `DICTSETGET`: sets the value associated with key `k` in dictionary `D` to `x`, but only if key `k` is not already present in `D`. Otherwise, just returns the old value `y` without changing the dictionary. |
| DICTADDGETREF |  | F43B | dict_set | DICTADDGETREF | c k D n - D' -1 or D c' 0 |  | #F43B | An _Add_ counterpart of `DICTSETGETREF`. |
| DICTIADDGET |  | F43C | dict_set | DICTIADDGET | x i D n - D' -1 or D y 0 |  | #F43C | `DICTADDGET`, but with `i` a signed `n`-bit integer. |
| DICTIADDGETREF |  | F43D | dict_set | DICTIADDGETREF | c i D n - D' -1 or D c' 0 |  | #F43D | `DICTADDGETREF`, but with `i` a signed `n`-bit integer. |
| DICTUADDGET |  | F43E | dict_set | DICTUADDGET | x i D n - D' -1 or D y 0 |  | #F43E | `DICTADDGET`, but with `i` an unsigned `n`-bit integer. |
| DICTUADDGETREF |  | F43F | dict_set | DICTUADDGETREF | c i D n - D' -1 or D c' 0 |  | #F43F | `DICTADDGETREF`, but with `i` an unsigned `n`-bit integer. |
| DICTSETB |  | F441 | dict_set_builder | DICTSETB | b k D n - D' |  | #F441 |  |
| DICTISETB |  | F442 | dict_set_builder | DICTISETB | b i D n - D' |  | #F442 |  |
| DICTUSETB |  | F443 | dict_set_builder | DICTUSETB | b i D n - D' |  | #F443 |  |
| DICTSETGETB |  | F445 | dict_set_builder | DICTSETGETB | b k D n - D' y -1 or D' 0 |  | #F445 |  |
| DICTISETGETB |  | F446 | dict_set_builder | DICTISETGETB | b i D n - D' y -1 or D' 0 |  | #F446 |  |
| DICTUSETGETB |  | F447 | dict_set_builder | DICTUSETGETB | b i D n - D' y -1 or D' 0 |  | #F447 |  |
| DICTREPLACEB |  | F449 | dict_set_builder | DICTREPLACEB | b k D n - D' -1 or D 0 |  | #F449 |  |
| DICTIREPLACEB |  | F44A | dict_set_builder | DICTIREPLACEB | b i D n - D' -1 or D 0 |  | #F44A |  |
| DICTUREPLACEB |  | F44B | dict_set_builder | DICTUREPLACEB | b i D n - D' -1 or D 0 |  | #F44B |  |
| DICTREPLACEGETB |  | F44D | dict_set_builder | DICTREPLACEGETB | b k D n - D' y -1 or D 0 |  | #F44D |  |
| DICTIREPLACEGETB |  | F44E | dict_set_builder | DICTIREPLACEGETB | b i D n - D' y -1 or D 0 |  | #F44E |  |
| DICTUREPLACEGETB |  | F44F | dict_set_builder | DICTUREPLACEGETB | b i D n - D' y -1 or D 0 |  | #F44F |  |
| DICTADDB |  | F451 | dict_set_builder | DICTADDB | b k D n - D' -1 or D 0 |  | #F451 |  |
| DICTIADDB |  | F452 | dict_set_builder | DICTIADDB | b i D n - D' -1 or D 0 |  | #F452 |  |
| DICTUADDB |  | F453 | dict_set_builder | DICTUADDB | b i D n - D' -1 or D 0 |  | #F453 |  |
| DICTADDGETB |  | F455 | dict_set_builder | DICTADDGETB | b k D n - D' -1 or D y 0 |  | #F455 |  |
| DICTIADDGETB |  | F456 | dict_set_builder | DICTIADDGETB | b i D n - D' -1 or D y 0 |  | #F456 |  |
| DICTUADDGETB |  | F457 | dict_set_builder | DICTUADDGETB | b i D n - D' -1 or D y 0 |  | #F457 |  |
| DICTDEL |  | F459 | dict_delete | DICTDEL | k D n - D' -1 or D 0 |  | #F459 | Deletes `n`-bit key, represented by a _Slice_ `k`, from dictionary `D`. If the key is present, returns the modified dictionary `D'` and the success flag `-1`. Otherwise, returns the original dictionary `D` and `0`. |
| DICTIDEL |  | F45A | dict_delete | DICTIDEL | i D n - D' ? |  | #F45A | A version of `DICTDEL` with the key represented by a signed `n`-bit _Integer_ `i`. If `i` does not fit into `n` bits, simply returns `D` `0` (“key not found, dictionary unmodified''). |
| DICTUDEL |  | F45B | dict_delete | DICTUDEL | i D n - D' ? |  | #F45B | Similar to `DICTIDEL`, but with `i` an unsigned `n`-bit integer. |
| DICTDELGET |  | F462 | dict_delete | DICTDELGET | k D n - D' x -1 or D 0 |  | #F462 | Deletes `n`-bit key, represented by a _Slice_ `k`, from dictionary `D`. If the key is present, returns the modified dictionary `D'`, the original value `x` associated with the key `k` (represented by a _Slice_), and the success flag `-1`. Otherwise, returns the original dictionary `D` and `0`. |
| DICTDELGETREF |  | F463 | dict_delete | DICTDELGETREF | k D n - D' c -1 or D 0 |  | #F463 | Similar to `DICTDELGET`, but with `LDREF` `ENDS` applied to `x` on success, so that the value returned `c` is a _Cell_. |
| DICTIDELGET |  | F464 | dict_delete | DICTIDELGET | i D n - D' x -1 or D 0 |  | #F464 | `DICTDELGET`, but with `i` a signed `n`-bit integer. |
| DICTIDELGETREF |  | F465 | dict_delete | DICTIDELGETREF | i D n - D' c -1 or D 0 |  | #F465 | `DICTDELGETREF`, but with `i` a signed `n`-bit integer. |
| DICTUDELGET |  | F466 | dict_delete | DICTUDELGET | i D n - D' x -1 or D 0 |  | #F466 | `DICTDELGET`, but with `i` an unsigned `n`-bit integer. |
| DICTUDELGETREF |  | F467 | dict_delete | DICTUDELGETREF | i D n - D' c -1 or D 0 |  | #F467 | `DICTDELGETREF`, but with `i` an unsigned `n`-bit integer. |
| DICTGETOPTREF |  | F469 | dict_mayberef | DICTGETOPTREF | k D n - c^? |  | #F469 | A variant of `DICTGETREF` that returns _Null_ instead of the value `c^?` if the key `k` is absent from dictionary `D`. |
| DICTIGETOPTREF |  | F46A | dict_mayberef | DICTIGETOPTREF | i D n - c^? |  | #F46A | `DICTGETOPTREF`, but with `i` a signed `n`-bit integer. If the key `i` is out of range, also returns _Null_. |
| DICTUGETOPTREF |  | F46B | dict_mayberef | DICTUGETOPTREF | i D n - c^? |  | #F46B | `DICTGETOPTREF`, but with `i` an unsigned `n`-bit integer. If the key `i` is out of range, also returns _Null_. |
| DICTSETGETOPTREF |  | F46D | dict_mayberef | DICTSETGETOPTREF | c^? k D n - D' ~c^? |  | #F46D | A variant of both `DICTGETOPTREF` and `DICTSETGETREF` that sets the value corresponding to key `k` in dictionary `D` to `c^?` (if `c^?` is _Null_, then the key is deleted instead), and returns the old value `~c^?` (if the key `k` was absent before, returns _Null_ instead). |
| DICTISETGETOPTREF |  | F46E | dict_mayberef | DICTISETGETOPTREF | c^? i D n - D' ~c^? |  | #F46E | Similar to primitive `DICTSETGETOPTREF`, but using signed `n`-bit _Integer_ `i` as a key. If `i` does not fit into `n` bits, throws a range checking exception. |
| DICTUSETGETOPTREF |  | F46F | dict_mayberef | DICTUSETGETOPTREF | c^? i D n - D' ~c^? |  | #F46F | Similar to primitive `DICTSETGETOPTREF`, but using unsigned `n`-bit _Integer_ `i` as a key. |
| PFXDICTSET |  | F470 | dict_prefix | PFXDICTSET | x k D n - D' -1 or D 0 |  | #F470 |  |
| PFXDICTREPLACE |  | F471 | dict_prefix | PFXDICTREPLACE | x k D n - D' -1 or D 0 |  | #F471 |  |
| PFXDICTADD |  | F472 | dict_prefix | PFXDICTADD | x k D n - D' -1 or D 0 |  | #F472 |  |
| PFXDICTDEL |  | F473 | dict_prefix | PFXDICTDEL | k D n - D' -1 or D 0 |  | #F473 |  |
| DICTGETNEXT |  | F474 | dict_next | DICTGETNEXT | k D n - x' k' -1 or 0 |  | #F474 | Computes the minimal key `k'` in dictionary `D` that is lexicographically greater than `k`, and returns `k'` (represented by a _Slice_) along with associated value `x'` (also represented by a _Slice_). |
| DICTGETNEXTEQ |  | F475 | dict_next | DICTGETNEXTEQ | k D n - x' k' -1 or 0 |  | #F475 | Similar to `DICTGETNEXT`, but computes the minimal key `k'` that is lexicographically greater than or equal to `k`. |
| DICTGETPREV |  | F476 | dict_next | DICTGETPREV | k D n - x' k' -1 or 0 |  | #F476 | Similar to `DICTGETNEXT`, but computes the maximal key `k'` lexicographically smaller than `k`. |
| DICTGETPREVEQ |  | F477 | dict_next | DICTGETPREVEQ | k D n - x' k' -1 or 0 |  | #F477 | Similar to `DICTGETPREV`, but computes the maximal key `k'` lexicographically smaller than or equal to `k`. |
| DICTIGETNEXT |  | F478 | dict_next | DICTIGETNEXT | i D n - x' i' -1 or 0 |  | #F478 | Similar to `DICTGETNEXT`, but interprets all keys in dictionary `D` as big-endian signed `n`-bit integers, and computes the minimal key `i'` that is larger than _Integer_ `i` (which does not necessarily fit into `n` bits). |
| DICTIGETNEXTEQ |  | F479 | dict_next | DICTIGETNEXTEQ | i D n - x' i' -1 or 0 |  | #F479 | Similar to `DICTGETNEXTEQ`, but interprets keys as signed `n`-bit integers. |
| DICTIGETPREV |  | F47A | dict_next | DICTIGETPREV | i D n - x' i' -1 or 0 |  | #F47A | Similar to `DICTGETPREV`, but interprets keys as signed `n`-bit integers. |
| DICTIGETPREVEQ |  | F47B | dict_next | DICTIGETPREVEQ | i D n - x' i' -1 or 0 |  | #F47B | Similar to `DICTGETPREVEQ`, but interprets keys as signed `n`-bit integers. |
| DICTUGETNEXT |  | F47C | dict_next | DICTUGETNEXT | i D n - x' i' -1 or 0 |  | #F47C | Similar to `DICTGETNEXT`, but interprets all keys in dictionary `D` as big-endian unsigned `n`-bit integers, and computes the minimal key `i'` that is larger than _Integer_ `i` (which does not necessarily fit into `n` bits, and is not necessarily non-negative). |
| DICTUGETNEXTEQ |  | F47D | dict_next | DICTUGETNEXTEQ | i D n - x' i' -1 or 0 |  | #F47D | Similar to `DICTGETNEXTEQ`, but interprets keys as unsigned `n`-bit integers. |
| DICTUGETPREV |  | F47E | dict_next | DICTUGETPREV | i D n - x' i' -1 or 0 |  | #F47E | Similar to `DICTGETPREV`, but interprets keys as unsigned `n`-bit integers. |
| DICTUGETPREVEQ |  | F47F | dict_next | DICTUGETPREVEQ | i D n - x' i' -1 or 0 |  | #F47F | Similar to `DICTGETPREVEQ`, but interprets keys a unsigned `n`-bit integers. |
| DICTMIN |  | F482 | dict_min | DICTMIN | D n - x k -1 or 0 |  | #F482 | Computes the minimal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, and returns `k` along with the associated value `x`. |
| DICTMINREF |  | F483 | dict_min | DICTMINREF | D n - c k -1 or 0 |  | #F483 | Similar to `DICTMIN`, but returns the only reference in the value as a _Cell_ `c`. |
| DICTIMIN |  | F484 | dict_min | DICTIMIN | D n - x i -1 or 0 |  | #F484 | Similar to `DICTMIN`, but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by `DICTMIN` and `DICTUMIN`. |
| DICTIMINREF |  | F485 | dict_min | DICTIMINREF | D n - c i -1 or 0 |  | #F485 | Similar to `DICTIMIN`, but returns the only reference in the value. |
| DICTUMIN |  | F486 | dict_min | DICTUMIN | D n - x i -1 or 0 |  | #F486 | Similar to `DICTMIN`, but returns the key as an unsigned `n`-bit _Integer_ `i`. |
| DICTUMINREF |  | F487 | dict_min | DICTUMINREF | D n - c i -1 or 0 |  | #F487 | Similar to `DICTUMIN`, but returns the only reference in the value. |
| DICTMAX |  | F48A | dict_min | DICTMAX | D n - x k -1 or 0 |  | #F48A | Computes the maximal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, and returns `k` along with the associated value `x`. |
| DICTMAXREF |  | F48B | dict_min | DICTMAXREF | D n - c k -1 or 0 |  | #F48B | Similar to `DICTMAX`, but returns the only reference in the value. |
| DICTIMAX |  | F48C | dict_min | DICTIMAX | D n - x i -1 or 0 |  | #F48C | Similar to `DICTMAX`, but computes the maximal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by `DICTMAX` and `DICTUMAX`. |
| DICTIMAXREF |  | F48D | dict_min | DICTIMAXREF | D n - c i -1 or 0 |  | #F48D | Similar to `DICTIMAX`, but returns the only reference in the value. |
| DICTUMAX |  | F48E | dict_min | DICTUMAX | D n - x i -1 or 0 |  | #F48E | Similar to `DICTMAX`, but returns the key as an unsigned `n`-bit _Integer_ `i`. |
| DICTUMAXREF |  | F48F | dict_min | DICTUMAXREF | D n - c i -1 or 0 |  | #F48F | Similar to `DICTUMAX`, but returns the only reference in the value. |
| DICTREMMIN |  | F492 | dict_min | DICTREMMIN | D n - D' x k -1 or D 0 |  | #F492 | Computes the minimal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, removes `k` from the dictionary, and returns `k` along with the associated value `x` and the modified dictionary `D'`. |
| DICTREMMINREF |  | F493 | dict_min | DICTREMMINREF | D n - D' c k -1 or D 0 |  | #F493 | Similar to `DICTREMMIN`, but returns the only reference in the value as a _Cell_ `c`. |
| DICTIREMMIN |  | F494 | dict_min | DICTIREMMIN | D n - D' x i -1 or D 0 |  | #F494 | Similar to `DICTREMMIN`, but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by `DICTREMMIN` and `DICTUREMMIN`. |
| DICTIREMMINREF |  | F495 | dict_min | DICTIREMMINREF | D n - D' c i -1 or D 0 |  | #F495 | Similar to `DICTIREMMIN`, but returns the only reference in the value. |
| DICTUREMMIN |  | F496 | dict_min | DICTUREMMIN | D n - D' x i -1 or D 0 |  | #F496 | Similar to `DICTREMMIN`, but returns the key as an unsigned `n`-bit _Integer_ `i`. |
| DICTUREMMINREF |  | F497 | dict_min | DICTUREMMINREF | D n - D' c i -1 or D 0 |  | #F497 | Similar to `DICTUREMMIN`, but returns the only reference in the value. |
| DICTREMMAX |  | F49A | dict_min | DICTREMMAX | D n - D' x k -1 or D 0 |  | #F49A | Computes the maximal key `k` (represented by a _Slice_ with `n` data bits) in dictionary `D`, removes `k` from the dictionary, and returns `k` along with the associated value `x` and the modified dictionary `D'`. |
| DICTREMMAXREF |  | F49B | dict_min | DICTREMMAXREF | D n - D' c k -1 or D 0 |  | #F49B | Similar to `DICTREMMAX`, but returns the only reference in the value as a _Cell_ `c`. |
| DICTIREMMAX |  | F49C | dict_min | DICTIREMMAX | D n - D' x i -1 or D 0 |  | #F49C | Similar to `DICTREMMAX`, but computes the minimal key `i` under the assumption that all keys are big-endian signed `n`-bit integers. Notice that the key and value returned may differ from those computed by `DICTREMMAX` and `DICTUREMMAX`. |
| DICTIREMMAXREF |  | F49D | dict_min | DICTIREMMAXREF | D n - D' c i -1 or D 0 |  | #F49D | Similar to `DICTIREMMAX`, but returns the only reference in the value. |
| DICTUREMMAX |  | F49E | dict_min | DICTUREMMAX | D n - D' x i -1 or D 0 |  | #F49E | Similar to `DICTREMMAX`, but returns the key as an unsigned `n`-bit _Integer_ `i`. |
| DICTUREMMAXREF |  | F49F | dict_min | DICTUREMMAXREF | D n - D' c i -1 or D 0 |  | #F49F | Similar to `DICTUREMMAX`, but returns the only reference in the value. |
| DICTIGETJMP |  | F4A0 | dict_special | DICTIGETJMP | i D n - |  | #F4A0 | Similar to `DICTIGET`, but with `x` `BLESS`ed into a continuation with a subsequent `JMPX` to it on success. On failure, does nothing. This is useful for implementing `switch`/`case` constructions. |
| DICTUGETJMP |  | F4A1 | dict_special | DICTUGETJMP | i D n - |  | #F4A1 | Similar to `DICTIGETJMP`, but performs `DICTUGET` instead of `DICTIGET`. |
| DICTIGETEXEC |  | F4A2 | dict_special | DICTIGETEXEC | i D n - |  | #F4A2 | Similar to `DICTIGETJMP`, but with `EXECUTE` instead of `JMPX`. |
| DICTUGETEXEC |  | F4A3 | dict_special | DICTUGETEXEC | i D n - |  | #F4A3 | Similar to `DICTUGETJMP`, but with `EXECUTE` instead of `JMPX`. |
| DICTPUSHCONST |  | F4A6_n | dict_special | [ref] [n] DICTPUSHCONST | - D n | 34 | #F4A6_ d:^Cell n:uint10 | Pushes a non-empty constant dictionary `D` (as a `Cell^?`) along with its key length `0 <= n <= 1023`, stored as a part of the instruction. The dictionary itself is created from the first of remaining references of the current continuation. In this way, the complete `DICTPUSHCONST` instruction can be obtained by first serializing `xF4A4_`, then the non-empty dictionary itself (one `1` bit and a cell reference), and then the unsigned 10-bit integer `n` (as if by a `STU 10` instruction). An empty dictionary can be pushed by a `NEWDICT` primitive instead. |
| PFXDICTGETQ |  | F4A8 | dict_special | PFXDICTGETQ | s D n - s' x s'' -1 or s 0 |  | #F4A8 | Looks up the unique prefix of _Slice_ `s` present in the prefix code dictionary represented by `Cell^?` `D` and `0 <= n <= 1023`. If found, the prefix of `s` is returned as `s'`, and the corresponding value (also a _Slice_) as `x`. The remainder of `s` is returned as a _Slice_ `s''`. If no prefix of `s` is a key in prefix code dictionary `D`, returns the unchanged `s` and a zero flag to indicate failure. |
| PFXDICTGET |  | F4A9 | dict_special | PFXDICTGET | s D n - s' x s'' |  | #F4A9 | Similar to `PFXDICTGET`, but throws a cell deserialization failure exception on failure. |
| PFXDICTGETJMP |  | F4AA | dict_special | PFXDICTGETJMP | s D n - s' s'' or s |  | #F4AA | Similar to `PFXDICTGETQ`, but on success `BLESS`es the value `x` into a _Continuation_ and transfers control to it as if by a `JMPX`. On failure, returns `s` unchanged and continues execution. |
| PFXDICTGETEXEC |  | F4AB | dict_special | PFXDICTGETEXEC | s D n - s' s'' |  | #F4AB | Similar to `PFXDICTGETJMP`, but `EXEC`utes the continuation found instead of jumping to it. On failure, throws a cell deserialization exception. |
| PFXDICTCONSTGETJMP |  | F4AE_n | dict_special | [ref] [n] PFXDICTCONSTGETJMP
[ref] [n] PFXDICTSWITCH | s - s' s'' or s |  | #F4AE_ d:^Cell n:uint10 | Combines `DICTPUSHCONST n` for `0 <= n <= 1023` with `PFXDICTGETJMP`. |
| DICTIGETJMPZ |  | F4BC | dict_special | DICTIGETJMPZ | i D n - i or nothing |  | #F4BC | A variant of `DICTIGETJMP` that returns index `i` on failure. |
| DICTUGETJMPZ |  | F4BD | dict_special | DICTUGETJMPZ | i D n - i or nothing |  | #F4BD | A variant of `DICTUGETJMP` that returns index `i` on failure. |
| DICTIGETEXECZ |  | F4BE | dict_special | DICTIGETEXECZ | i D n - i or nothing |  | #F4BE | A variant of `DICTIGETEXEC` that returns index `i` on failure. |
| DICTUGETEXECZ |  | F4BF | dict_special | DICTUGETEXECZ | i D n - i or nothing |  | #F4BF | A variant of `DICTUGETEXEC` that returns index `i` on failure. |
| SUBDICTGET |  | F4B1 | dict_sub | SUBDICTGET | k l D n - D' |  | #F4B1 | Constructs a subdictionary consisting of all keys beginning with prefix `k` (represented by a _Slice_, the first `0 <= l <= n <= 1023` data bits of which are used as a key) of length `l` in dictionary `D` of type `HashmapE(n,X)` with `n`-bit keys. On success, returns the new subdictionary of the same type `HashmapE(n,X)` as a _Slice_ `D'`. |
| SUBDICTIGET |  | F4B2 | dict_sub | SUBDICTIGET | x l D n - D' |  | #F4B2 | Variant of `SUBDICTGET` with the prefix represented by a signed big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 257`. |
| SUBDICTUGET |  | F4B3 | dict_sub | SUBDICTUGET | x l D n - D' |  | #F4B3 | Variant of `SUBDICTGET` with the prefix represented by an unsigned big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 256`. |
| SUBDICTRPGET |  | F4B5 | dict_sub | SUBDICTRPGET | k l D n - D' |  | #F4B5 | Similar to `SUBDICTGET`, but removes the common prefix `k` from all keys of the new dictionary `D'`, which becomes of type `HashmapE(n-l,X)`. |
| SUBDICTIRPGET |  | F4B6 | dict_sub | SUBDICTIRPGET | x l D n - D' |  | #F4B6 | Variant of `SUBDICTRPGET` with the prefix represented by a signed big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 257`. |
| SUBDICTURPGET |  | F4B7 | dict_sub | SUBDICTURPGET | x l D n - D' |  | #F4B7 | Variant of `SUBDICTRPGET` with the prefix represented by an unsigned big-endian `l`-bit _Integer_ `x`, where necessarily `l <= 256`. |
| ACCEPT |  | F800 | app_gas | ACCEPT | - | 26 | #F800 | Sets current gas limit `g_l` to its maximal allowed value `g_m`, and resets the gas credit `g_c` to zero, decreasing the value of `g_r` by `g_c` in the process.
In other words, the current smart contract agrees to buy some gas to finish the current transaction. This action is required to process external messages, which bring no value (hence no gas) with themselves. |
| SETGASLIMIT |  | F801 | app_gas | SETGASLIMIT | g - | 26 | #F801 | Sets current gas limit `g_l` to the minimum of `g` and `g_m`, and resets the gas credit `g_c` to zero. If the gas consumed so far (including the present instruction) exceeds the resulting value of `g_l`, an (unhandled) out of gas exception is thrown before setting new gas limits. Notice that `SETGASLIMIT` with an argument `g >= 2^63-1` is equivalent to `ACCEPT`. |
| COMMIT |  | F80F | app_gas | COMMIT | - | 26 | #F80F | Commits the current state of registers `c4` (“persistent data'') and `c5` (“actions'') so that the current execution is considered “successful'' with the saved values even if an exception is thrown later. |
| RANDU256 |  | F810 | app_rnd | RANDU256 | - x | 26+|c7|+|c1_1| | #F810 | Generates a new pseudo-random unsigned 256-bit _Integer_ `x`. The algorithm is as follows: if `r` is the old value of the random seed, considered as a 32-byte array (by constructing the big-endian representation of an unsigned 256-bit integer), then its `sha512(r)` is computed; the first 32 bytes of this hash are stored as the new value `r'` of the random seed, and the remaining 32 bytes are returned as the next random value `x`. |
| RAND |  | F811 | app_rnd | RAND | y - z | 26+|c7|+|c1_1| | #F811 | Generates a new pseudo-random integer `z` in the range `0...y-1` (or `y...-1`, if `y<0`). More precisely, an unsigned random value `x` is generated as in `RAND256U`; then `z:=floor(x*y/2^256)` is computed.
Equivalent to `RANDU256` `256 MULRSHIFT`. |
| SETRAND |  | F814 | app_rnd | SETRAND | x - | 26+|c7|+|c1_1| | #F814 | Sets the random seed to unsigned 256-bit _Integer_ `x`. |
| ADDRAND |  | F815 | app_rnd | ADDRAND
RANDOMIZE | x - | 26 | #F815 | Mixes unsigned 256-bit _Integer_ `x` into the random seed `r` by setting the random seed to `Sha` of the concatenation of two 32-byte strings: the first with the big-endian representation of the old seed `r`, and the second with the big-endian representation of `x`. |
| GETPARAM |  | F82i | app_config | [i] GETPARAM | - x | 26 | #F82 i:uint4 | Returns the `i`-th parameter from the _Tuple_ provided at `c7` for `0 <= i <= 15`. Equivalent to `c7 PUSHCTR` `FIRST` `[i] INDEX`.
If one of these internal operations fails, throws an appropriate type checking or range checking exception. |
| NOW | GETPARAM | F823 | app_config | NOW | - x | 26 | #F823 | Returns the current Unix time as an _Integer_. If it is impossible to recover the requested value starting from `c7`, throws a type checking or range checking exception as appropriate.
Equivalent to `3 GETPARAM`. |
| BLOCKLT | GETPARAM | F824 | app_config | BLOCKLT | - x | 26 | #F824 | Returns the starting logical time of the current block.
Equivalent to `4 GETPARAM`. |
| LTIME | GETPARAM | F825 | app_config | LTIME | - x | 26 | #F825 | Returns the logical time of the current transaction.
Equivalent to `5 GETPARAM`. |
| RANDSEED | GETPARAM | F826 | app_config | RANDSEED | - x | 26 | #F826 | Returns the current random seed as an unsigned 256-bit _Integer_.
Equivalent to `6 GETPARAM`. |
| BALANCE | GETPARAM | F827 | app_config | BALANCE | - t | 26 | #F827 | Returns the remaining balance of the smart contract as a _Tuple_ consisting of an _Integer_ (the remaining Gram balance in nanograms) and a _Maybe Cell_ (a dictionary with 32-bit keys representing the balance of “extra currencies'').
Equivalent to `7 GETPARAM`.
Note that `RAW` primitives such as `SENDRAWMSG` do not update this field. |
| MYADDR | GETPARAM | F828 | app_config | MYADDR | - s | 26 | #F828 | Returns the internal address of the current smart contract as a _Slice_ with a `MsgAddressInt`. If necessary, it can be parsed further using primitives such as `PARSEMSGADDR` or `REWRITESTDADDR`.
Equivalent to `8 GETPARAM`. |
| CONFIGROOT | GETPARAM | F829 | app_config | CONFIGROOT | - D | 26 | #F829 | Returns the _Maybe Cell_ `D` with the current global configuration dictionary. Equivalent to `9 GETPARAM `. |
| MYCODE | GETPARAM | F82A | app_config |  |  |  |  | Returns the Cell c with the inital code of the smartcontract. Equivalent to GETPARAM 10. |
| INITCODEHASH | GETPARAM | F82B | app_config |  |  |  |  | Returns the Integerl x returns the inte- ger represented 256 bit hash of code cell with contract was deployed. Equivalent to GETPARAM 11. |
| STORAGEFEE | GETPARAM | F82C | app_config |  |  |  |  | Returns the Integer x with collected storage fee from account in this transaction. Equivalent to GETPARAM 12. |
| SEQNO | GETPARAM | F82D | app_config |  |  |  |  | Returns the Integer x with current sequence number of collating block. |
| CONFIGDICT |  | F830 | app_config | CONFIGDICT | - D 32 | 26 | #F830 | Returns the global configuration dictionary along with its key length (32).
Equivalent to `CONFIGROOT` `32 PUSHINT`. |
| CONFIGPARAM |  | F832 | app_config | CONFIGPARAM | i - c -1 or 0 |  | #F832 | Returns the value of the global configuration parameter with integer index `i` as a _Cell_ `c`, and a flag to indicate success.
Equivalent to `CONFIGDICT` `DICTIGETREF`. |
| CONFIGOPTPARAM |  | F833 | app_config | CONFIGOPTPARAM | i - c^? |  | #F833 | Returns the value of the global configuration parameter with integer index `i` as a _Maybe Cell_ `c^?`.
Equivalent to `CONFIGDICT` `DICTIGETOPTREF`. |
| GETGLOBVAR |  | F840 | app_global | GETGLOBVAR | k - x | 26 | #F840 | Returns the `k`-th global variable for `0 <= k < 255`.
Equivalent to `c7 PUSHCTR` `SWAP` `INDEXVARQ`. |
| GETGLOB |  | F85_k | app_global | [k] GETGLOB | - x | 26 | #F85_ k:(## 5) {1 <= k} | Returns the `k`-th global variable for `1 <= k <= 31`.
Equivalent to `c7 PUSHCTR` `[k] INDEXQ`. |
| SETGLOBVAR |  | F860 | app_global | SETGLOBVAR | x k - | 26+|c7’| | #F860 | Assigns `x` to the `k`-th global variable for `0 <= k < 255`.
Equivalent to `c7 PUSHCTR` `ROTREV` `SETINDEXVARQ` `c7 POPCTR`. |
| SETGLOB |  | F87_k | app_global | [k] SETGLOB | x - | 26+|c7’| | #F87_ k:(## 5) {1 <= k} | Assigns `x` to the `k`-th global variable for `1 <= k <= 31`.
Equivalent to `c7 PUSHCTR` `SWAP` `k SETINDEXQ` `c7 POPCTR`. |
| HASHCU |  | F900 | app_crypto | HASHCU | c - x | 26 | #F900 | Computes the representation hash of a _Cell_ `c` and returns it as a 256-bit unsigned integer `x`. Useful for signing and checking signatures of arbitrary entities represented by a tree of cells. |
| HASHSU |  | F901 | app_crypto | HASHSU | s - x | 526 | #F901 | Computes the hash of a _Slice_ `s` and returns it as a 256-bit unsigned integer `x`. The result is the same as if an ordinary cell containing only data and references from `s` had been created and its hash computed by `HASHCU`. |
| SHA256U |  | F902 | app_crypto | SHA256U | s - x | 26 | #F902 | Computes `Sha` of the data bits of _Slice_ `s`. If the bit length of `s` is not divisible by eight, throws a cell underflow exception. The hash value is returned as a 256-bit unsigned integer `x`. |
| CHKSIGNU |  | F910 | app_crypto | CHKSIGNU | h s k - ? | 26 | #F910 | Checks the Ed25519-signature `s` of a hash `h` (a 256-bit unsigned integer, usually computed as the hash of some data) using public key `k` (also represented by a 256-bit unsigned integer).
The signature `s` must be a _Slice_ containing at least 512 data bits; only the first 512 bits are used. The result is `-1` if the signature is valid, `0` otherwise.
Notice that `CHKSIGNU` is equivalent to `ROT` `NEWC` `256 STU` `ENDC` `ROTREV` `CHKSIGNS`, i.e., to `CHKSIGNS` with the first argument `d` set to 256-bit _Slice_ containing `h`. Therefore, if `h` is computed as the hash of some data, these data are hashed _twice_, the second hashing occurring inside `CHKSIGNS`. |
| CHKSIGNS |  | F911 | app_crypto | CHKSIGNS | d s k - ? | 26 | #F911 | Checks whether `s` is a valid Ed25519-signature of the data portion of _Slice_ `d` using public key `k`, similarly to `CHKSIGNU`. If the bit length of _Slice_ `d` is not divisible by eight, throws a cell underflow exception. The verification of Ed25519 signatures is the standard one, with `Sha` used to reduce `d` to the 256-bit number that is actually signed. |
| CDATASIZEQ |  | F940 | app_misc | CDATASIZEQ | c n - x y z -1 or 0 |  | #F940 | Recursively computes the count of distinct cells `x`, data bits `y`, and cell references `z` in the dag rooted at _Cell_ `c`, effectively returning the total storage used by this dag taking into account the identification of equal cells. The values of `x`, `y`, and `z` are computed by a depth-first traversal of this dag, with a hash table of visited cell hashes used to prevent visits of already-visited cells. The total count of visited cells `x` cannot exceed non-negative _Integer_ `n`; otherwise the computation is aborted before visiting the `(n+1)`-st cell and a zero is returned to indicate failure. If `c` is _Null_, returns `x=y=z=0`. |
| CDATASIZE |  | F941 | app_misc | CDATASIZE | c n - x y z |  | #F941 | A non-quiet version of `CDATASIZEQ` that throws a cell overflow exception (8) on failure. |
| SDATASIZEQ |  | F942 | app_misc | SDATASIZEQ | s n - x y z -1 or 0 |  | #F942 | Similar to `CDATASIZEQ`, but accepting a _Slice_ `s` instead of a _Cell_. The returned value of `x` does not take into account the cell that contains the slice `s` itself; however, the data bits and the cell references of `s` are accounted for in `y` and `z`. |
| SDATASIZE |  | F943 | app_misc | SDATASIZE | s n - x y z |  | #F943 | A non-quiet version of `SDATASIZEQ` that throws a cell overflow exception (8) on failure. |
| FIND_BY_INIT_CODE_HASH |  | F944 |  |  |  |  |  | Returns the list of accounts with initial code hash specified in 256 bit of Slice s |
| FIND_BY_CODE_HASH |  | F945 |  |  |  |  |  | Returns the list of accounts with code hash specified in 256 bit of Slice s. |
| FIND_BY_DATA_HASH |  | F946 |  |  |  |  |  | Returns the list of accounts with data hash specified in 256 bit of Slice s. |
| RESERVED |  | F947–F97F |  |  |  |  |  | Reserved for miscellaneous TON-specific primitives that do not fall into any other specific category. |
| TRYELECT |  | F950 |  |  |  |  |  | Executes try_elect method for accounts got by config param 30. D is the input Hashmap with credits, c - contains serialized validator set, c′ is the HashmapE with frozen stakes, D′ is the HashmapE with credits, x is the integer with total stake, x′ is the integer with total weight |
| LDGRAMS |  | FA00 | app_currency | LDGRAMS
LDVARUINT16 | s - x s' | 26 | #FA00 | Loads (deserializes) a `Gram` or `VarUInteger 16` amount from _CellSlice_ `s`, and returns the amount as _Integer_ `x` along with the remainder `s'` of `s`. The expected serialization of `x` consists of a 4-bit unsigned big-endian integer `l`, followed by an `8l`-bit unsigned big-endian representation of `x`.
The net effect is approximately equivalent to `4 LDU` `SWAP` `3 LSHIFT#` `LDUX`. |
| LDVARINT16 |  | FA01 | app_currency | LDVARINT16 | s - x s' | 26 | #FA01 | Similar to `LDVARUINT16`, but loads a _signed_ _Integer_ `x`.
Approximately equivalent to `4 LDU` `SWAP` `3 LSHIFT#` `LDIX`. |
| STGRAMS |  | FA02 | app_currency | STGRAMS
STVARUINT16 | b x - b' | 26 | #FA02 | Stores (serializes) an _Integer_ `x` in the range `0...2^120-1` into _Builder_ `b`, and returns the resulting _Builder_ `b'`. The serialization of `x` consists of a 4-bit unsigned big-endian integer `l`, which is the smallest integer `l>=0`, such that `x<2^(8l)`, followed by an `8l`-bit unsigned big-endian representation of `x`. If `x` does not belong to the supported range, a range check exception is thrown. |
| STVARINT16 |  | FA03 | app_currency | STVARINT16 | b x - b' | 26 | #FA03 | Similar to `STVARUINT16`, but serializes a _signed_ _Integer_ `x` in the range `-2^119...2^119-1`. |
| LDMSGADDR |  | FA40 | app_addr | LDMSGADDR | s - s' s'' | 26 | #FA40 | Loads from _CellSlice_ `s` the only prefix that is a valid `MsgAddress`, and returns both this prefix `s'` and the remainder `s''` of `s` as _CellSlice_s. |
| LDMSGADDRQ |  | FA41 | app_addr | LDMSGADDRQ | s - s' s'' -1 or s 0 | 26 | #FA41 | A quiet version of `LDMSGADDR`: on success, pushes an extra `-1`; on failure, pushes the original `s` and a zero. |
| PARSEMSGADDR |  | FA42 | app_addr | PARSEMSGADDR | s - t | 26 | #FA42 | Decomposes _CellSlice_ `s` containing a valid `MsgAddress` into a _Tuple_ `t` with separate fields of this `MsgAddress`. If `s` is not a valid `MsgAddress`, a cell deserialization exception is thrown. |
| PARSEMSGADDRQ |  | FA43 | app_addr | PARSEMSGADDRQ | s - t -1 or 0 | 26 | #FA43 | A quiet version of `PARSEMSGADDR`: returns a zero on error instead of throwing an exception. |
| REWRITESTDADDR |  | FA44 | app_addr | REWRITESTDADDR | s - x y | 26 | #FA44 | Parses _CellSlice_ `s` containing a valid `MsgAddressInt` (usually a `msg_addr_std`), applies rewriting from the `anycast` (if present) to the same-length prefix of the address, and returns both the workchain `x` and the 256-bit address `y` as _Integer_s. If the address is not 256-bit, or if `s` is not a valid serialization of `MsgAddressInt`, throws a cell deserialization exception. |
| REWRITESTDADDRQ |  | FA45 | app_addr | REWRITESTDADDRQ | s - x y -1 or 0 | 26 | #FA45 | A quiet version of primitive `REWRITESTDADDR`. |
| REWRITEVARADDR |  | FA46 | app_addr | REWRITEVARADDR | s - x s' | 26 | #FA46 | A variant of `REWRITESTDADDR` that returns the (rewritten) address as a _Slice_ s, even if it is not exactly 256 bit long (represented by a `msg_addr_var`). |
| REWRITEVARADDRQ |  | FA47 | app_addr | REWRITEVARADDRQ | s - x s' -1 or 0 | 26 | #FA47 | A quiet version of primitive `REWRITEVARADDR`. |
| SENDRAWMSG |  | FB00 | app_actions | SENDRAWMSG | c x - | 526 | #FB00 | Sends a raw message contained in _Cell `c`_, which should contain a correctly serialized object `Message X`, with the only exception that the source address is allowed to have dummy value `addr_none` (to be automatically replaced with the current smart-contract address), and `ihr_fee`, `fwd_fee`, `created_lt` and `created_at` fields can have arbitrary values (to be rewritten with correct values during the action phase of the current transaction). Integer parameter `x` contains the flags. Currently `x=0` is used for ordinary messages; `x=128` is used for messages that are to carry all the remaining balance of the current smart contract (instead of the value originally indicated in the message); `x=64` is used for messages that carry all the remaining value of the inbound message in addition to the value initially indicated in the new message (if bit 0 is not set, the gas fees are deducted from this amount); `x'=x+1` means that the sender wants to pay transfer fees separately; `x'=x+2` means that any errors arising while processing this message during the action phase should be ignored. Finally, `x'=x+32` means that the current account must be destroyed if its resulting balance is zero. This flag is usually employed together with `+128`. |
| RAWRESERVE |  | FB02 | app_actions | RAWRESERVE | x y - | 526 | #FB02 | Creates an output action which would reserve exactly `x` nanograms (if `y=0`), at most `x` nanograms (if `y=2`), or all but `x` nanograms (if `y=1` or `y=3`), from the remaining balance of the account. It is roughly equivalent to creating an outbound message carrying `x` nanograms (or `b-x` nanograms, where `b` is the remaining balance) to oneself, so that the subsequent output actions would not be able to spend more money than the remainder. Bit `+2` in `y` means that the external action does not fail if the specified amount cannot be reserved; instead, all remaining balance is reserved. Bit `+8` in `y` means `x:=-x` before performing any further actions. Bit `+4` in `y` means that `x` is increased by the original balance of the current account (before the compute phase), including all extra currencies, before performing any other checks and actions. Currently `x` must be a non-negative integer, and `y` must be in the range `0...15`. |
| RAWRESERVEX |  | FB03 | app_actions | RAWRESERVEX | x D y - | 526 | #FB03 | Similar to `RAWRESERVE`, but also accepts a dictionary `D` (represented by a _Cell_ or _Null_) with extra currencies. In this way currencies other than Grams can be reserved. |
| SETCODE |  | FB04 | app_actions | SETCODE | c - | 526 | #FB04 | Creates an output action that would change this smart contract code to that given by _Cell_ `c`. Notice that this change will take effect only after the successful termination of the current run of the smart contract. |
| SETLIBCODE |  | FB06 | app_actions | SETLIBCODE | c x - | 526 | #FB06 | Creates an output action that would modify the collection of this smart contract libraries by adding or removing library with code given in _Cell_ `c`. If `x=0`, the library is actually removed if it was previously present in the collection (if not, this action does nothing). If `x=1`, the library is added as a private library, and if `x=2`, the library is added as a public library (and becomes available to all smart contracts if the current smart contract resides in the masterchain); if the library was present in the collection before, its public/private status is changed according to `x`. Values of `x` other than `0...2` are invalid. |
| CHANGELIB |  | FB07 | app_actions | CHANGELIB | h x - | 526 | #FB07 | Creates an output action similarly to `SETLIBCODE`, but instead of the library code accepts its hash as an unsigned 256-bit integer `h`. If `x!=0` and the library with hash `h` is absent from the library collection of this smart contract, this output action will fail. |
| COPYLEFT |  | FB0A | app_actions |  |  |  |  | Where s - is slice of 256-bit Accoun- tId and x - is type of license. Add license payment to code cre- ator. The license payment calculates from compute_phase_fees tak- ing the appropriate percentage. If summary payment is less than li- cense_payment_threshold, then value saves in unsplit_shard_state of masterblock. If summary payment in unsplit_shard_state is more than license_payment_threshold then node sends internal message to account address in masterchain, specified in slice s. The instruction return an error on contracts in masterchain. |
|  |  | FB08–FB3F | app_actions |  |  |  |  | Reserved for output action primitives |
| DEBUG |  | FEnn | debug | {nn} DEBUG | - | 26 | #FE nn:(#<= 239) | `0 <= nn < 240` |
| DEBUGSTR |  | FEFnssss | debug | {string} DEBUGSTR
{string} {x} DEBUGSTRI | - | 26 | #FEF n:(## 4) ssss:((n * 8 + 8) * Bit) | `0 <= n < 16`. Length of `ssss` is `n+1` bytes.
`{string}` is a [string literal](https://github.com/Piterden/TON-docs/blob/master/Fift.%20A%20Brief%20Introduction.md#user-content-29-string-literals).
`DEBUGSTR`: `ssss` is the given string.
`DEBUGSTRI`: `ssss` is one-byte integer `0 <= x <= 255` followed by the given string. |
| DUMPSTK | DEBUG | FE00 | debug | DUMPSTK | - | 26 | #FE00 | Dumps the stack (at most the top 255 values) and shows the total stack depth. |
| DUMP | DEBUG | FE2i | debug | s[i] DUMP | - | 26 | #FE2 i:uint4 | Dumps `s[i]`. |
| SETCP |  | FFnn | codepage | [nn] SETCP | - | 26 | #FF nn:(#<= 239) | Selects TVM codepage `0 <= nn < 240`. If the codepage is not supported, throws an invalid opcode exception. |
| SETCP0 | SETCP | FF00 | codepage | SETCP0 | - | 26 | #FF00 | Selects TVM (test) codepage zero as described in this document. |
| SETCP_SPECIAL |  | FFFz | codepage | [z-16] SETCP | - | 26 | #FFF z:(## 4) {1 <= z} | Selects TVM codepage `z-16` for `1 <= z <= 15`. Negative codepages `-13...-1` are reserved for restricted versions of TVM needed to validate runs of TVM in other codepages. Negative codepage `-14` is reserved for experimental codepages, not necessarily compatible between different TVM implementations, and should be disabled in the production versions of TVM. |
| SETCPX |  | FFF0 | codepage | SETCPX | c - | 26 | #FFF0 | Selects codepage `c` with `-2^15 <= c < 2^15` passed in the top of the stack. |
