"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[3513],{3905:(t,e,a)=>{a.d(e,{Zo:()=>p,kt:()=>h});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},i=Object.keys(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)a=i[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var s=n.createContext({}),d=function(t){var e=n.useContext(s),a=e;return t&&(a="function"==typeof t?t(e):l(l({},e),t)),a},p=function(t){var e=d(t.components);return n.createElement(s.Provider,{value:e},t.children)},c="mdxType",u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,i=t.originalType,s=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),c=d(a),m=r,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||i;return a?n.createElement(h,l(l({ref:e},p),{},{components:a})):n.createElement(h,l({ref:e},p))}));function h(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=a.length,l=new Array(i);l[0]=m;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[c]="string"==typeof t?t:r,l[1]=o;for(var d=2;d<i;d++)l[d]=a[d];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},3394:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var n=a(7462),r=(a(7294),a(3905));const i={title:"Core description",sidebar_position:0,slug:"/standard/TIP-4"},l="Non-Fungible Token",o={unversionedId:"standard/TIP-4/core-description",id:"standard/TIP-4/core-description",title:"Core description",description:"Abstract",source:"@site/../../src/standard/TIP-4/core-description.md",sourceDirName:"standard/TIP-4",slug:"/standard/TIP-4",permalink:"/standard/TIP-4",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/standard/TIP-4/core-description.md",tags:[],version:"current",lastUpdatedAt:1685877644,formattedLastUpdatedAt:"Jun 4, 2023",sidebarPosition:0,frontMatter:{title:"Core description",sidebar_position:0,slug:"/standard/TIP-4"},sidebar:"tutorialSidebar",previous:{title:"2. Internally-owned Fungible Token Interface",permalink:"/standard/TIP-3.2"},next:{title:"4.1. Non-Fungible Token",permalink:"/standard/TIP-4.1"}},s={},d=[{value:"Abstract",id:"abstract",level:2},{value:"Motivation",id:"motivation",level:2},{value:"Architecture",id:"architecture",level:2},{value:"(Status:Review) Non-Fungible Token (TIP-4.1)",id:"statusreview-non-fungible-token-tip-41",level:2},{value:"(Status:Review) Non-Fungible Token JSON Metadata (TIP-4.2)",id:"statusreview-non-fungible-token-json-metadata-tip-42",level:2},{value:"(Status:Review) On-chain indexes (TIP-4.3)",id:"statusreview-on-chain-indexes-tip-43",level:2},{value:"(Status:Draft) On-chain storage (TIP-4.4)",id:"statusdraft-on-chain-storage-tip-44",level:2},{value:"(Status:Draft) Don&#39;t Be Evil NFT licensing (TIP-4.5)",id:"statusdraft-dont-be-evil-nft-licensing-tip-45",level:2},{value:"Authors",id:"authors",level:2},{value:"Implementation",id:"implementation",level:2},{value:"References",id:"references",level:2}],p={toc:d},c="wrapper";function u(t){let{components:e,...a}=t;return(0,r.kt)(c,(0,n.Z)({},p,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"non-fungible-token"},"Non-Fungible Token"),(0,r.kt)("h2",{id:"abstract"},"Abstract"),(0,r.kt)("p",null,"The following standard describes the basic idea of distributed non-fungible token architecture."),(0,r.kt)("h2",{id:"motivation"},"Motivation"),(0,r.kt)("p",null,"The suggested standard differs considerably from Ethereum ERC721 and other smart contract token standards with single registry because of its distributed nature related to Everscale blockchain particularities.\nGiven that Everscale has a storage fee, TIP4  is fully distributed and implies separate storage of each NFT."),(0,r.kt)("h2",{id:"architecture"},"Architecture"),(0,r.kt)("p",null,"General information about NFT collection is stored in the NFT collection contract. Each NFT deployed in separate smart contracts and links to NFT collection contract Smart contract architecture based on:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Consider asynchronous type of Everscale blockchain. Use callbacks and asynchronous getters;"),(0,r.kt)("li",{parentName:"ul"},"Standardizes one NFT - one smart contract. "),(0,r.kt)("li",{parentName:"ul"},"Gas fee management practicals. "),(0,r.kt)("li",{parentName:"ul"},"Use ",(0,r.kt)("a",{parentName:"li",href:"/standard/TIP-6.1"},"TIP-6.1"))),(0,r.kt)("h2",{id:"statusreview-non-fungible-token-tip-41"},"(Status:Review) ",(0,r.kt)("a",{parentName:"h2",href:"/standard/TIP-4.1"},"Non-Fungible Token (TIP-4.1)")),(0,r.kt)("p",null,"General information about NFT collection and NFT tokens. All NFT must implement ",(0,r.kt)("a",{parentName:"p",href:"/standard/TIP-4.1"},"TIP-4.1")),(0,r.kt)("h2",{id:"statusreview-non-fungible-token-json-metadata-tip-42"},"(Status:Review) ",(0,r.kt)("a",{parentName:"h2",href:"/standard/TIP-4.2"},"Non-Fungible Token JSON Metadata (TIP-4.2)")),(0,r.kt)("p",null,"General information about NFT metadata. ",(0,r.kt)("a",{parentName:"p",href:"/standard/TIP-4.2"},"TIP-4.2")," is optional, but can be used for displaying NFT on marketplaces, wallets and web."),(0,r.kt)("h2",{id:"statusreview-on-chain-indexes-tip-43"},"(Status:Review) ",(0,r.kt)("a",{parentName:"h2",href:"/standard/TIP-4.3"},"On-chain indexes (TIP-4.3)")),(0,r.kt)("p",null,"On-chain Indexes solves easy and fast searching any data in blockchain. ",(0,r.kt)("a",{parentName:"p",href:"/standard/TIP-4.3"},"TIP-4.3")," is optional, but can be use for find all your NFT with one ",(0,r.kt)("a",{parentName:"p",href:"https://main.ton.dev/graphql"},"dApp")," query."),(0,r.kt)("h2",{id:"statusdraft-on-chain-storage-tip-44"},"(Status:Draft) ",(0,r.kt)("a",{parentName:"h2",href:"/standard/TIP-4.4"},"On-chain storage (TIP-4.4)")),(0,r.kt)("p",null,"Using the Storage contract, you can store NFT-related bytes in blockchain. ",(0,r.kt)("a",{parentName:"p",href:"/standard/TIP-4.4"},"TIP-4.4")," is optional, but can be used for fault tolerance. If off-chain services are unavailable, the user will view NFT-related bytes, because it is stored on-chain."),(0,r.kt)("h2",{id:"statusdraft-dont-be-evil-nft-licensing-tip-45"},"(Status:Draft) ",(0,r.kt)("a",{parentName:"h2",href:"/standard/TIP-4.5"},"Don't Be Evil NFT licensing (TIP-4.5)")),(0,r.kt)("p",null,"The standard adds the support of ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/a16z/a16z-contracts"},"Can't Be Evil NFT licenses")," ",(0,r.kt)("a",{parentName:"p",href:"https://a16zcrypto.com/introducing-nft-licenses/"},"introduced")," by ",(0,r.kt)("a",{parentName:"p",href:"https://a16z.com"},"Andreessen.Horowitz"),". ",(0,r.kt)("a",{parentName:"p",href:"/standard/TIP-4.5"},"TIP-4.5")," is optional, but can be used for clarifying the legal basis of NFT usage by the owner."),(0,r.kt)("h2",{id:"authors"},"Authors"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Author"),(0,r.kt)("th",{parentName:"tr",align:null},"Command"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"mailto:rualekseev@gmail.com"},"Aleksand Aleksev")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://grandbazar.io"},"grandbazar.io"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Aleksandr Khramtsov"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://broxus.com/"},"broxus"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Vladislav Ponomarev"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://broxus.com/"},"broxus"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://t.me/nedobylskiy"},"Andrey Nedobylskiy")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://svoi.dev"},"svoi.dev"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://t.me/SuperArmor"},"Anton Platonov")),(0,r.kt)("td",{parentName:"tr",align:null},"community member")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://t.me/kokkekpek"},"Nikita")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://numiz.org/"},"numiz.org"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://t.me/id_xz"},"Oleg Varnov")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://numiz.org/"},"numiz.org"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Slava Semenchuk"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("a",{parentName:"td",href:"https://scalepunks.com"},"scalepunks.com"))))),(0,r.kt)("h2",{id:"implementation"},"Implementation"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/itgoldio/everscale-tip"},"itgold")," implementation"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"MIT licensed."),(0,r.kt)("li",{parentName:"ul"},"A library of modular, reusable  smart contracts."),(0,r.kt)("li",{parentName:"ul"},"Samples and tests ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/itgoldio/everscale-tip-samples"},"here"))),(0,r.kt)("h2",{id:"references"},"References"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://eips.ethereum.org/EIPS/eip-721"},"Ethereum EIP-721")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.metaplex.com/token-metadata/specification"},"Solana v1.2.0")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/ton-blockchain/TIPs/issues/62"},"TON NFT"),", ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/ton-blockchain/TIPs/issues/64"},"TON DATA")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md"},"Tezos TZIP12"))))}u.isMDXComponent=!0}}]);