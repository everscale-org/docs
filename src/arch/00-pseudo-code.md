---
title: Pseudo-code
description: The pseudo-code language we use to define the behavior
---

# Pseudo-code Semantics

A few words about the pseudo-code language we use to define the behavior of the Architecture parts.

The language used is Python-like, with nearly intuitive semantics.

We would like to highlight the following:

- For basic values like `Ints` and `Bools`, the assignment operator copies the value.
- For complex data types (objects), the assignment operator copies a reference to the object instead of creating a new instance.
- The call `obj.clone()` creates a deep copy of the object `obj`.
- The input arguments are passed by reference, so, mutating them within the function would mutate them for the caller also.
- Sometimes, the default value is irrelevant and not specified explicitly. Default values for structure fields are:
    - `0` for `Ints`
    - `False` for `Bools`
    - `None` for `Option`
    - For `Enum` types, the default value is the first item in the enumeration.
- In few places, we use idiomatic `Python` values swap: `a, b = b, a` This construct exchanges the values of `a` and `b`.
- The object method syntax is used in few places, for example: `obj.method(p1, p2,...) = method(obj, p1, p2,...)`.
- Types and namespaces begin with uppercase letter, for example: `TransactionExecutor.TrExecutorError()` denotes the object `TrExecutorError` residing in the namespace `TransactionExecutor`
- We use **is** operator to do type test. For example, to test that message is internal, we use the following construct:

```python
if in_msg.header is IntMsgInfo:
return ExecuteInternalMessage(in_msg, ...)
```

- We omit details of some global objects, and just assume they exist. For example, the virtual machine is created using some abstract _TVM_ object. The same goes for system error enumerations. It is done this way not to overload the pseudo-code with easily recoverable details.
