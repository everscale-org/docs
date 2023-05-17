# Catchain Protocol Messages & Structures

Catchain protocol consists of:

- incoming event `catchain.blockUpdate`;
- required outgoing queries `catchain.getBlock` and `catchain.getDifference`;
- optional outgoing queries (not used in the catchain component itself, but might be sent externally): `catchain.getBlocks, catchain.getBlockHistory;`
- queries responses: `catchain.BlockResult, catchain.Sent, catchain.Difference;`
- internal structures that can be used in all events and queries above.

Main flows:

1. Validator synchronization request:
2. validator periodically and randomly updates the list of neighbour validators (see the description above);
3. validator periodically chooses one random validator from a list of neighbor validators (see description above) and sends to it:
4. `catchain.getDifference` request with a list of heights for blocks already delivered to validator-requester;
5. `catchain.getBlock` request for a top block's dependencies (in terms of height) which is received but not fully resolved (not all dependencies are received by a validator); validator randomly chooses up to 16 dependencies for a top block and sends a catchain.getBlock request for each of them.
6. Validator synchronization events processing:
7. validator receives incoming `catchain.blockUpdate` events and updates the internal block's data structures.
8. Validator forks event processing:
9. validator receives an incoming `catchain.differenceFork` event, checks the fork proof and marks the counterparty validator that sent fork as blamed; so all data from this validator will be discarded; additionally, the same height block received from this validator (fork block) will be marked as "ill" as well as all dependent blocks from it.
10. Consensus iteration
- each **catchain.blockUpdate** may lead to the decision where one or several catchain blocks on the top of counter-party validators’ are fully resolved (meaning these blocks will have enough data including dependencies to be used in consensus calculations);
- a validator randomly chooses up to `CatChainOptions::max_deps`(equal to 4 for now) top blocks from different counter-party validators and sends them for further processing to the validator session component;
- the validator session component merges such dependencies and gets a new merged state;
- according to the new state, the validator session component generates incremental messages that transform the state before the merge (previous block) to a state after merge (new block). This batch of messages is included as a payload to a Catchain structure `catchain.block.data.vector` and is used as a new Catchain block data: The height of a catchain block is equal to the iteration index increased sequentially after each consensus iteration;
- the new Catchain block is stored on the current validator without being immediately sent to other validators, so counter-party validators have to request current validator for blocks update using the `catchain.getDifference` request to obtain computed blocks (pull model).

## Internal structures:

**1.`catchain.block.dep`**

- `src`: `int` - index of validator that generated the block;
- `height` : `int` - height of the block on a validator with index `src`;
- `data_hash` : `int256` - block data hash; used in block pre-validation;
- `signature` : `bytes` - signature done by a validator with index `src` of the block; needed for pre-validation of the block.

**2.`catchain.block.data`**

This structure describes the block with links to the previous block on the validator and dependent blocks used to generate the current one. For the specified (`src`, `height`) there can be only one previous block in a Catchain. If forks are detected, the validator that sent the second block candidate for specified (`src`, `height`) is marked as blamed and all its data is discarded. The `catchain.block.data` structure described below:

- `prev` : `catchain.block.dep` ****- previous block description;
- `deps` : `vector of catchain.block.dep` - list of dependent blocks used to generate this block.

**3.`catchain.block`**

This structure describes a block with a payload.

- `incarnation` : `int256` - ID of the Catchain session equal to the hash of the first block used at the start of Catchain session;
- `src` : `int` - index of the validator that generated the block;
- `height` : `int` - height of the block on a validator with index `src`;
- `data`: `catchain.block.data` - block header with information about the previous block and dependent blocks used to generate the current block.

**4.`catchain.block.inner.Data`**

This is a variable structure with one of the following subtypes: `catchain.block.data.badBlock`, `catchain.block.data.fork`, `catchain.block.data.nop`, `catchain.block.data.vector`. This structure is placed immediately after the `catchain.block` structure and contains the corresponding block payload.

- **`catchain.block.data.vector`**
- This message contains the internal validator session component data represented by a list of messages specific for a validator session. The `catchain.block.data.vector` structure is used as a container to distribute consensus algorithm data between validators.
- `msgs`: `vector of bytes` - internal validator session data (is used as a buffer of bytes for Catchain component).
- **`catchain.block.data.fork`**
- This message contains fork proofs for a specified pair of blocks. When two blocks with different hashes, but the same `height` are received from a validator with index `src`, a fork is detected. In this case, the validator in question must be blamed and all incoming data from it must be discarded. All blocks dependent on a detected fork must be discarded.
- `left` : `catchain.block.Dep` - first known block;
- `right`: `catchain.block.Dep` - detected fork block.
- **`catchain.block.data.badBlock`**
- Reserved and is not used at the moment
- **`catchain.block.data.nop`**
- Reserved and is not used at the moment

