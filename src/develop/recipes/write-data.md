---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Write data to blockchain

To put something in the Everscale blockchain, you need to send an external message to some account. Depending on a use-case and smart-contract logic, you may also want the account (usually it will be a users' Wallet smart-contract) to act as a proxy and forward your message to other contract. In this article, we describe both cases

## Send the External Message

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log("inpage-provider");
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log("surf keeper");
  ```
  </TabItem>

  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  console.log("eversdk");
  ```
  </TabItem>
</Tabs>

## Encode and send the Internal Message

<Tabs>
  <TabItem value="inp-prov" label="everscale-inpage-provider">

  ```typescript
  console.log("inpage-provider");
  ```
  </TabItem>

  <TabItem value="surf-keeper" label="surf-keeper-provider">

  ```typescript
  console.log("surf keeper");
  ```
  </TabItem>

  <TabItem value="ever-sdk" label="ever-sdk-js">

  ```typescript
  console.log("eversdk");
  ```
  </TabItem>
</Tabs>
