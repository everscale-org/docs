---
sidebar_position: 3
---

# Everscale → EVM Transactions

Everscale - EVM transactions are similar to EVM - Everscale. The difference is that they are in the opposite direction.     
The exception lies in the fact that we don't have to check how many tokens the Vault is still ready to accept, but how many tokens it has on the balance (how muck can be withdrawn).    
There is a lot of code needed to explain this transaction type. Therefore, in what follows, only a simplified 
version is given. Please check the details in the repository via following [this link](https://github.com/mnill/octus-bridge-integration-sample/blob/master/src/helpers/EverscaleEvm/everscaleEvmPipeline.ts).

The transaction pipeline is as follows:

Similarly, we take the Vaults list from [this file](https://raw.githubusercontent.com/broxus/bridge-assets/master/main.json).

Select the desired token, and take for it the Vault of the desired network (chain id), and depositType -
default. 

**DO NOT** use `EthereumEventConfiguration.sol`.    
Instead, use `EverscaleEventConfiguration.sol`.   

Get the address from `Proxy.sol`.     
This is a contract owner TIP 3 Root which knows which configuration can be trusted. Take the `proxy address` from the [following file](https://raw.githubusercontent.com/broxus/bridge-assets/master/main.json).

```
const proxyContract = new rpc.Contract(TokenAbi.EvmTokenTransferProxy, new Address(address));

const configurationAddress = (await contract.methods.getDetails({ answerId: 0 }).call()).value0.tonConfiguration;
```

The so-called liquid tokens are the tokens that are issued by the bridge for the tokens locked in Vaults.   
Accordingly, in order to get the tokens from the Vaults, the issued tokens must be burned. 

Send tokens for burning, and put the callback from this burning on `Proxy.sol`, which in turn will send the 
callback `EverscaleEventConfiguration.sol`, and it will deposit `TokenTransferEverscaleEvent.sol`.

This is similar to EVM → Everscale transactions, except that in this case, the relayers do not just say Yes/No.     
They sign the contract for the transaction, with which the funds can be withdrawn from `Vault.sol` on the EVM side.

```
const data = await rpc.packIntoCell({
    data: {
        addr: evmAddress,
        chainId: evmChainId,
    },
    structure: [
        {name: 'addr', type: 'uint160'},
        {name: 'chainId', type: 'uint32'},
    ] as const,
});

	await walletContract.methods
	  .burn({
	      callbackTo: proxyAddress,
	      payload: data.boc,
	      remainingGasTo: userAddress,
	      amount: amount,
	  }).send({
	      amount: burnValue,
	      bounce: true,
	      from: userAddress,
	  });
```

Actually, having sent the token burning transaction, it is needed to wait for the Event. This is a difficult task. The Event contract address cannot be calculated in advance, because it depends on the LT (Logical time).     
It can be solved in different ways. One of them is to subscribe to the `EverscaleEventConfiguration.sol` contract and wait for the transaction that will create the contract. 

```
const lastConfigurationLt = (
                await rpc.getFullContractState({
                    address: configurationAddress,
                })
            ).state?.lastTransactionId?.lt

const subscriber = new rpc.Subscriber();
const oldStream = subscriber.oldTransactions(configurationAddress, {
	fromLt: fromLT,
});

const eventStream = oldStream
.merge(subscriber.transactions(address))
.flatMap((item) => item.transactions)
.filterMap(async (tx) => {
    const decodedTx = await contract.decodeTransaction({
        methods: ['deployEvent'],
        transaction: tx,
    });
    if (decodedTx?.method === 'deployEvent' && decodedTx.input) {
        const {eventData} = decodedTx.input.eventVoteData;
        const event = await rpc.unpackFromCell({
            allowPartial: true,
            boc: eventData,
            structure: [
                {name: 'wid', type: 'int8'},
                {name: 'addr', type: 'uint256'},
                {name: 'tokens', type: 'uint128'},
                {name: 'eth_addr', type: 'uint160'},
                {name: 'chainId', type: 'uint32'},
            ] as const,
        });
        const checkAddress = `${event.data.wid}:${new BigNumber(event.data.addr)
            .toString(16)
            .padStart(64, '0')}`;
        const checkEvmAddress = `0x${new BigNumber(event.data.eth_addr)
            .toString(16)
            .padStart(40, '0')}`;

        if (
            checkAddress.toLowerCase() === fromAddress.toLowerCase() &&
            checkEvmAddress.toLowerCase() === toAddress.toLowerCase()
        ) {
            const eventAddress = await contract.methods
                .deriveEventAddress({
                    answerId: 0,
                    eventVoteData: decodedTx.input.eventVoteData,
                })
                .call();

            return eventAddress.eventContract;
        }
        return undefined;
    }
    return undefined;
});
const eventAddress = await eventStream.first();
```

The address must be saved so that if the user refreshes the page without completing the transaction, to be able to return to it.

Unfortunately, there is a time lag between the moment when tokens are sent to when the address is generated.    
Thus, if the user leaves in this time frame, then the address of the Event will have to be searched on app.octusbridge.io.  
You can check `History` to find there all transactions via the Bridge.

When the address is generated, `TokenTransferEverscaleEvent.sol`, we subscribe to it and track its status.    
Everything is the same as in the case of EVM - Everscale. The statuses are: `Initializing, Pending, Confirmed, Rejected.`     
After the Event has been signed by a sufficient number of relayers and the transaction is `Confirmed`, it is needed to get the data that they signed and the signatures themselves.

```
const eventContract = new rpc.Contract(TokenAbi.TokenTransferTonEvent, new Address(eventAddress));

const eventDetails = await eventContract.methods.getDetails({ answerId: 0 }).call();

const round_number = (await eventContract.methods.round_number({}).call()).round_number;

const eventConfigDetails = await eventConfig.methods.getDetails({ answerId: 0 }).call()

const eventDataEncoded = mapTonCellIntoEthBytes(
                    Buffer.from(eventConfigDetails._basicConfiguration.eventABI, 'base64').toString(),
                    eventDetails._eventInitData.voteData.eventData,
                );

const encodedEvent = web3.eth.abi.encodeParameters([{
    TONEvent: {
        eventTransactionLt: 'uint64',
        eventTimestamp: 'uint32',
        eventData: 'bytes',
        configurationWid: 'int8',
        configurationAddress: 'uint256',
        eventContractWid: 'int8',
        eventContractAddress: 'uint256',
        proxy: 'address',
        round: 'uint32',
    },
    }], [{
        eventTransactionLt: eventDetails._eventInitData.voteData.eventTransactionLt,
        eventTimestamp: eventDetails._eventInitData.voteData.eventTimestamp,
        eventData: eventDataEncoded,
        configurationWid: configurationAddressWid,
        configurationAddress: `0x${configurationAddressValue}`,
        eventContractWid: eventContractAddressWid,
        eventContractAddress: `0x${eventContractAddressValue}`,
        proxy: `0x${new BigNumber(eventConfigDetails._networkConfiguration.proxy).toString(16).padStart(40, '0')}`,
        round: round_number
    }])

const signatures = eventDetails._signatures.map(sign => {
    const signature = `0x${Buffer.from(sign, 'base64').toString('hex')}`
    const address = web3!.eth.accounts.recover(
        this.evmWallet.web3!.utils.sha3(this.data.encodedEvent!)!,
        signature,
    )
    return {
        address,
        order: new BigNumber(address.slice(2).toUpperCase(), 16),
        signature,
    }
})

signatures.sort((a, b) => {
    if (a.order.eq(b.order)) {
        return 0
    }

    if (a.order.gt(b.order)) {
        return 1
    }

    return -1
});

const vaultContract = new web3.eth.Contract(EthAbi.Vault, vaultAddress);

const isAlreadyReleased = await vaultContract.methods.withdrawalIds(withdrawId).call();

if (!isAlreadyReleased) {
		vaultContract.methods
		  .saveWithdraw(
		      encodedEvent,
		      signatures.map(({signature}) => signature),
		  ).send({
          from: fromAddress,
          type: txType,
      });
}
```

Please follow [this page](credit-processor.md) in order to go through the details of EVM – Everscale transactions using the Credit Processor.