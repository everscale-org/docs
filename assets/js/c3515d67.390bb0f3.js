"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[8524],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return f}});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(a),f=o,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||r;return a?n.createElement(m,l(l({ref:t},p),{},{components:a})):n.createElement(m,l({ref:t},p))}));function f(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,l=new Array(r);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var c=2;c<r;c++)l[c]=a[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5424:function(e,t,a){a.r(t),a.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return i},metadata:function(){return c},toc:function(){return u}});var n=a(7462),o=a(3366),r=(a(7294),a(3905)),l=["components"],i={title:"Fee calculation details",description:"Explanation of the formulas for fee calculation"},s="Fee calculation",c={unversionedId:"arch/fee-calculation",id:"arch/fee-calculation",title:"Fee calculation details",description:"Explanation of the formulas for fee calculation",source:"@site/../../src/arch/03-fee-calculation.md",sourceDirName:"arch",slug:"/arch/fee-calculation",permalink:"/arch/fee-calculation",editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/arch/03-fee-calculation.md",tags:[],version:"current",lastUpdatedAt:1651659249,formattedLastUpdatedAt:"5/4/2022",sidebarPosition:3,frontMatter:{title:"Fee calculation details",description:"Explanation of the formulas for fee calculation"},sidebar:"tutorialSidebar",previous:{title:"Managing gas",permalink:"/arch/managing-gas"},next:{title:"Security",permalink:"/arch/security"}},p={},u=[{value:"Introduction",id:"introduction",level:2},{value:"Storage fees",id:"storage-fees",level:2},{value:"Message fees",id:"message-fees",level:2},{value:"Outbound messages",id:"outbound-messages",level:3},{value:"Routing",id:"routing",level:4},{value:"Inbound external messages",id:"inbound-external-messages",level:3},{value:"Action fees",id:"action-fees",level:2},{value:"Gas fees",id:"gas-fees",level:2}],d={toc:u};function f(e){var t=e.components,a=(0,o.Z)(e,l);return(0,r.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"fee-calculation"},"Fee calculation"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"Transaction fees consist of a few types of different fees connected to the execution of a single transaction. Transactions itself are complex processes, and fees are paid relative to different stages of executing them."),(0,r.kt)("p",null,"In this document, we explain how the fees are calculated."),(0,r.kt)("p",null,"We shall define transaction_fee as a sum of all fees for a single transaction."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"transaction_fee = inbound_external_message_fee\n                + storage_fees\n                + gas_fees\n                + total_action_fees\n                + outbound_internal_messages_fee\n")),(0,r.kt)("p",null,"Where:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"inbound_external_message_fee")," \u2014 is deducted, if an ",(0,r.kt)("a",{parentName:"p",href:"/arch/fee-calculation#inbound-external-messages"},"inbound external message")," is imported in the transaction."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"storage_fees")," \u2014 ",(0,r.kt)("a",{parentName:"p",href:"/arch/fee-calculation#storage-fees"},"storage costs")," since the moment of the last transaction."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"gas_fees")," \u2014 include all gas fees associated with the transaction. You can find more info in the ",(0,r.kt)("a",{parentName:"p",href:"/arch/managing-gas#gas-calculation-basics"},"Gas calculation basics")," section."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"total_action_fees")," \u2014 fees for performing ",(0,r.kt)("em",{parentName:"p"},"send message")," ",(0,r.kt)("a",{parentName:"p",href:"/arch/fee-calculation#action-fees"},"actions"),"."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"outbound_internal_messages_fee")," \u2014 is calculated as a sum of fees for all ",(0,r.kt)("a",{parentName:"p",href:"/arch/fee-calculation#outbound-messages"},"outbound internal messages")," generated by the transaction."),(0,r.kt)("p",null,"Depending on the nature of the transaction, all of these except storage fees may not be applicable."),(0,r.kt)("p",null,"Below we examine these types of fees in detail."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Block creation fee is not to be confused with the fees discussed in this document. Block creation fee is the new coins minted by the elector contract and distributed among validators as reward for creating blocks. It is not part of transaction fees.")),(0,r.kt)("h2",{id:"storage-fees"},"Storage fees"),(0,r.kt)("p",null,"Every transaction in TON has a storage phase that implies a certain storage fee charged on an account balance. This fee is charged for the period between transactions and is calculated according to the following formula:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"storage_fees = CEIL(\n    (\n        account.bits\n        * global_bit_price\n        + account.cells\n        * global_cell_price\n    ) * period / 2 ^ 16\n)\n")),(0,r.kt)("p",null,"Where:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"account.bits")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"account.cells")," \u2014 stand for a number of bits and cells in the Account structure represented as tree of cells (including code and data)."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"global_bit_price")," \u2014 is a global configuration parameter (",(0,r.kt)("inlineCode",{parentName:"p"},"p18")," for both masterchain and workchains), price for storing one bit."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"global_cell_price")," \u2014 another global configuration parameter (",(0,r.kt)("inlineCode",{parentName:"p"},"p18")," for both masterchain and workchains), price for storing one cell."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"period")," \u2014 number of seconds since previous storage fee payment."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," While ",(0,r.kt)("inlineCode",{parentName:"p"},"account.bits")," are generally easy to estimate, the ",(0,r.kt)("inlineCode",{parentName:"p"},"account.cells")," value can vary greatly for different types of data. A cell can contain no more than 1023 bits and 4 references to other cells. Contract code and numerical variables tend to be packed into cells effectively, resulting in mostly full cells, and thus a minimal number of cells needed to store the data. More complex data structures can be packed into cells less efficiently, taking up more cells to store the same amount of data.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example:")," Let's calculate a minimal fee for storing 1KB of data for the duration of one day on a workchain:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"global_bit_price")," = 1"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"global_cell_price")," = 500"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"period")," = 86400 seconds"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"account.bits")," = 8192"),(0,r.kt)("p",null,"The minimal ",(0,r.kt)("inlineCode",{parentName:"p"},"account.cells")," value for 8192 bits of data is 9 (rounding 8192/1023 up to the nearest integer)."),(0,r.kt)("p",null,"Thus the minimum storage fee would be calculated as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"storage_fees = CEIL(\n    (\n        8192\n        * 1\n        + 9\n        * 500\n    ) * 86400 / 65536\n) = 16733 nanotokens = 0.000016733 tokens\n")),(0,r.kt)("p",null,"Real storage fees for 1KB account can be higher, depending on the specific features of the contract."),(0,r.kt)("p",null,"If the account balance is less than the due storage fee, the account is frozen and its balance is subtracted from storage fee and reduced to zero. Remaining storage fee is stored in account as debt."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Current global configuration can be always reviewed on ","[ever.live]","( https:/ /ever.live/) in the master config section of the latest key block details (",(0,r.kt)("a",{parentName:"p",href:"https://net.ever.live/blocks?section=details&id=8cee868a94b1e22794a927279286dc95498310cda982f4657e351a3da693cf27"},"example"),") ",(0,r.kt)("inlineCode",{parentName:"p"},"FIXME broken link"),". It can only be changed by a vote of validators.")),(0,r.kt)("h2",{id:"message-fees"},"Message fees"),(0,r.kt)("p",null,"Every message is subject to a forwarding fee, which is calculated according to the following formula:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"msg_fwd_fee = (\n    lump_price + CEIL(\n        (\n            bit_price\n            * msg.bits\n            + cell_price\n            * msg.cells\n        ) / 2 ^ 16\n    )\n)\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"msg.bits")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.cells")," are calculated from message represented as a tree of cells. Root cell is not counted. ",(0,r.kt)("inlineCode",{parentName:"p"},"lump_price"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"bit_price"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"cell_price")," are contained in global config parameters ",(0,r.kt)("inlineCode",{parentName:"p"},"p24")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"p25"),", and can and can only be changed by a vote of validators."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Like in storage fees, ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.bits")," are generally easy to estimate, while the ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.cells")," value can vary for different types of messages.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example:")," Let's calculate a minimal forward fee for sending a 1KB message on a workchain:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"lump_price")," = 10000000"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"bit_price")," = 655360000"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"cell_price")," = 65536000000"),(0,r.kt)("p",null,"To calculate ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.bits")," we subtract the root cell bits from the total message bits. For this example we'll assume that the root cell is filled completely (usually this is not the case, and the subtracted value is smaller, which results in a higher fee):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"msg.bits = 8192 - 1023 = 7169\n")),(0,r.kt)("p",null,"To calculate ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.cells")," we subtract the root cell from the total umber of cells. The minimal number of cells in a 1 KB message is 9 (rounding 8192/1023 up to the nearest integer). Thus ",(0,r.kt)("inlineCode",{parentName:"p"},"msg.cells")," is calculated as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"msg.bits = 9 - 1 = 8\n")),(0,r.kt)("p",null,"The minimum forward fee for a 1KB message would be calculated as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"msg_fwd_fee = (\n    10000000 + CEIL(\n        (\n            655360000\n            * 7169\n            + 65536000000\n            * 8\n        ) / 65536\n    )\n) = 89690000 nanotokens = 0.08969 tokens\n")),(0,r.kt)("p",null,"Real forward fees for 1 KB messages may be higher, depending on the type and contents of the message."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Current global configuration can be always reviewed on ",(0,r.kt)("a",{parentName:"p",href:"https://ever.live/"},"ever.live")," in the master config section of the latest key block details (",(0,r.kt)("a",{parentName:"p",href:"https://net.ton.live/blocks?section=details&id=8cee868a94b1e22794a927279286dc95498310cda982f4657e351a3da693cf27"},"example"),") ",(0,r.kt)("inlineCode",{parentName:"p"},"FIXME broken link"),".")),(0,r.kt)("h3",{id:"outbound-messages"},"Outbound messages"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"outbound_internal_messages_fee")," is calculated ",(0,r.kt)("strong",{parentName:"p"},"as a sum")," of outbound internal message fees for every message generated as result of transaction execution:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"outbound_internal_messages_fee = SUM(\n    out_int_msg.header.fwd_fee\n    + out_int_msg.header.ihr_fee\n)\n")),(0,r.kt)("p",null,"Where"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"out_int_msg.header.fwd_fee")," is a part of the standard forward fee for the outbound internal message."),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"out_int_msg.header.ihr_fee")," is currently disabled."),(0,r.kt)("h4",{id:"routing"},"Routing"),(0,r.kt)("p",null,"The forward fee for outbound internal message is split into ",(0,r.kt)("inlineCode",{parentName:"p"},"int_msg_mine_fee")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"int_msg_remain_fee"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"msg_forward_fee = int_msg_mine_fee + int_msg_remain_fee\n")),(0,r.kt)("p",null,"Where:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"int_msg_mine_fee = msg_forward_fee * first_frac / 2 ^ 16\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"first_frac")," \u2014 is contained in global config parameters ",(0,r.kt)("inlineCode",{parentName:"p"},"p24")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"p25"),", and determines the fraction of the fee, that the current set of validators receive."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Current global configuration can be always reviewed on ",(0,r.kt)("a",{parentName:"p",href:"https://ever.live/"},"ever.live")," in the master config section of the latest key block details (",(0,r.kt)("a",{parentName:"p",href:"https://net.ton.ever/blocks?section=details&id=8cee868a94b1e22794a927279286dc95498310cda982f4657e351a3da693cf27"},"example"),") ",(0,r.kt)("inlineCode",{parentName:"p"},"FIXME broken link"),".")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"int_msg_mine_fee")," then becomes part of transaction action fees (see below)."),(0,r.kt)("p",null,"The remaining ",(0,r.kt)("inlineCode",{parentName:"p"},"int_msg_remain_fee")," is placed in the header of outbound internal message (becoming ",(0,r.kt)("inlineCode",{parentName:"p"},"out_int_msg.header.fwd_fee"),") and will go to validators who will process the message."),(0,r.kt)("p",null,"If, while being forwarded to the destination address, the message passes through additional validator sets (i.e. if the validator set changes more than once while the message is being forwarded), a part of ",(0,r.kt)("inlineCode",{parentName:"p"},"out_int_msg.header.fwd_fee")," is payed to the relevant validator set every time and the remaining fee in the message header is reduced by this amount:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"intermediate_fee = out_int_msg.header.fwd_fee * next_frac / 2 ^ 16\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"next_frac")," \u2014 is contained in global config parameters ",(0,r.kt)("inlineCode",{parentName:"p"},"p24")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"p25"),", and determines the fraction of the remaining forward fee, that intermediary validators receive."),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Current global configuration can be always reviewed on ",(0,r.kt)("a",{parentName:"p",href:"https://ever.live/"},"ever.live")," in the master config section of the latest key block details (",(0,r.kt)("a",{parentName:"p",href:"https://net.ever.live/blocks?section=details&id=8cee868a94b1e22794a927279286dc95498310cda982f4657e351a3da693cf27"},"example"),") ",(0,r.kt)("inlineCode",{parentName:"p"},"FIXME broken link"),".")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," Length of route does not affect the initial calculation of the forward fee. The fee is simply split between all involved validators according to global config parameters.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Note:")," If an exception is thrown, and a bounce message is generated, it is subject to fees, just like a single regular outbound message.")),(0,r.kt)("h3",{id:"inbound-external-messages"},"Inbound external messages"),(0,r.kt)("p",null,"Whenever an inbound external message needs to be imported for transaction execution, the for this action fee is calculated according to the ",(0,r.kt)("a",{parentName:"p",href:"/arch/fee-calculation#message-fees"},"standard forwarding fee formula"),", and paid to the current validators."),(0,r.kt)("h2",{id:"action-fees"},"Action fees"),(0,r.kt)("p",null,"Action fees pay for performing 'send message' actions. They consist of all fees for external outbound messages, and the first fraction of internal outbound message fees. They are calculated as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"total_action_fees = total_out_ext_msg_fwd_fee + total_int_msg_mine_fee\n")),(0,r.kt)("p",null,"where:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"total_out_ext_msg_fwd_fee")," \u2014 sum of implicit forward fee for all generated outbound external messages.\n",(0,r.kt)("inlineCode",{parentName:"p"},"total_int_msg_mine_fee")," \u2014 sum of 'mine' parts of message forward fees for outbound internal messages.\n",(0,r.kt)("inlineCode",{parentName:"p"},"total_fwd_fees")," \u2014 is a separate way to calculate total forwarding fees."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"total_fwd_fees = total_action_fees + SUM(\n    int_msg_remain_fee\n    + out_int_msg.header.ihr_fee\n)\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"out_int_msg.header.ihr_fee")," \u2014 this fee is currently zero."),(0,r.kt)("p",null,"The action fee might be absent if no actions are performed during the transaction."),(0,r.kt)("h2",{id:"gas-fees"},"Gas fees"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"trans.gas_fees")," include all gas fees associated with the transaction. You can find more information in the ",(0,r.kt)("a",{parentName:"p",href:"/arch/managing-gas#gas-calculation-basics"},"Gas calculation basics")," section."),(0,r.kt)("p",null,"Same as action fees, gas fees are not always present. They can be skipped if the TVM compute phase is not initialized in a transaction."))}f.isMDXComponent=!0}}]);