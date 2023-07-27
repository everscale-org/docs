"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[3795],{3905:(e,n,a)=>{a.d(n,{Zo:()=>p,kt:()=>k});var t=a(7294);function o(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function i(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){o(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,t,o=function(e,n){if(null==e)return{};var a,t,o={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(o[a]=e[a]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=t.createContext({}),c=function(e){var n=t.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):i(i({},n),e)),a},p=function(e){var n=c(e.components);return t.createElement(s.Provider,{value:n},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(a),u=o,k=d["".concat(s,".").concat(u)]||d[u]||h[u]||r;return a?t.createElement(k,i(i({ref:n},p),{},{components:a})):t.createElement(k,i({ref:n},p))}));function k(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=a[c];return t.createElement.apply(null,i)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},916:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var t=a(7462),o=(a(7294),a(3905));const r={},i="GraphQL Block and Transaction Pagination: Best Practice",l={unversionedId:"develop/graphql-pagination",id:"develop/graphql-pagination",title:"GraphQL Block and Transaction Pagination: Best Practice",description:"Introduction",source:"@site/../../src/develop/graphql-pagination.md",sourceDirName:"develop",slug:"/develop/graphql-pagination",permalink:"/develop/graphql-pagination",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/graphql-pagination.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"GraphQL code generation",permalink:"/develop/payment"},next:{title:"Run Validator",permalink:"/validate"}},s={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Blocks Pagination with Blockchain API",id:"blocks-pagination-with-blockchain-api",level:2},{value:"Transactions pagination with Blockchain API",id:"transactions-pagination-with-blockchain-api",level:2},{value:"Getting block <code>seq_no</code> range by time range",id:"getting-block-seq_no-range-by-time-range",level:2},{value:"Query Collection Comparison",id:"query-collection-comparison",level:2}],p={toc:c},d="wrapper";function h(e){let{components:n,...a}=e;return(0,o.kt)(d,(0,t.Z)({},p,a,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"graphql-block-and-transaction-pagination-best-practice"},"GraphQL Block and Transaction Pagination: Best Practice"),(0,o.kt)("h2",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Before the development of Blockchain API many developers formed a habit of implementing pagination via block and transaction collections, using fields such as ",(0,o.kt)("inlineCode",{parentName:"p"},"created_at"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"now"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"lt"),", etc."),(0,o.kt)("p",null,"While it might seem more convenient and simple, this is a sub-optimal practice. In certain circumstances, such as periods of large loads and intensive sharding, it has been shown to lead to data loss."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://docs.evercloud.dev/reference/graphql-api/blockchain"},"GraphQL Blockchain API")," was developed for this exact reason - to provide a reliable way of blockchain data pagination and prevent any potential data inconsistencies regardless of network load."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note"),": Query Collections are a supported instrument and will remain so. However, they are intended and optimized primarily for tasks that are not critically dependent on data completeness, such as analytics."),(0,o.kt)("h2",{id:"blocks-pagination-with-blockchain-api"},"Blocks Pagination with Blockchain API"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("strong",{parentName:"p"},"Note:")," For Blockchain API documentation, refer ",(0,o.kt)("a",{parentName:"p",href:"https://docs.evercloud.dev/reference/graphql-api/blockchain"},"here"),".")),(0,o.kt)("p",null,"Block pagination is based on the fact that all workchain blocks are committed into masterchain blocks in a specific order. The masterchain is ordered by ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," and has only one thread. The pagination cursor thus divides all blockchain blocks into ranges between masterchain blocks and provides a complete selection."),(0,o.kt)("p",null,"Let\u2019s look at the following sample:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n    blockchain {\n        blocks(\n            master_seq_no_range: {\n                start: 2660661\n                end: 2670661\n            }\n            workchain: 0\n        ) {\n            edges {\n                node {\n                    workchain_id\n                    id\n                    shard\n                    seq_no\n                    hash\n                    file_hash\n                }\n                cursor\n            }\n            pageInfo {\n                endCursor\n            }\n        }\n    }\n}\n")),(0,o.kt)("p",null,"Here we specify ",(0,o.kt)("strong",{parentName:"p"},"masterchain")," blocks ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range."),(0,o.kt)("p",null,"Block ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," numbers can be found on ",(0,o.kt)("strong",{parentName:"p"},"block detail")," pages in blockchain explorers, such as ",(0,o.kt)("a",{parentName:"p",href:"https://ever.live/"},"https://ever.live/")," or ",(0,o.kt)("a",{parentName:"p",href:"https://everscan.io/"},"https://everscan.io/"),". Examples: ",(0,o.kt)("a",{parentName:"p",href:"https://ever.live/blocks/blockDetails?id=bf842cbe75ca9fa9c75d297f29b359b86174ad71af62b792b693e7861b052d7a"},"here")," and ",(0,o.kt)("a",{parentName:"p",href:"https://everscan.io/blocks/bf842cbe75ca9fa9c75d297f29b359b86174ad71af62b792b693e7861b052d7a"},"here"),"."),(0,o.kt)("p",null,"We also specify that we want to paginate only ",(0,o.kt)("inlineCode",{parentName:"p"},"0")," workchain blocks. To get only masterchain blocks, you can specify ",(0,o.kt)("inlineCode",{parentName:"p"},"-1"),". If the workchain parameter is omitted, you will get all blocks from all workchains."),(0,o.kt)("p",null,"In the result shown below you can see cursor field in each edge object. The cursor value can be passed over to the next query for pagination. Or you can get the latest cursor for the result set in ",(0,o.kt)("inlineCode",{parentName:"p"},"PageInfo.endCursor")," field."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json5"},'{\n  "data": {\n    "blockchain": {\n      "blocks": {\n        "edges": [\n          {\n            "node": {\n              "workchain_id": 0,\n              "id": "block/b4eb28c24a8b4f1fd57a644ee577b79ae69384482e0136014db6ef69a9219791",\n              "shard": "5800000000000000",\n              "seq_no": 3670226,\n              "hash": "b4eb28c24a8b4f1fd57a644ee577b79ae69384482e0136014db6ef69a9219791",\n              "file_hash": null\n            },\n            "cursor": "52899360053800d211a"\n          },\n// ...\n          {\n            "node": {\n              "workchain_id": 0,\n              "id": "block/8eba270b0b225cf03e3edf997fea70f29e58489dc6f30602ca18bf3a56d19101",\n              "shard": "b800000000000000",\n              "seq_no": 3671807,\n              "hash": "8eba270b0b225cf03e3edf997fea70f29e58489dc6f30602ca18bf3a56d19101",\n              "file_hash": null\n            },\n            "cursor": "52899360053806ff11d"\n          }\n        ],\n        "pageInfo": {\n          "endCursor": "52899360053806ff11d"\n        }\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,"Now let\u2019s get the next page of our range."),(0,o.kt)("p",null,"The following parameters will be used:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"after/first")," - shows ",(0,o.kt)("inlineCode",{parentName:"li"},"first")," number of items ",(0,o.kt)("inlineCode",{parentName:"li"},"after")," (not including) specified cursor value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"before/last"),"- shows ",(0,o.kt)("inlineCode",{parentName:"li"},"last")," number of items ",(0,o.kt)("inlineCode",{parentName:"li"},"before")," (not including) specified cursor value. This can be used for backward pagination.")),(0,o.kt)("p",null,"In the following sample pagination is continued within the same ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range. The next 10 blocks after the last block in the previous query are displayed."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n    blockchain {\n        blocks(\n            master_seq_no_range: {\n                start: 2660661\n                end: 2670661\n            }\n            after: "52899360053806ff11d"\n            first: 10\n            workchain: 0\n        ) {\n            edges {\n                node {\n                    workchain_id\n                    id\n                    shard\n                    seq_no\n                    hash\n                    file_hash\n                }\n                cursor\n            }\n            pageInfo {\n                endCursor\n                hasNextPage\n            }\n        }\n    }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PageInfo")," section here gets an additional parameter: ",(0,o.kt)("inlineCode",{parentName:"p"},"pageInfo.hasNextPage")),(0,o.kt)("p",null,"Its output (",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"/",(0,o.kt)("inlineCode",{parentName:"p"},"false"),") shows whether there is data for another page in the current ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range."),(0,o.kt)("p",null,"The result of the query looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json5"},'{\n  "data": {\n    "blockchain": {\n      "blocks": {\n        "edges": [\n          {\n            "node": {\n              "workchain_id": 0,\n              "id": "block/b313465a71e0e89977ef052a3ed56cb4969e5bf6eed857ec1fd89b0c4be401a0",\n              "shard": "c800000000000000",\n              "seq_no": 3661331,\n              "hash": "b313465a71e0e89977ef052a3ed56cb4969e5bf6eed857ec1fd89b0c4be401a0",\n              "file_hash": null\n            },\n            "cursor": "528993700537de13113"\n          },\n// ...          \n          {\n            "node": {\n              "workchain_id": 0,\n              "id": "block/c66528d454dc621ca9b6e6f48889e4da87c160bcdf5e05263b7e390aa5e035a3",\n              "shard": "6800000000000000",\n              "seq_no": 3664899,\n              "hash": "c66528d454dc621ca9b6e6f48889e4da87c160bcdf5e05263b7e390aa5e035a3",\n              "file_hash": null\n            },\n            "cursor": "528993700537ec03116"\n          }\n        ],\n        "pageInfo": {\n          "endCursor": "528993700537ec03116",\n          "hasNextPage": true\n        }\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"hasNextPage")," returned ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", so the next page exists and we should continue paginating within the same ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range."),(0,o.kt)("p",null,"If it is ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),", to continue pagination without losing any blocks, we can simply move the ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range forward."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Note"),": To implement backward pagination use ",(0,o.kt)("inlineCode",{parentName:"p"},"pageInfo.hasPreviousPage")),(0,o.kt)("p",null,"The full documentation about blocks pagination is available ",(0,o.kt)("a",{parentName:"p",href:"https://docs.evercloud.dev/samples/graphql-samples/blocks#blocks-pagination"},"here"),"."),(0,o.kt)("h2",{id:"transactions-pagination-with-blockchain-api"},"Transactions pagination with Blockchain API"),(0,o.kt)("p",null,"Transaction pagination works exactly the same as block pagination - transactions are listed via cursor within a specified masterchain block ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range."),(0,o.kt)("p",null,"The following sample paginates workchain 0 transactions in a given ",(0,o.kt)("inlineCode",{parentName:"p"},"master_seq_no_range"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n    blockchain {\n        transactions(\n            master_seq_no_range: {\n                start: 2660661\n                end: 2670661\n            }\n            workchain: 0\n        ) {\n            edges {\n                node {\n                    id\n                    now\n                }\n                cursor\n            }\n            pageInfo {\n                endCursor\n                hasNextPage\n            }\n        }\n    }\n}\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"PageInfo.hasNextPage")," checks if there is additional data available in the ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range to form a next page. "),(0,o.kt)("p",null,"If it returns ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range should be moved forward to get the next batch of transactions."),(0,o.kt)("p",null,"To implement backward pagination use ",(0,o.kt)("inlineCode",{parentName:"p"},"pageInfo.hasPreviousPage")),(0,o.kt)("p",null,"The result of the sample above looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json5"},'{\n  "data": {\n    "blockchain": {\n      "transactions": {\n        "edges": [\n          {\n            "node": {\n              "id": "transaction/e15b27cf27e34ea4f207d06b6bb8c1541626200fea6cc00be23e10efec49bd2a",\n              "now": 1598767530\n            },\n            "cursor": "528ad6800538067c11f00"\n          },\n//...\n          {\n            "node": {\n              "id": "transaction/d95894791b0cdcaab0988de272fa620a4c456df865e0a79b4eab94fa2bcd2840",\n              "now": 1598782332\n            },\n            "cursor": "528be5b005381da811c00"\n          }\n        ],\n        "pageInfo": {\n          "endCursor": "528be5b005381da811c00",\n          "hasNextPage": true\n        }\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"cursor"),", {",(0,o.kt)("inlineCode",{parentName:"p"},"first"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"after"),"} or {",(0,o.kt)("inlineCode",{parentName:"p"},"last"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"before"),"} filters to get neighboring pages of the same ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"after/first")," - shows ",(0,o.kt)("inlineCode",{parentName:"li"},"first")," number of items ",(0,o.kt)("inlineCode",{parentName:"li"},"after")," (not including) specified cursor value."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"before/last"),"- shows ",(0,o.kt)("inlineCode",{parentName:"li"},"last")," number of items ",(0,o.kt)("inlineCode",{parentName:"li"},"before")," (not including) specified cursor value.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n    blockchain {\n        transactions(\n            master_seq_no_range: {\n                start: 2660661\n                end: 2670661\n            }\n            after: "528be5b005381da811c00"\n            first: 10\n            workchain: 0\n        ) {\n            edges {\n                node {\n                    id\n                    now\n                }\n                cursor\n            }\n            pageInfo {\n                endCursor\n                hasNextPage\n            }\n        }\n    }\n}\n')),(0,o.kt)("p",null,"The full documentation about transaction pagination is available ",(0,o.kt)("a",{parentName:"p",href:"https://docs.evercloud.dev/samples/graphql-samples/transactions#paginate-blockchain-transactions"},"here"),"."),(0,o.kt)("h2",{id:"getting-block-seq_no-range-by-time-range"},"Getting block ",(0,o.kt)("inlineCode",{parentName:"h2"},"seq_no")," range by time range"),(0,o.kt)("p",null,"If you do not know the ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," of masterchain blocks to create a range you can first obtain it by the time range, and then implement pagination the same way as described above."),(0,o.kt)("p",null,"Use the following query:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"query {\n    blockchain {\n        master_seq_no_range(\n            time_start: 1685166198\n            time_end: 1685266198\n        ) {\n            start\n            end\n        }\n    }\n}\n")),(0,o.kt)("p",null,"Here ",(0,o.kt)("inlineCode",{parentName:"p"},"time_start")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"time_end")," indicate the time range for which you will get the block master ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," range."),(0,o.kt)("p",null,"The output of the query looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json5"},'{\n  "data": {\n    "blockchain": {\n      "master_seq_no_range": {\n        "start": 28233606,\n        "end": 28266974\n      }\n    }\n  }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Warning: Specifying a timestamp range does not guarantee that there will be no blocks outside of that range in the result set. This is because some thread blocks generated outside of the specified time range may be committed to a masterchain block generated within that time range. However, this pagination method allows us to conveniently retrieve all blocks/transactions. Neighboring ranges may be checked for blocks and transactions that might have escaped the result set.")),(0,o.kt)("h2",{id:"query-collection-comparison"},"Query Collection Comparison"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"*Note"),": This is the How Not To Do It section.*"),(0,o.kt)("p",null,"A typical way to query blocks collection in GraphQL looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n    blocks(\n        filter: {\n            gen_utime: {\n                lt: 1686215295\n            }\n            workchain_id: { eq: 0 }\n        }\n        limit: 50\n        orderBy: {\n            path: "gen_utime"\n            direction: DESC\n        }\n    ) {\n        workchain_id\n        id\n        shard\n        seq_no\n        file_hash\n    }\n}\n')),(0,o.kt)("p",null,"Here block selection happens by generation unixtime (",(0,o.kt)("inlineCode",{parentName:"p"},"gen_utime"),")."),(0,o.kt)("p",null,"And this is the typical way to query transactions:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},'query {\n    transactions(\n        filter: {\n            now: { gt: 1567601735 }\n        }\n        orderBy: {\n            path: "now"\n            direction: DESC\n        }\n        limit: 5\n    ) {\n        id\n        now\n    }\n}\n')),(0,o.kt)("p",null,"Here transactions are filtered by ",(0,o.kt)("inlineCode",{parentName:"p"},"now")," timestamp."),(0,o.kt)("p",null,"If this is used for pagination and high or varied blockchain load occurs (shards split and merge intensively), blocks and transactions selected by time may end up lost - just as when getting master ",(0,o.kt)("inlineCode",{parentName:"p"},"seq_no")," by timestamp in the section above, some thread blocks generated within that timestamp may not be included in the results."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"There is however no reliable way to check for these lost blocks/transactions and ensure they are retrieved, so this method should never be used for any tasks that require data completeness.")),(0,o.kt)("p",null,"Its primary use is analytics tasks."))}h.isMDXComponent=!0}}]);