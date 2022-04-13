---
title: What is TIP
sidebar_position: 0
---

# What is TIP (TIP-0)

TIP — Trustless Improvement Proposal (TIPs) describe standards for the Everscale blockchain. They may include anything that the community considers in need of improvement or standardization. That can be specifications for core protocol, description of interfaces, smart contract standards and so on.

I propose a more relaxed structure more closely resembling Bitcoin BIPs but with quite different proccess (see below).

Each TIP should have the following parts (which are heavily copy-pasted from BIP requirements):

- Preamble — Headers containing metadata about the TIP;
- Abstract — A short (~200 word) description of the technical issue being addressed;
- Copyright — The TIP must be explicitly licensed under acceptable copyright terms;
- Specification — The technical specification should describe the syntax and semantics of any new feature;
- The specification should be detailed enough to allow competing, interoperable implementations;
- Motivation — The motivation is critical for TIPs that want to change the Everscale protocol. It should clearly explain why the existing protocol is inadequate to address the problem that the TIP solves;
- Rationale — The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work. The rationale should provide evidence of consensus within the community and discuss important objections or concerns raised during discussion;
- Backwards compatibility — All TIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The TIP must explain how the author proposes to deal with these incompatibilities;

Each TIP should pass the following process of acceptance:

`Proposal` → `Discussion` → `Community Voting` → `Reference Implementations Contest` → `Final TIP with Reference Implementations`

- Reference implementation — The reference implementation must be completed before any TIP is given status `Final`, but it need not be completed before the TIP is accepted. It is better to finish the specification and rationale first and reach consensus on it before writing code. The final implementation must include test code and documentation appropriate for the Everscale protocol.
