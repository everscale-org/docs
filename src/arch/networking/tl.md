---
sidebar_position: 1
---

# TL

TL (Type Language) is used for describing data structures. To structure data, [TL schemes](https://github.com/ton-blockchain/ton/tree/master/tl/generate/scheme) are used. TL operates with 32-bit blocks. Accordingly, the size of the data in TL should be a multiple of 4 bytes. If the size of the object is not a multiple of 4, we need to add the required number of zero bytes to achieve multiplicity. The Little Endian order is always used to encode numbers.

TL can be studied in more detail in the [Telegram documentation](https://core.telegram.org/mtproto/TL).

### Encoding bytes in TL

To encode an array of bytes, we first need to determine its size. If it is less than 254 bytes, then encoding with 1 byte is used as size. If it is larger, then `0xFE` is written as the first byte, as an indicator of a large array, and then 3 bytes of size follow it.

For example, we encode an array `[0xAA, 0xBB]`, its size is 2. We use 1 byte of size and then we write the data ourselves, we get `[0x02, 0xAA, 0xBB]`. That's it! However, we see that the final size is 3 and not a multiple of 4 bytes, then we need to add 1 byte of padding so that there is 4. We get: `[0x02, 0xAA, 0xBB, 0x00]`.

If we need to encode an array whose size is, for example, 396, we proceed as follows: 396 >= 254, which means we use 3 bytes to encode the size and 1 byte of the increased size indicator, we get: `[0xFE, 0x8C, 0x01, 0x00, array bytes]`, 396+4 = 400, which is a multiple of 4 and does not need to be adjusted.

### Non-obvious rules of serialization

Often, a prefix of 4 bytes is written before the scheme itself - its ID. The schema ID is a CRC32 with an IEEE table from the schema text, while characters such as `;` and brackets `()` are removed from the text. Serialization of a scheme with an ID prefix is called boxed. This allows the parser to determine which scheme is in front of it if several options are possible.

How to determine whether to serialize as boxed or not? If our schema is part of another schema, then we need to see how the field type is specified.  If it is specified explicitly, then we serialize without a prefix. If not explicitly (there are many such types), then we need to serialize as boxed. Example:

```
pub.unenc data:bytes = PublicKey;
pub.ed25519 key:int256 = PublicKey;
pub.aes key:int256 = PublicKey;
pub.overlay name:bytes = PublicKey;
```

We have such types. If `PublicKey` is specified in the schema, for example, `adnl.node` `id:PublicKey addr_list:adnl.AddressList = adnl.Node`, then it is not explicitly specified and we need to serialize with the ID prefix (boxed). And if it were specified like this: `adsl.node id:pub.ed25519 addr_list:all.address List = add.Node`, then it would be explicit, and the prefix would not be needed.