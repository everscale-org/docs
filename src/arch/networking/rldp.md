---
sidebar_position: 4
---

# RLDP

Reliable Large Datagram Protocol runs on top of ADNL UDP. It is designed for transmitting big data and includes Forward Error Correction (FEC) algorithms. They are used to replace packet receipt confirmations by the other party. This opens the possibility to transfer data between network components more efficiently. Although, with high traffic consumption.

RLDP is largely used in the Everscale infrastructure. For example, to download blocks from other nodes and transfer data to them or to make requests to Everscale sites.

## Protocol

To exchange data, RLDP uses the following TL structures:

```
fec.raptorQ data_size:int symbol_size:int symbols_count:int = fec.Type;
fec.roundRobin data_size:int symbol_size:int symbols_count:int = fec.Type;
fec.online data_size:int symbol_size:int symbols_count:int = fec.Type;

rldp.messagePart transfer_id:int256 fec_type:fec.Type part:int total_size:long seqno:int data:bytes = rldp.MessagePart;
rldp.confirm transfer_id:int256 part:int seqno:int = rldp.MessagePart;
rldp.complete transfer_id:int256 part:int = rldp.MessagePart;

rldp.message id:int256 data:bytes = rldp.Message;
rldp.query query_id:int256 max_answer_size:long timeout:int data:bytes = rldp.Message;
rldp.answer query_id:int256 data:bytes = rldp.Message;
```

The serialized structure is wrapped in an `adsl.message.custom` TL schema and sent over ADNL UDP. The big data is transmitted via transfers. A random `transfer_id` is generated while the data itself is processed by the FEC algorithm. The received pieces are wrapped in the `rldp.MessagePart` structure and sent to the recipient until the recipient returns `rldp.complete`. When the recipient collects the pieces of `rldp.MessagePart` needed to assemble a complete message the following has to be done: connecting them all together, decoding them using FEC and deserializing the resulting byte array into one of the `rldp.query` or `rldp.answer` structures - depending on the type of TL ID prefix.

### FEC

Valid **Forward Error Correction** algorithms to use with RLDP are Round Robin, Online, and Raptor. Currently, Raptor is used for data exchange.

#### Raptor

The essence of **RaptorQ** is that the data is divided into so-called symbols - blocks of the same, predetermined size.4

Blocks, in turn, serve to create matrices, to which discrete mathematical operations are applied. This allows us to create an almost infinite number of characters from the same data. All characters are mixed, and, thanks to this, it is possible to recover lost packets without requesting additional data from the server. This is accomplished by sending fewer packets than it would be if we were to send the same pieces in the cycle.

The generated symbols are sent to the recipient until he says that all data has been received and restored by applying the same discrete operations.

## RLDP-HTTP

HTTP (wrapped in RLDP) is used to interact with Everscale sites. The hoster places his site on any HTTP web server and raises the rldp-http proxy next to it. All requests from the Everscale network come via the RLDP protocol to the proxy, and the proxy already reassembles the request into regular HTTP and calls the web server locally.

:::tip Tip

The user on his side locally (ideally) raises a proxy, for example Tonutils Proxy, and uses .ton, all traffic is wrapped in reverse order, requests go to the local proxy, and it sends them via RLDP to the remote TON site.

:::

HTTP inside RLDP is implemented using TL structures:

```
http.header name:string value:string = http.Header;
http.payloadPart data:bytes trailer:(vector http.header) last:Bool = http.PayloadPart;
http.response http_version:string status_code:int reason:string headers:(vector http.header) no_payload:Bool = http.Response;

http.request id:int256 method:string url:string http_version:string headers:(vector http.header) = http.Response;
http.getNextPayloadPart id:int256 seqno:int max_chunk_size:int = http.PayloadPart;
```