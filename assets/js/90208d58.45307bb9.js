"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[3214],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>h});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=c(a),u=i,h=p["".concat(s,".").concat(u)]||p[u]||k[u]||r;return a?n.createElement(h,o(o({ref:t},d),{},{components:a})):n.createElement(h,o({ref:t},d))}));function h(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,o=new Array(r);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:i,o[1]=l;for(var c=2;c<r;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},5456:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>k,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var n=a(7462),i=(a(7294),a(3905));const r={},o="Catchain Protocol Messages & Structures",l={unversionedId:"arch/consensus/messages",id:"arch/consensus/messages",title:"Catchain Protocol Messages & Structures",description:"Catchain protocol consists of:",source:"@site/../../src/arch/consensus/40-messages.md",sourceDirName:"arch/consensus",slug:"/arch/consensus/messages",permalink:"/arch/consensus/messages",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/arch/consensus/40-messages.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",sidebarPosition:40,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Catchain Overview",permalink:"/arch/consensus/overview"},next:{title:"TL-B and BoC",permalink:"/arch/tlb-and-boc"}},s={},c=[{value:"Internal structures:",id:"internal-structures",level:2},{value:"References",id:"references",level:2}],d={toc:c},p="wrapper";function k(e){let{components:t,...a}=e;return(0,i.kt)(p,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"catchain-protocol-messages--structures"},"Catchain Protocol Messages & Structures"),(0,i.kt)("p",null,"Catchain protocol consists of:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"incoming event\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.blockUpdate"),";"),(0,i.kt)("li",{parentName:"ul"},"required outgoing queries\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getBlock"),"\xa0and\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getDifference"),";"),(0,i.kt)("li",{parentName:"ul"},"optional outgoing queries (not used in the catchain component itself, but might be sent externally):\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getBlocks, catchain.getBlockHistory;")),(0,i.kt)("li",{parentName:"ul"},"queries responses:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.BlockResult, catchain.Sent, catchain.Difference;")),(0,i.kt)("li",{parentName:"ul"},"internal structures that can be used in all events and queries above.")),(0,i.kt)("p",null,"Main flows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Validator synchronization request:"),(0,i.kt)("li",{parentName:"ol"},"validator periodically and randomly updates the list of neighbour validators (see the description above);"),(0,i.kt)("li",{parentName:"ol"},"validator periodically chooses one random validator from a list of neighbor validators (see description above) and sends to it:"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getDifference"),"\xa0request with a list of heights for blocks already delivered to validator-requester;"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getBlock"),"\xa0request for a top block's dependencies (in terms of height) which is received but not fully resolved (not all dependencies are received by a validator); validator randomly chooses up to 16 dependencies for a top block and sends a catchain.getBlock request for each of them."),(0,i.kt)("li",{parentName:"ol"},"Validator synchronization events processing:"),(0,i.kt)("li",{parentName:"ol"},"validator receives incoming\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.blockUpdate"),"\xa0events and updates the internal block's data structures."),(0,i.kt)("li",{parentName:"ol"},"Validator forks event processing:"),(0,i.kt)("li",{parentName:"ol"},"validator receives an incoming\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.differenceFork"),'\xa0event, checks the fork proof and marks the counterparty validator that sent fork as blamed; so all data from this validator will be discarded; additionally, the same height block received from this validator (fork block) will be marked as "ill" as well as all dependent blocks from it.'),(0,i.kt)("li",{parentName:"ol"},"Consensus iteration")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"each\xa0",(0,i.kt)("strong",{parentName:"li"},"catchain.blockUpdate"),"\xa0may lead to the decision where one or several catchain blocks on the top of counter-party validators\u2019 are fully resolved (meaning these blocks will have enough data including dependencies to be used in consensus calculations);"),(0,i.kt)("li",{parentName:"ul"},"a validator randomly chooses up to\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"CatChainOptions::max_deps"),"(equal to 4 for now) top blocks from different counter-party validators and sends them for further processing to the validator session component;"),(0,i.kt)("li",{parentName:"ul"},"the validator session component merges such dependencies and gets a new merged state;"),(0,i.kt)("li",{parentName:"ul"},"according to the new state, the validator session component generates incremental messages that transform the state before the merge (previous block) to a state after merge (new block). This batch of messages is included as a payload to a Catchain structure\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.data.vector"),"\xa0and is used as a new Catchain block data: The height of a catchain block is equal to the iteration index increased sequentially after each consensus iteration;"),(0,i.kt)("li",{parentName:"ul"},"the new Catchain block is stored on the current validator without being immediately sent to other validators, so counter-party validators have to request current validator for blocks update using the\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.getDifference"),"\xa0request to obtain computed blocks (pull model).")),(0,i.kt)("h2",{id:"internal-structures"},"Internal structures:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"1.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.dep"))),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"src"),":\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- index of validator that generated the block;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"height"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- height of the block on a validator with index\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"src"),";"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"data_hash"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int256"),"\xa0- block data hash; used in block pre-validation;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"signature"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"bytes"),"\xa0- signature done by a validator with index\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"src"),"\xa0of the block; needed for pre-validation of the block.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"2.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.data"))),(0,i.kt)("p",null,"This structure describes the block with links to the previous block on the validator and dependent blocks used to generate the current one. For the specified (",(0,i.kt)("inlineCode",{parentName:"p"},"src"),",\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"height"),") there can be only one previous block in a Catchain. If forks are detected, the validator that sent the second block candidate for specified (",(0,i.kt)("inlineCode",{parentName:"p"},"src"),",\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"height"),") is marked as blamed and all its data is discarded. The\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block.data"),"\xa0structure described below:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"prev"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.dep"),"\xa0****- previous block description;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"deps"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector of catchain.block.dep"),"\xa0- list of dependent blocks used to generate this block.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"3.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block"))),(0,i.kt)("p",null,"This structure describes a block with a payload."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"incarnation"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int256"),"\xa0- ID of the Catchain session equal to the hash of the first block used at the start of Catchain session;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"src"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- index of the validator that generated the block;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"height"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- height of the block on a validator with index\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"src"),";"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"data"),":\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.data"),"\xa0- block header with information about the previous block and dependent blocks used to generate the current block.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"4.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.inner.Data"))),(0,i.kt)("p",null,"This is a variable structure with one of the following subtypes:\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block.data.badBlock"),",\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block.data.fork"),",\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block.data.nop"),",\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block.data.vector"),". This structure is placed immediately after the\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.block"),"\xa0structure and contains the corresponding block payload."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.data.vector"))),(0,i.kt)("li",{parentName:"ul"},"This message contains the internal validator session component data represented by a list of messages specific for a validator session. The\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.data.vector"),"\xa0structure is used as a container to distribute consensus algorithm data between validators."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"msgs"),":\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector of bytes"),"\xa0- internal validator session data (is used as a buffer of bytes for Catchain component)."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.data.fork"))),(0,i.kt)("li",{parentName:"ul"},"This message contains fork proofs for a specified pair of blocks. When two blocks with different hashes, but the same\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"height"),"\xa0are received from a validator with index\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"src"),", a fork is detected. In this case, the validator in question must be blamed and all incoming data from it must be discarded. All blocks dependent on a detected fork must be discarded."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"left"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.Dep"),"\xa0- first known block;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"right"),":\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.Dep"),"\xa0- detected fork block."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.data.badBlock"))),(0,i.kt)("li",{parentName:"ul"},"Reserved and is not used at the moment"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.block.data.nop"))),(0,i.kt)("li",{parentName:"ul"},"Reserved and is not used at the moment")),(0,i.kt)("p",null,"Events:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"1.\xa0",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.blockUpdate"))),(0,i.kt)("p",null,"This event informs the validator that a specific block is updated. The validator then has to add it to the processing queue, check for forks and check all upstream and downstream block dependencies. Dependency checks may result in one or multiple block status updates. Once fully resolved, a block can be used as a source for state computation of the next consensus iteration. A validator session iteration uses a random subset of fully resolved blocks (blocks having all dependent blocks received and pre-validated by the current validator). This subset contains blocks from different validators for further merging and building a new Catchain block according to the resulting merged state.\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.blockUpdate"),"\xa0has the following structure:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"block"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block"),"\xa0- block description with a mandatory\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.inner.Data"),"\xa0payload."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"signature"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"bytes"),"\xa0- block signature performed by a validator (with validator index\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"block.src"),"); used for block pre-validation.")),(0,i.kt)("p",null,"Queries:"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"1.\xa0",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.getBlock")),"\xa0(mandatory)"),(0,i.kt)("p",null,"This query is used by the catchain component to request an absent block from another validator."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Request:"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"block"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int256"),"\xa0- hash of the requested block;"),(0,i.kt)("li",{parentName:"ul"},"Response \u2014\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.BlockResult")),"\xa0(variadic):"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"`catchain.blockResult"),"`\xa0sent if the block is found"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"block"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block"),"\xa0- description of the requested block with\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.inner.Data"),"payload"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.blockNotFound")),"\xa0- sent if the block is not found")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"2.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.getBlocks")),"\xa0(optional; not used by Catchain component internally)"),(0,i.kt)("p",null,"This query is used to request several blocks from another validator."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Request:"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"blocks"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector int256"),"\xa0- the list of requested blocks;"),(0,i.kt)("li",{parentName:"ul"},"Response \u2014\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.sent")),":"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cnt"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- the number of blocks sent back."),(0,i.kt)("li",{parentName:"ul"},"Side effect:"),(0,i.kt)("li",{parentName:"ul"},"Several\xa0",(0,i.kt)("strong",{parentName:"li"},"`catchain.blockUpdate"),"`\xa0events are sent back to the validator-requester before response.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"3.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.getDifference")),"\xa0(mandatory)"),(0,i.kt)("p",null,"This is the initial request sent by one validator to another one to receive absent blocks. The validator-requester sends \u0430 list of delivered heights to the counter-party and expects to get back blocks that were not delivered (difference). Initially, the validator-requester may send a list of zero heights to the counter-party to initiate synchronization of blocks. Also, the\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"catchain.getDifference"),"\xa0request should be regularly made to neighbor validators to synchronize with them."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Request:"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"rt"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector int"),"\xa0- the list of heights of blocks already delivered to a validator-requester."),(0,i.kt)("li",{parentName:"ul"},"Response \u2014\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.Difference")),"\xa0(variadic):"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"`catchain.difference"),"`\xa0sent when no forks are detected (regular case)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sent_upto"),":\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector int"),"\xa0- the vector of heights known on a validator-responder; not used in a Catchain component now;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.differenceFork")),"\xa0- sent when forks are detected"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"left"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.dep"),"\xa0- the first known block;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"right"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"catchain.block.dep"),"\xa0- the detected fork block."),(0,i.kt)("li",{parentName:"ul"},"Side effect:"),(0,i.kt)("li",{parentName:"ul"},"Several\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.blockUpdate")),"\xa0events sent back to a validator-requester before response\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.difference"),"."))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"4.",(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.getBlockHistory")),"\xa0(optional, not used by the Catchain component internally)"),(0,i.kt)("p",null,"This query is used to obtain blocks used to build a block with a specified reverse height (number of blocks reverse to the specified block)."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Request:"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"block"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int256"),"\xa0- the target block hash;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"height"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"long"),"\xa0- the number predecessor blocks of the\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"block"),";"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"stop_if"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"vector int256"),"\xa0- list of block hashes which should stop search if one of them is detected during the history processing."),(0,i.kt)("li",{parentName:"ul"},"Response \u2014\xa0",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"catchain.sent")),":"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"cnt"),"\xa0:\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"int"),"\xa0- the number of blocks sent back.")),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Pease, Marshall; Shostak, Robert; Lamport, Lesli Reaching Agreement in the Presence of Faults,\xa0",(0,i.kt)("a",{parentName:"li",href:"https://dl.acm.org/doi/10.1145/322186.322188"},"https://dl.acm.org/doi/10.1145/322186.322188")),(0,i.kt)("li",{parentName:"ol"},"Yuval Marcus, Ethan Heilman, Sharon Goldberg. Low-Resource Eclipse Attackson Ethereum\u2019s Peer-to-Peer Network,\xa0",(0,i.kt)("a",{parentName:"li",href:"https://eprint.iacr.org/2018/236.pdf"},"https://eprint.iacr.org/2018/236.pdf")),(0,i.kt)("li",{parentName:"ol"},"Ethan Buchman, Tendermint: Byzantine Fault Tolerance in the Age of Blockchains,\xa0",(0,i.kt)("a",{parentName:"li",href:"https://atrium.lib.uoguelph.ca/xmlui/bitstream/handle/10214/9769/Buchman_Ethan_201606_MAsc.pdf"},"https://atrium.lib.uoguelph.ca/xmlui/bitstream/handle/10214/9769/Buchman_Ethan_201606_MAsc.pdf")),(0,i.kt)("li",{parentName:"ol"},"Miguel Castro and Barbara Liskov. Practical Byzantine Fault Tolerance,\xa0",(0,i.kt)("a",{parentName:"li",href:"http://pmg.csail.mit.edu/papers/osdi99.pdf"},"http://pmg.csail.mit.edu/papers/osdi99.pdf")),(0,i.kt)("li",{parentName:"ol"},"Aggelos Kiayias, Alexander Russell, Bernardo David, Roman Oliynykov. Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol,\xa0",(0,i.kt)("a",{parentName:"li",href:"https://eprint.iacr.org/2016/889.pdf"},"https://eprint.iacr.org/2016/889.pdf")),(0,i.kt)("li",{parentName:"ol"},"V. Zamfir, \u201cCasper the friendly ghost: A correct by constructionblockchain consensus protocol,\u201d\xa0",(0,i.kt)("a",{parentName:"li",href:"https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf"},"https://github.com/ethereum/research/blob/master/papers/CasperTFG/CasperTFG.pdf")),(0,i.kt)("li",{parentName:"ol"},"Jing Chen, Silvio Micali. Algorand,\xa0",(0,i.kt)("a",{parentName:"li",href:"https://arxiv.org/pdf/1607.01341.pdf"},"https://arxiv.org/pdf/1607.01341.pdf"))))}k.isMDXComponent=!0}}]);