Events:

**1. `catchain.blockUpdate`**

This event informs the validator that a specific block is updated. The validator then has to add it to the processing queue, check for forks and check all upstream and downstream block dependencies. Dependency checks may result in one or multiple block status updates. Once fully resolved, a block can be used as a source for state computation of the next consensus iteration. A validator session iteration uses a random subset of fully resolved blocks (blocks having all dependent blocks received and pre-validated by the current validator). This subset contains blocks from different validators for further merging and building a new Catchain block according to the resulting merged state. `catchain.blockUpdate` has the following structure:

- `block` : `catchain.block` - block description with a mandatory `catchain.block.inner.Data` payload.
- `signature` : `bytes` - block signature performed by a validator (with validator index `block.src`); used for block pre-validation.

Queries:

**1. `catchain.getBlock`** (mandatory)

This query is used by the catchain component to request an absent block from another validator.

- Request:
- `block` : `int256` - hash of the requested block;
- Response — **`catchain.BlockResult`** (variadic):
- **`catchain.blockResult**` sent if the block is found
- `block` : `catchain.block` - description of the requested block with `catchain.block.inner.Data`payload
- **`catchain.blockNotFound`** - sent if the block is not found

**2.`catchain.getBlocks`** (optional; not used by Catchain component internally)

This query is used to request several blocks from another validator.

- Request:
- `blocks` : `vector int256` - the list of requested blocks;
- Response — **`catchain.sent`**:
- `cnt` : `int` - the number of blocks sent back.
- Side effect:
- Several **`catchain.blockUpdate**` events are sent back to the validator-requester before response.

**3.`catchain.getDifference`** (mandatory)

This is the initial request sent by one validator to another one to receive absent blocks. The validator-requester sends а list of delivered heights to the counter-party and expects to get back blocks that were not delivered (difference). Initially, the validator-requester may send a list of zero heights to the counter-party to initiate synchronization of blocks. Also, the `catchain.getDifference` request should be regularly made to neighbor validators to synchronize with them.

- Request:
- `rt` : `vector int` - the list of heights of blocks already delivered to a validator-requester.
- Response — **`catchain.Difference`** (variadic):
- **`catchain.difference**` sent when no forks are detected (regular case)
- `sent_upto`: `vector int` - the vector of heights known on a validator-responder; not used in a Catchain component now;
- **`catchain.differenceFork`** - sent when forks are detected
- `left` : `catchain.block.dep` - the first known block;
- `right` : `catchain.block.dep` - the detected fork block.
- Side effect:
- Several **`catchain.blockUpdate`** events sent back to a validator-requester before response **`catchain.difference`.**

**4.`catchain.getBlockHistory`** (optional, not used by the Catchain component internally)

This query is used to obtain blocks used to build a block with a specified reverse height (number of blocks reverse to the specified block).

- Request:
- `block` : `int256` - the target block hash;
- `height` : `long` - the number predecessor blocks of the `block`;
- `stop_if` : `vector int256` - list of block hashes which should stop search if one of them is detected during the history processing.
- Response — **`catchain.sent`**:
- `cnt` : `int` - the number of blocks sent back.

## References

1. Pease, Marshall; Shostak, Robert; Lamport, Lesli Reaching Agreement in the Presence of Faults, [https://dl.acm.org/doi/10.1145/322186.322188](https://dl.acm.org/doi/10.1145/322186.322188)
2. Yuval Marcus, Ethan Heilman, Sharon Goldberg. Low-Resource Eclipse Attackson Ethereum’s Peer-to-Peer Network, [https://eprint.iacr.org/2018/236.pdf](https://eprint.iacr.org/2018/236.pdf)
3. Ethan Buchman, Tendermint: Byzantine Fault Tolerance in the Age of Blockchains, [https://atrium.lib.uoguelph.ca/xmlui/bitstream/handle/10214/9769/Buchman_Ethan_201606_MAsc.pdf](https://atrium.lib.uoguelph.ca/xmlui/bitstream/handle/10214/9769/Buchman_Ethan_201606_MAsc.pdf)
4. Miguel Castro and Barbara Liskov. Practical Byzantine Fault Tolerance, [http://pmg.csail.mit.edu/papers/osdi99.pdf](http://pmg.csail.mit.edu/papers/osdi99.pdf)
5. Aggelos Kiayias, Alexander Russell, Bernardo David, Roman Oliynykov. Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol, [https://eprint.iacr.org/2016/889.pdf](https://eprint.iacr.org/2016/889.pdf)
6. V. Zamfir, “Casper the friendly ghost: A correct by constructionblockchain consensus protocol,” [https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf](https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf)
7. Jing Chen, Silvio Micali. Algorand, [https://arxiv.org/pdf/1607.01341.pdf](https://arxiv.org/pdf/1607.01341.pdf)