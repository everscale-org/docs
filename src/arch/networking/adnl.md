---
sidebar_position: 2
---

# ADNL

The key element of Eversale is the Abstract Datagram Network Layer (ADNL).It allows all nodes to assume certain network identities, represented by 256-bit abstract network addresses. They communicate via sending datagrams to each other using only these 256-bit network addresses to identify both the sender and the receiver. In particular, one does not need to worry about IPv4 or IPv6 addresses, UDP port numbers, and the like. They are hidden by the Abstract Network Layer.Each datagram is signed and encrypted by the sender. Only the recipient has the possibility to decrypt the message and verify its integrity via signatures.

### Address

An ADNL address is equal to a 256-bit ECC public key. In turn, this public key can be randomly generated. This way, there is the possibility to create as many different network identities as the node requires. Still, there is the need to know the corresponding private key to be able to receive and decrypt messages intended for the recipient's address.

Practically, the ADNL address is not the public key itself. It is a 256-bit SHA 256 hash of a serialized TL-object that can describe several types of public keys and addresses depending on its constructor.

:::tip Tip

A TCP-like stream protocol can be built over ADNL

:::

## Neighbor tables

Practically, an Everscle ADNL node will have a so-called **“neighbor table”**. It includes the information about other known nodes: abstract addresses, public keys, IP addresses and UDP ports. 

With time, it will constantly extend this table using the information accumulated from these known nodes. This new information can be in the form of answers to special queries or sometimes the removal of obsolete records.

### Peer Identity

Each peer must have at least one identity. Although, there is the possibility to use multiple. Each identity is a key pair, which is used to perform the Diffie-Hellman between peers. An abstract network address is derived from the public key as follows:

`address = SHA-256(type_id || public_key). Note that type_id must be serialized as little-endian uint32`

## Client-server protocol 

The client connects to the server via TCP and sends an ADNL handshake packet. It contains a server abstract address, a client public key and encrypted AES-CTR session parameters - determined by the client.

### Initiating communications - Handshakes

Initially, the client must perform a key agreement protocol. For instance, x25519 with the help of both the private key and server public key - considering server key **type_id**. Accordingly, the client will get a secret, which is used to encrypt session keys in upcoming steps.

Then, the client has to generate AES-CTR session parameters, a 16-byte nonce and 32-byte key, both for **TX (client->server)** and **RX (server->client)** directions and serialize it into a 160-byte buffer as follows:

| Parameter |   Size   |
|:---------:|:--------:|
| rx_key    | 32 bytes |
| tx_key    | 32 bytes |
| rx_nonce  | 16 bytes |
| tx_nonce  | 16 bytes |
| padding   | 64 bytes |

### Padding

It is not used by server implementations. However, It is recommended to fill the whole 160-byte buffer with random bytes. If not, an attacker may conduct a MitM assault via compromised AES-CTR session parameters.

The next step is to encrypt session parameters using secret via the key agreement protocol. For this, AES-256 must be initialized in CTR mode with a 128-bit big-endian counter with the help of a key and nonce pair which is computed as in the example below:

```
hash = SHA-256(aes_params)
key = secret[0..16] || hash[16..32]
nonce = hash[0..4] || secret[20..32]
```

:::tip Tip

`aes_params` is a 160-byte buffer

:::

After the encryption of **aes_params**, noted as **E(aes_params)**, AES should be removed because it is not needed anymore.

Now we are ready to serialize all the information to the 256-byte handshake package and send it to the server:

|      Parameter      |    Size   |                              Notes                             |
|:-------------------:|:---------:|:--------------------------------------------------------------:|
| receiver_address    | 32 bytes  | Server peer identity as described in the corresponding section |
| sender_public       | 32 bytes  | Client public key                                              |
| SHA-256(aes_params) | 32 bytes  | Integrity proof of session parameters                          |
| E(aes_params)       | 160 bytes | Encrypted session parameters                                   |

The server decrypts session parameters using a secret, derived from the key agreement protocol, in the same way as the client. Then the server conducts the checks outlined below to confirm protocol security properties:

1. The server must have the private key for receiver_address. Without it, there is no other way to perform the key agreement protocol.
2. SHA-256(aes_params) == SHA-256(D(E(aes_params))). In case it is not so, the key agreement protocol failed, and the secret is not the same on both sides.

In case one of the checks fails, the server will in a instant stop the connection. On the other hand, in case both checks pass, the server will issue an empty datagram to the client in order to prove that it owns the private key for the specified receiver_address.

### Datagram

Both the client and server must initialize two AES-CTR instances each, for TX and RX directions. AES-256 must be used in CTR mode with a 128-bit big-endian counter. Each AES instance is initialized using a key and nonce pair belonging to it, which can be taken from aes_params in the handshake.

To send a datagram, a peer must build the structure shown below. Afterwards, it must be encrypted and sent to the receiver:

| Parameter |        Size       |                         Notes                        |
|:---------:|:-----------------:|:----------------------------------------------------:|
| length    | 4 bytes (LE)      | Length of the whole datagram, excluding length field |
| nonce     | 32 bytes          | Random value                                         |
| buffer    | length - 64 bytes | Actual data to be sent to the other side             |
| hash      | 32 bytes          | SHA-256(nonce \|\| buffer) to ensure integrity       |

The structure must be encrypted with the help of the AES instance **(TX for client -> server, RX for server -> client)**.

The receiver must fetch the first 4 bytes, decrypt them into the length field and read exactly the length of the bytes to get the full datagram. The receiver may start to decrypt and process the buffer earlier. However, it must consider that it may be corrupted, even unintentionally. The datagram hash must be checked to ensure the integrity of the buffer. In the event of failure, no new datagrams can be issued and the connection must be abandoned.

The first datagram in the session always goes from the server to the client. It happens after a handshake package is accepted by the server and it's actual buffer is empty. In the event of failure, the client must decrypt it and drop the connection with the server. The reason is that the server has not followed the protocol accordingly. Correspondingly, actual session keys differ on the server and client side.

## Security considerations​

### Handshake padding​

`aes_params` integrity is protected by a SHA-256 hash. The confidentiality, in turn, is protected by the key derived from the `secret` parameter. Possibly, it works this way due to initial TON developers thinking of migrating from AES-CTR at some point. 

To do this, the specification may be extended to include a special magic value in `aes_params`, which will signal that the peer is ready to use the updated primitives. The response to such a handshake may be decrypted twice: with new and old schemes. This is needed in order to to clarify which scheme the other peer is actually using.

### Session parameters encryption key derivation process​

The encryption key will be static in case it is derived only from the `secret` parameter. This is due to the fact that the secret is static. To derive a new encryption key for each session, `SHA-256(aes_params)` is used. It is random if `aes_params` is random. It should be noted that the current key derivation algorithm linking different subarrays is considered poor.

### Datagram nonce

The `nonce` field necessity in the datagram is not obvious. Any two ciphertexts would be distinguished due to the session-bounded keys for AES and encryption in CTR mode even in case of its absence. 

With this in mind, however, the attack described below can be realized if there isn’t a `nonce` field or it is poor.

CTR encryption turns block ciphers, such as AES, into stream ciphers to make a bit-flipping attack possible. In case the attacker is in possession of the plaintext which belongs to an encrypted datagram, he can easily obtain a pure keystream. Then, XOR it with his own plaintext and replace the message which was sent by a peer. We remember that buffer integrity is protected by a SHA-256 hash. However, an attacker can replace it too. This is because knowing a full plaintext means knowing its hash. The `nonce` field is there to prevent such an attack. No attacker can replace the SHA-256 without knowing the `nonce`.