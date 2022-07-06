"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[8239],{3905:function(e,t,n){n.d(t,{Zo:function(){return h},kt:function(){return u}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},h=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,h=s(e,["components","mdxType","originalType","parentName"]),p=c(n),u=r,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||i;return n?a.createElement(m,o(o({ref:t},h),{},{components:n})):a.createElement(m,o({ref:t},h))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},1805:function(e,t,n){n.r(t),n.d(t,{assets:function(){return h},contentTitle:function(){return l},default:function(){return u},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={sidebar_position:1},l="Transactions Mechanics And Integration Methods",c={unversionedId:"develop/integrate/build-cross-chain/getting-started/transactions-mechanism",id:"develop/integrate/build-cross-chain/getting-started/transactions-mechanism",title:"Transactions Mechanics And Integration Methods",description:"Firstly, we will examine what kinds of transactions there are and how they work.",source:"@site/../../src/develop/integrate/build-cross-chain/getting-started/transactions-mechanism.md",sourceDirName:"develop/integrate/build-cross-chain/getting-started",slug:"/develop/integrate/build-cross-chain/getting-started/transactions-mechanism",permalink:"/develop/integrate/build-cross-chain/getting-started/transactions-mechanism",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/integrate/build-cross-chain/getting-started/transactions-mechanism.md",tags:[],version:"current",lastUpdatedAt:1657123094,formattedLastUpdatedAt:"7/6/2022",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/develop/integrate/build-cross-chain/getting-started/overview"},next:{title:"EVM \u2192 Everscale Transactions",permalink:"/develop/integrate/build-cross-chain/getting-started/evm-everscale"}},h={},d=[],p={toc:d};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"transactions-mechanics-and-integration-methods"},"Transactions Mechanics And Integration Methods"),(0,i.kt)("p",null,"Firstly, we will examine what kinds of transactions there are and how they work. "),(0,i.kt)("p",null,"There are three kinds of transactions:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/develop/integrate/build-cross-chain/getting-started/evm-everscale"},"EVM \u2192 Everscale")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/develop/integrate/build-cross-chain/getting-started/everscale-evm"},"Everscale \u2192 EVM")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/develop/integrate/build-cross-chain/getting-started/credit-processor"},"EVM \u2192 Everscale using a Credit processor contract"))),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"ERC 20 tokens are transferred to the Vault in the EVM network, specifying the recipient's address in Everscale.",(0,i.kt)("br",{parentName:"li"}),"Then, as follows, the event emit Deposit (amount, recipient.wid, recipient.addr)."),(0,i.kt)("li",{parentName:"ol"},"ERC 20 tokens are transferred to the Vault on the EVM network, specifying the recipient's address in Everscale.",(0,i.kt)("br",{parentName:"li"}),"Then, as follows, the event emit Deposit (amount, recipient.wid, recipient.addr).",(0,i.kt)("br",{parentName:"li"}),"Thus, a contract on Everscale is created with the metadata of this event. The validators see this contract on the network, and if the transaction is confirmed, they will sign it and the contract will issue TIP 3 tokens in Everscale.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Everscale \u2192 EVM")," is possible for Vault and MultiVault, according to the same principle: "),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Tokens are transferred to Everscale for a special contract that will burn them and create a special contract with the metadata of the burning. "),(0,i.kt)("li",{parentName:"ol"},"The relayers write their signatures on this contract for the transaction metadata.",(0,i.kt)("br",{parentName:"li"}),"When the required number of signatures is reached, a request is made to the Vault in the EVM network with this metadata + signatures.",(0,i.kt)("br",{parentName:"li"}),"Afterwards,  the tokens will be released. "),(0,i.kt)("li",{parentName:"ol"},"In the event that there is not enough liquidity in the Vault, there are the following scenarios:",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"Waiting for a short time, in case the required amount of liquidity is accumulated. However, it should be noted that the signatures of validators last for a specific period of time. "),(0,i.kt)("li",{parentName:"ol"},"Completing the withdrawal request which gets in the queue, and received in a while with another transaction. "),(0,i.kt)("li",{parentName:"ol"},"Assigning a reward for someone who will bring liquidity which will permit to complete the transaction. ")))),(0,i.kt)("p",null,"Please be informed that situations with a lack of liquidity can happen, due to the fact that liquidity moves easily between networks."),(0,i.kt)("p",null,"Thus, in any specific timeframe, there may not be enough locked tokens in a particular network to immediately complete transactions."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"EVM \u2192 Everscale transactions using CPU credit")," are currently possible only for liquid tokens (Vault).",(0,i.kt)("br",{parentName:"p"}),"\n","Credit processor is a special contract that will issue EVER on credit, in order to automatically complete transactions on the Everscale network. It works as follows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Just like in a regular transaction, funds are deposited into the Vault account. It should be noted that, in this case, not only the recipient's address ought to be specified, but, as well:",(0,i.kt)("br",{parentName:"li"}),"The address that is to be used in emergency cases. The cases are twofold:",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"There were not enough funds to pay for the transaction. (in the event of high market volatility)"),(0,i.kt)("li",{parentName:"ol"},"Transfer parameters were not set correctly. "))),(0,i.kt)("li",{parentName:"ol"},"The address of the token recipient."),(0,i.kt)("li",{parentName:"ol"},"How many tokens should be received after the exchange, and how much is still needed to have to exchange to EVER additionally (so that the gas payment comes into the contract)."),(0,i.kt)("li",{parentName:"ol"},"The address that credits you is the address of the contract through which someone's bot that gives you a loan. But if this bot dies, any other account can give you a loan."),(0,i.kt)("li",{parentName:"ol"},"Payload, is the data that will be received by the recipient along with the tokens. ")),(0,i.kt)("p",null,"Accordingly, when funds are deposited in EVM, a credit transfer contract automatically appears in Everscale. It is confirmed by the relayers.",(0,i.kt)("br",{parentName:"p"}),"\n","They issue tokens for THEMSELVES, exchange part of them for gas through AMM, return the loan and then send tokens to the recipient. "),(0,i.kt)("p",null,"Also, they can exchange more tokens than needed for EVER, and send these EVER to the recipient so that the user has enough funds to make other transactions."),(0,i.kt)("p",null,"The easiest way to use a credit processor is when a user who does not have EVER,  wants to transfer tokens to the network.",(0,i.kt)("br",{parentName:"p"}),"\n","In this case, the controlling address and the recipient's address are the same, and in case any issues arise, which is a very rare situation, the user will get EVER in one of the other ways and complete the transfer."),(0,i.kt)("p",null,"A more complicated way is characteristic for EVM \u2192 Everscale \u2192 EVM transactions.",(0,i.kt)("br",{parentName:"p"}),"\n","In this case, the recipient is a special contract that will send user's tokens further to the requested network.",(0,i.kt)("br",{parentName:"p"}),"\n","The address for emergency situations is this user's wallet in Everscale - even if not initialized.",(0,i.kt)("br",{parentName:"p"}),"\n","In the event of emergency cases, it will receive EVER by another transaction, and will be able to complete/cancel the transaction)."),(0,i.kt)("p",null,"The most difficult way is associated with some kind of non-custodial logic.",(0,i.kt)("br",{parentName:"p"}),"\n","When  tokens are linked to a preset strategy and without a controlling account (after all, the user can cancel the transaction and take the tokens back). This option is also probably possible.",(0,i.kt)("br",{parentName:"p"}),"\n","However, in depth knowledge and understanding of processor logic and its settings is needed.",(0,i.kt)("br",{parentName:"p"}),"\n","Otherwise, the Payload in the transaction should be set up with another contract in control, which, for example, can only cancel the transaction if necessary and send tokens back through the bridge to the sender."),(0,i.kt)("p",null,"In what follows, it is described in more detail how these transactions work. In order to understand the work of the bridge, it is recommended to go through all the pipelines."))}u.isMDXComponent=!0}}]);