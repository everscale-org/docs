"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[7433],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1583:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={sidebar_position:0},i="Getting started",l={unversionedId:"develop/integrate/tutorial/getting-started",id:"develop/integrate/tutorial/getting-started",title:"Getting started",description:"If you are not yet familiar with the Everscale network, we recommend that you read the Everscale overview page, where you can learn about the main features and benefits of the network.",source:"@site/../../src/develop/integrate/tutorial/getting-started.md",sourceDirName:"develop/integrate/tutorial",slug:"/develop/integrate/tutorial/getting-started",permalink:"/develop/integrate/tutorial/getting-started",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/integrate/tutorial/getting-started.md",tags:[],version:"current",lastUpdatedAt:1684270521,formattedLastUpdatedAt:"May 16, 2023",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Tutorials",permalink:"/develop/integrate/tutorial"},next:{title:"Add EVER to your project",permalink:"/develop/integrate/tutorial/add-everscale-to-your-exchange"}},s={},c=[{value:"Tools",id:"tools",level:2},{value:"APIs",id:"apis",level:2}],p={toc:c},u="wrapper";function d(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting started"),(0,o.kt)("p",null,"If you are not yet familiar with the Everscale network, we recommend that you read the ",(0,o.kt)("a",{parentName:"p",href:"/learn/overview"},"Everscale overview page"),", where you can learn about the main features and benefits of the network."),(0,o.kt)("h2",{id:"tools"},"Tools"),(0,o.kt)("p",null,"Also, you will need to learn the basic ",(0,o.kt)("a",{parentName:"p",href:"../../tools/"},"development tools")," for integration.\nAmong them, you will find options to connect to the blockchain, create a deposit account, etc."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/develop/tools/tonos-cli"},"TONOS-CLI")," - command line tool for the TON blockchain that allows you to deploy any smart contracts on the blockchain, call all contract methods, sign transactions, and generally manage your account."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/develop/nodes-clients/evercloud"},"EVER Cloud")," - EVER Cloud allows you to work with the Everscale blockchain and development network without having to launch your own node. "),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/ever-sdk"},"Ever SDK")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"/develop/tutorial/ton-wallet-api"},"Wallet API")," - HTTP Api solution for a wallet running on the Everscale network"),(0,o.kt)("h2",{id:"apis"},"APIs"),(0,o.kt)("p",null,"We highly recommend reading the APIs of the most popular products at Everscale:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://docs.flatqube.io/integrate/open-api"},"FlatQube")," - Everscale's main DEX. Check out the official documentation pages for DEX Indexer and Farming Indexer. "),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"}," The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.\nPlease be informed that our documentation can be ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/everscale-org/docs/issues"},"edited via GitHub"),".",(0,o.kt)("br",{parentName:"p"}),"\n","Also please make sure to consult our rules and rewards policy via ",(0,o.kt)("a",{parentName:"p",href:"https://docs.everscale.network/contribute/hot-streams/documentations"},"this link"),".",(0,o.kt)("br",{parentName:"p"}),"\n","Feel free to join ",(0,o.kt)("a",{parentName:"p",href:"https://t.me/+C2IpQXWZtCwxYzEy"},"Everscale Documentation Development Telegram chat")," and ",(0,o.kt)("a",{parentName:"p",href:"https://t.me/+Vca1Gs6uPzIyNWVi"},"Everscale Developers Onboarding Telegram chat"),"!")))}d.isMDXComponent=!0}}]);