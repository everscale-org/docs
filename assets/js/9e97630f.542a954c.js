"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[4819],{3905:(e,t,a)=>{a.d(t,{Zo:()=>h,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),c=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},h=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,h=i(e,["components","mdxType","originalType","parentName"]),d=c(a),u=n,m=d["".concat(l,".").concat(u)]||d[u]||p[u]||o;return a?r.createElement(m,s(s({ref:t},h),{},{components:a})):r.createElement(m,s({ref:t},h))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,s=new Array(o);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[d]="string"==typeof e?e:n,s[1]=i;for(var c=2;c<o;c++)s[c]=a[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9880:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=a(7462),n=(a(7294),a(3905));const o={description:"Blockchain, everything is a contract, types of messages and gas",sidebar_position:0},s="Everscale overview",i={unversionedId:"learn/overview",id:"learn/overview",title:"Everscale overview",description:"Blockchain, everything is a contract, types of messages and gas",source:"@site/../../src/learn/overview.md",sourceDirName:"learn",slug:"/learn/overview",permalink:"/learn/overview",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/learn/overview.md",tags:[],version:"current",lastUpdatedAt:1684270521,formattedLastUpdatedAt:"May 16, 2023",sidebarPosition:0,frontMatter:{description:"Blockchain, everything is a contract, types of messages and gas",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Learn",permalink:"/learn"},next:{title:"Decentralization",permalink:"/learn/decentralization"}},l={},c=[],h={toc:c},d="wrapper";function p(e){let{components:t,...a}=e;return(0,n.kt)(d,(0,r.Z)({},h,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"everscale-overview"},"Everscale overview"),(0,n.kt)("p",null,"Everscale is one of the most advanced blockchain networks that lets users transfer digital assets to anyone for a small fee. It also powers numerous leading applications that everyone can take advantage of. "),(0,n.kt)("p",null,"The blockchain was created on the basis of the initial code of the Telegram Open Network (TON) blockchain designed by Nikolai Durov. Fundamentally, Everscale blockchain is constructed in accordance with this TON Whitepaper."),(0,n.kt)("p",null,"Despite the fact that Everscale builds on TON's innovation, there are, however, some big advancements deployed by network developers in order to address the fundamental issues faced by most blockchains, Everscale constantly works on implementing the most secure solutions to achieve maximum scalability. "),(0,n.kt)("p",null,"The main solution that permits Everscale to offer one of the highest Transaction Per Second rates available among currently operating blockchains is sharding. "),(0,n.kt)("p",null,"Generally speaking, sharding is a method for distributing data across multiple machines. This makes it a scaling technique, and can be used by blockchain networks to partition states and transaction processing, so that each node of the network would only need to process a fraction of all the transactions. Moreover, sharding allows for the parallel processing of transactions. As long as there is a sufficient number of nodes verifying each transaction, ensuring high reliability and security, then splitting a blockchain into shards will allow it to process far more transactions."),(0,n.kt)("p",null,"However, Everscale went even further than classical sharding. Below we briefly describe technological solutions, besides sharding, that permit Everscale to be amongst the leading blockchain ecosystems. "),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"1. Infinite Sharding")," "),(0,n.kt)("p",null,"On Everscale, shards are dynamically added as the load increases and then merged back. This is possible because all contracts on the chain communicate with each other asynchronously, and therefore, we can split one shard into two shards without any problems occurring (shards are just divided in half according to the ranges of contract addresses)."),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/develop/smart-contracts/distributed-programming"},(0,n.kt)("strong",{parentName:"a"},"2. Distributed programming"))),(0,n.kt)("p",null,"There is a reasonable question. Let's consider that we have a contract with a token, for example, USDT. Then, a user with a larger account balance is more motivated to pay for storage, than, respectively, the user with a lesser balance. This way, wouldn't there arise situations when some users will be obliged to pay for storage on behalf of others, so that their contract is not deleted?    "),(0,n.kt)("p",null,"In order to solve this problem, another truly genius idea was invented, called distributing programming. "),(0,n.kt)("p",null,"In Everscale, for each entity, balance or even trading pair, its own small smart contract is deployed. The owner of the respective smart contract decides on his own for how long to store the data and pays only for that. "),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"/validate/getting-started"},(0,n.kt)("strong",{parentName:"a"},"3. Validation"))," "),(0,n.kt)("p",null,"The Everscale blockchain was not built to allow just anyone to become a validator. Validation is a critical process, and requires professional equipment and access to an appropriate server. The total number of validators will at most be in the thousands, not in the tens of thousands. And validator machines have high server and channel requirements (the current requirements are 48 CPUs, 128 RAM and 1TB SSD) and a 1GB channel (the network is used extensively). This allows for the blockchain to support a very quick block release speed and often rotate validators in the shards."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"4. Paid storage")),(0,n.kt)("p",null,"There is also the issue of blockchain state growth faced by most networks. For instance, If someone recorded something on the blockchain, at least once, for example, bought a memcoin for 0.001. Then, even if the price of the memcoin goes to zero, the validators will still be required to store the information about your purchase forever. That is, you pay for the record once, but it will be stored forever. And here comes the interesting economics - blockchains are forced to limit the rate of recording transactions artificially so that the size of the blockchain state does not grow faster than data storage becomes cheaper. As a result, users are forced to compete with each other for the right to record data on the blockchain via an auction, and subsequently, transaction fees are increasing all the time."),(0,n.kt)("p",null,"Everscale, as a leading blockchain developer, never looks for easy and uncostly ways to solve blockchain issues. Therefore, the highlighted problem was resolved with the maximum efficiency and accuracy possible. In the Everscale blockchain, each contract is required to pay rent for storing its data in the state. This rent corresponds to the size of the data. When the money runs out, the contract is deleted with the possibility of recovery, and then deleted completely. "),(0,n.kt)("p",null,"Essentially, Everscale aims to be a decentralized replacement for AWS. Just as you can host your application on AWS, you can host it on Everscale. Hosting it on Everscale will not be much more expensive (if it is rarely used, it will be cheaper), but it will have maximum fault tolerance."),(0,n.kt)("p",null,"Please follow ",(0,n.kt)("a",{parentName:"p",href:"/arch/basics"},(0,n.kt)("strong",{parentName:"a"},"this page"))," in order to get started with the components of the Everscale blockchain and start learning it's architecture."))}p.isMDXComponent=!0}}]);