"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[5492],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>f});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=o.createContext({}),h=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=h(e.components);return o.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=h(a),m=r,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||n;return a?o.createElement(f,s(s({ref:t},c),{},{components:a})):o.createElement(f,s({ref:t},c))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,s=new Array(n);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:r,s[1]=i;for(var h=2;h<n;h++)s[h]=a[h];return o.createElement.apply(null,s)}return o.createElement.apply(null,a)}m.displayName="MDXCreateElement"},6050:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>u,frontMatter:()=>n,metadata:()=>i,toc:()=>h});var o=a(7462),r=(a(7294),a(3905));const n={sidebar_position:3},s="Differences from EVM",i={unversionedId:"overview/differences-from-evm",id:"overview/differences-from-evm",title:"Differences from EVM",description:"Ethereum is a great blockchain construct that gave birth to smart contracts, which, in turn, opened the world for dApps. Unfortunately, it became hostage to its own success. Despite the fact that it was a revolution at the time of its inception, it subsequently went on a path of slow evolution, considerably hindering its advancement and losing competition with other blockchains.",source:"@site/../../src/overview/differences-from-evm.md",sourceDirName:"overview",slug:"/overview/differences-from-evm",permalink:"/overview/differences-from-evm",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/overview/differences-from-evm.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Infinite scalability",permalink:"/overview/infinite-scalability"},next:{title:"The Lore",permalink:"/overview/lore"}},l={},h=[{value:"Sharding",id:"sharding",level:2},{value:"Modus operandi",id:"modus-operandi",level:2},{value:"Sharding in Everscale is not merely data sharding, but computational resources sharding",id:"sharding-in-everscale-is-not-merely-data-sharding-but-computational-resources-sharding",level:2},{value:"Large amount of data and its long tail issue",id:"large-amount-of-data-and-its-long-tail-issue",level:2}],c={toc:h},d="wrapper";function u(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"differences-from-evm"},"Differences from EVM"),(0,r.kt)("p",null,(0,r.kt)("img",{src:a(506).Z,width:"1600",height:"840"})),(0,r.kt)("p",null,"Ethereum is a great blockchain construct that gave birth to smart contracts, which, in turn, opened the world for dApps. Unfortunately, it became hostage to its own success. Despite the fact that it was a revolution at the time of its inception, it subsequently went on a path of slow evolution, considerably hindering its advancement and losing competition with other blockchains.\nEverscale, due to its later arrival and the time lag associated with it, was able to assess the mistakes made on Ethereum. Therefore, having the expert take, community devs put the right decisions into Everscale blockchain. This was possible, among others, due to the fact that, unlike many other blockchains, Everscale has never attempted to reduce costs for blockchain development.\nIn what follows we will outline some technical issues associated with Ethereum and the solutions developed by Everscale in order to overcome them."),(0,r.kt)("h2",{id:"sharding"},"Sharding"),(0,r.kt)("p",null,"From the very beginning, Eth 2.0 planned to develop a genuine sharding protocol. It envisaged cross-shared transactions and hundreds of shards. Later, the number of shards was reduced to 32, and now the idea was completely abandoned ",(0,r.kt)("strong",{parentName:"p"},"(at least for the near future)"),". Instead, the decision was made in favor of rollups."),(0,r.kt)("p",null,"The arguments explaining why rollups are not the right solution due to their centralisation and low security are a topic for a separate article. Generally speaking, they are no more than different networks that rely on some security measures from L1. They are also extremely inconvenient for the end users."),(0,r.kt)("p",null,"It is very difficult to implement normal sharding in the Ethereum network due to its inherent synchronous architecture. Aslo, it is troublesome to make synchronous cross-chain transactions, and absolutely impossible to make it so that there is a large throughput. And if each shard exists independently, then this is not much better than rollups are."),(0,r.kt)("p",null,"In Everscale, the asynchronous architecture was designed from scratch. All contracts communicate with each other via messages. Therefore, the only thing needed for sharding to work is the synchronization of message queues between shards. At the same time, since Everscale was developed by blockchain maximalists, they went even further. That is to say, they developed not just a form of classical sharding, but ",(0,r.kt)("strong",{parentName:"p"},"infinite sharding"),"."),(0,r.kt)("h2",{id:"modus-operandi"},"Modus operandi"),(0,r.kt)("p",null,"Currently, Everscale is comprised of two global shards called workchains:"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Master-workchain")," (masterchain) for synchronization and governance, and the ",(0,r.kt)("strong",{parentName:"p"},"main workchain")," for smart contracts."),(0,r.kt)("p",null,"The main workchain can be partitioned into N shards (from 1 to 256 shards). Each shard has its own group of validators. This sub-group is responsible for executing transactions in its own shard. At the same time, it constantly downloads blocks from all other shards of its workchain."),(0,r.kt)("p",null,"A block in Everscale is not just a list of transactions that need to be completed in order to achieve changes in the state. Instead, a block is:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A list of messages for which transactions were executed, removing them from the incoming queue."),(0,r.kt)("li",{parentName:"ul"},"New messages that entered the outgoing queue after message processing."),(0,r.kt)("li",{parentName:"ul"},"Changes in smart contract states that resulted from message processing.")),(0,r.kt)("p",null,"That is, in order for the validator from shard X to maintain the current state of shard Y, it does not need to execute all the transactions that were in the block of shard Y. It simply downloads the block and rolls up the changes that have occurred in the message queue and smart contract states."),(0,r.kt)("h2",{id:"sharding-in-everscale-is-not-merely-data-sharding-but-computational-resources-sharding"},"Sharding in Everscale is not merely data sharding, but computational resources sharding"),(0,r.kt)("p",null,"In case there are too many transactions in the last N block of some particular shard, then the shard is simply divided into two. This is done in accordance with the address range of smart contracts, with some transactions going to one shard while the rest to the other. The resulting shards, in turn, can also be divided into two more."),(0,r.kt)("p",null,"In order for this to work, Everscale also decided to abandon the idea of radical decentralization. The number of validators in the network will be in the number of thousands, not hundreds of thousands like on Ethereum network. Everscale validators are professional players with big stakes and expensive servers. Currently, the validator requirements are: 48 CPUs, 128 RAM and 1TB SDD + 1 GB network bandwidth."),(0,r.kt)("p",null,"Having such sharding capabilities, Everscale achieves a huge network throughput. Importantly, this is accomplished without any damages to customer satisfaction. That is to say, the customer does not have to switch between shards himself, or constantly transfer tokens from one rollup to another."),(0,r.kt)("p",null,"It is important to mention that there is also a big security issue arising. As the number of shards increases, there are fewer instruments to watch over each one of them. Therefore, in the event of a high block mining rate, it may lead to the collusion of the validators of a single shard. This, in turn, could end with someone creating the original message that carries the money not belonging to the originator of the contract."),(0,r.kt)("p",null,"A new consensus mechanism (SMFT) that is currently under development solves this issue. Basically, it takes advantage of the current architecture of Everscale where validators share computation among themselves. This way, all validators always have the data of all shards. It means that each newly issued block can be validated independently."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Let\u2019s see how it actually works. Please note that the text below describes the principle of work, not the exact algorithm.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each validator comes up with a random number and sends its hash to other validators."),(0,r.kt)("li",{parentName:"ul"},"After all shards have created a block, but before the rest of the shards accept it, all validators must take the hash of this block, mix it with a random number, and if the remainder of dividing the resulting number by N is zero, then the validator must check this block, and send validators of -1 governance shard-chain a \u201cyes\u201d or \u201cno\u201d."),(0,r.kt)("li",{parentName:"ul"},"If there is at least one \u2018\u2019no\u2019\u2019, then the verification of this block by the rest of the validators starts. In the case of an invalid block, not only the validators who created this block will be terminated, but also those who said \u201cyes\u201d or remained silent."),(0,r.kt)("li",{parentName:"ul"},"Before creating the next block, everyone reveals their guessed number and guesses a new one."),(0,r.kt)("li",{parentName:"ul"},"Thus, shard validators never know which and how many other validators will validate their block. ",(0,r.kt)("strong",{parentName:"li"},"It is a very nice and elegant solution."))),(0,r.kt)("h2",{id:"large-amount-of-data-and-its-long-tail-issue"},"Large amount of data and its long tail issue"),(0,r.kt)("p",null,"The original idea of blockchain was that there is a chain of blocks from the very beginning (genesis) to the latest block. And there is always the possibility to synchronize from the genesis block to the latest one, to check that everything runs well. However, already for a long time on Ethereum, full-nodes begin to synchronize with some kind of snapshot from the recent past, and not from the genesis block."),(0,r.kt)("p",null,"Many Ethereum maximalists are still not ready to accept the idea that storing the entire history of blocks is wrong. They believe that history should be stored forever. It entails that there is a need for special protocols to allow users to always check some particular piece of information from history."),(0,r.kt)("p",null,"However, it can be argued that even the Ethereum dev team has abandoned this idea. In the Ethereum 2.0 roadmap, there is the section called \u201cHistory expiry\u201d stating that full-nodes should not store the history of blocks for more than a year."),(0,r.kt)("p",null,"The history of blocks is critically important for rollups. That is, if a rollup operator terminates its operation, then you need the entire history of its transactions in order to withdraw your money from it, on L1. This is one of the reasons why rollups are a questionable solution. Starting with Eth 2.0, we can only say that the history of blocks is probably stored at least somewhere."),(0,r.kt)("p",null,"It is assumed that the history will be stored by blockchain explorers. The Ethereum devs team are also thinking about some new techniques for storing history. So far there are none. There is also an understanding that we can only choose from one of the following two options: ",(0,r.kt)("strong",{parentName:"p"},"high throughput or storage history"),"."),(0,r.kt)("p",null,'To add, there is also a concept called "Log events". It was created to simplify the development of Web3 solutions. However, due to the fact that full-nodes or blockchain providers ',(0,r.kt)("strong",{parentName:"p"},"(infura)")," are as well required to store an infinitely increasing amount of information, the requests to them are very slow. This, too, has already been de facto recognized as a mistake."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"However, due to the large number of dApps already delivered by Ethereum, it will be difficult for them to refuse this concept.")),(0,r.kt)("p",null,"But that's only half the problem. There is also the issue of blockchain state growth. If someone recorded something on the blockchain, at least once, for example, buying a memcoin for 0.001. Then, even if the price of the memcoin goes to zero, the validators will still be required to store the information about your purchase forever. That is, you pay for the record once, but it will be stored forever. And here comes the interesting economics - blockchains are forced to limit the rate of recording transactions artificially so that the size of the blockchain state does not grow faster than data storage becomes cheaper. As a result, users are forced to compete with each other for the right to record data on the blockchain via an auction. Subsequently, it makes the transaction fees increase all the time."),(0,r.kt)("p",null,"This issue has also been de facto acknowledged by the Ethereum team, so that they introduced \"State expiry\u201d in the Ethereum 2.0 roadmap. But of course they can't completely solve this problem without breaking backwards compatibility. So far, it is proposed to remove contracts from the state that have not been accessed for N years (for example, 10), with the possibility of recovery."),(0,r.kt)("p",null,"Some other blockchains also explore ways to solve this issue. For example, in Near blockchain, the smart contract must lock N tokens each time it registers new information in the state. The issuer of the smart contract can set the conditions on it, so that the user can delete his information and receive the tokens back. This is definitely only a half-measure. Not all issuers of smart contracts set this condition, and even those who do, do not think about the mechanism of how to return tokens in case the cost of transactions changes in the future. Other blockchains simply remove smart contracts with fewer N tokens on the balance from the state."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Everscale never looks for easy and uncostly ways to solve blockchain issues. Therefore, the highlighted problem was resolved with the maximum efficiency and accuracy possible. In the Everscale blockchain, each contract is required to pay rent for storing its data in the state. This rent corresponds to the size of the data. When the money runs out, the contract is deleted with the possibility of recovery, and then deleted completely.")),(0,r.kt)("p",null,"Thanks to this, Everscale achieves absolutely controlled behavior, when each smart contract decides for itself how long it will exist. Users do not have to compete with each other for the right to record data, and we get a huge throughput in terms of the number of transactions processed per second."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Some other aspects distinguishing Everscale from Ethereum")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"On Everscale, in contrast to Ethereum:")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Calls between contracts are asynchronous and not atomic"),(0,r.kt)("li",{parentName:"ul"},"Contracts cannot run getter methods on other contracts"),(0,r.kt)("li",{parentName:"ul"},"Contract code is not immutable and can be updated"),(0,r.kt)("li",{parentName:"ul"},"The gas price is constant. Gas wars are impossible. However, transactions may take longer due to threads synchronization"),(0,r.kt)("li",{parentName:"ul"},"There are limits on data structure size per contract, for instance, token and NFT standards"),(0,r.kt)("li",{parentName:"ul"},"Everything is a smart contract, even a simple wallet. A single public key can correspond to a different wallets"),(0,r.kt)("li",{parentName:"ul"},"Data structures and memory model differences. Iterable mappings and other TVM specific types")))}u.isMDXComponent=!0},506:(e,t,a)=>{a.d(t,{Z:()=>o});const o=a.p+"assets/images/evervseth-67509df7f77917df56134c0c1ee1ad71.jpg"}}]);