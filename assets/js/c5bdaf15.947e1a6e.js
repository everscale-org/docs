"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[5810],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>v});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),s=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=s(r),d=n,v=p["".concat(c,".").concat(d)]||p[d]||m[d]||i;return r?a.createElement(v,l(l({ref:t},u),{},{components:r})):a.createElement(v,l({ref:t},u))}));function v(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o[p]="string"==typeof e?e:n,l[1]=o;for(var s=2;s<i;s++)l[s]=r[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1511:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var a=r(7462),n=(r(7294),r(3905));const i={sidebar_position:1,slug:"contents"},l="Documentation overview",o={unversionedId:"overview/overview",id:"overview/overview",title:"Documentation overview",description:"Welcome",source:"@site/../../src/overview/overview.md",sourceDirName:"overview",slug:"/overview/contents",permalink:"/overview/contents",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/overview/overview.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"contents"},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/overview"},next:{title:"Infinite scalability",permalink:"/overview/infinite-scalability"}},c={},s=[{value:"Welcome",id:"welcome",level:2},{value:"Build",id:"build",level:2},{value:"Validator and full node infrastructure",id:"validator-and-full-node-infrastructure",level:2},{value:"Specifications",id:"specifications",level:2},{value:"Architecture",id:"architecture",level:2}],u={toc:s},p="wrapper";function m(e){let{components:t,...r}=e;return(0,n.kt)(p,(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"documentation-overview"},"Documentation overview"),(0,n.kt)("h2",{id:"welcome"},"Welcome"),(0,n.kt)("p",null,"This is the introductory section where you can learn Everscale\u2019s basic concepts, infinite scalability as well as comparisons with Ethereum, Cosmos and Avalanche. "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/overview/infinite-scalability"},"Infinite scalability")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/overview/differences-from-evm"},"Differences from EVM")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/overview/lore"},"The Lore")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/overview/concepts"},"Glossary"))),(0,n.kt)("h2",{id:"build"},"Build"),(0,n.kt)("p",null,"Get familiar with Everscale\u2019s developer tools and start building. Also, please find the guides to install the IDE and write your first smart contract with Everscale. "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/develop/intro"},"Intro")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/develop/tools-overview"},"Developer Tools Overview")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"../develop/smart-contracts/"},"Smart Contracts")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"../develop/recipes"},"Recipes for Backend and Frontend devs"))),(0,n.kt)("h2",{id:"validator-and-full-node-infrastructure"},"Validator and full node infrastructure"),(0,n.kt)("p",null,"Learn Everscale\u2019s validation in case you want to be a validator or just familiarize yourself with the technology. "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/validate"},"Validator and Full Node Infrastructure"))),(0,n.kt)("h2",{id:"specifications"},"Specifications"),(0,n.kt)("p",null,"Learn about incoming external messages tracing via the REMP protocol. Also, study Everscale's token standards, DePools and others."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"../standard/"},"Standards")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/spec/abi"},"ABI")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/spec/depool-specification"},"dePool Specification"))),(0,n.kt)("h2",{id:"architecture"},"Architecture"),(0,n.kt)("p",null,"Learn Everscale's peer-to-peer protocols. Among others, they are used to propagate new blocks as well as send and collect transaction candidates. "),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"../arch/networking/"},"Networking")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"../arch/consensus/"},"Consensus")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/tlb-and-boc"},"TL-B and BoC")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/tvm"},"TVM")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/fee-calculation"},"Network Fees")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/managing-gas"},"Gas Calculation")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/executor"},"Executor")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/logic-time"},"Logical Time and Message Delivery Guarantees")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/accounts"},"Account")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/message"},"Message")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/transactions"},"Transaction")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/workchains"},"Workchains")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/arch/multithreading"},"Multithreading and Message Queues"))))}m.isMDXComponent=!0}}]);