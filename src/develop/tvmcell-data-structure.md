---
sidebar_position: 4
---

# TVMCell Data structures

Everything in Everscale is stored in cells. A cell is a data structure containing:

- up to **1023 bits** of data (not bytes!)
- up to **4 references** to other cells

Bits and references are not intermixed (they are stored separately). Circular references are forbidden: for any cell, none of its descendant cells can have this original cell as reference.

Thus, all cells constitute a directed acyclic graph (DAG).

A cell is an opaque object optimized for compact storage.

In particular, it deduplicates data: if there are several eqivalent sub-cells referenced in different branches, their content is only stored once. However, opaqueness means that a cell cannot be modified or read directly.

Thus, there are 2 additional flavors of the cells:

- *Builder* for partially constructed cells, for which fast operations for appending bitstrings, integers, other cells and references to other cells can be defined.
- *Slice* for 'dissected' cells representing either the remainder of a partially parsed cell or a value (subcell) residing inside such a cell and extracted from it via a parsing instruction.
- *Continuation* for cells containing op-codes (instructions) for internal use in TVM

Any object in Everscale (message, message queue, block, whole blockchain state, contract code and data) serializes to a cell.

The process of serialization is described by a TL-B scheme: a formal description of how this object can be serialized into *Builder* or how to parse an object of a given type from the *Slice*.

TL-B for cells is the same as TL or ProtoBuf for byte-streams.