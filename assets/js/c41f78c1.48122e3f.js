"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[7395],{3905:function(n,e,t){t.d(e,{Zo:function(){return _},kt:function(){return f}});var a=t(7294);function i(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function r(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function o(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?r(Object(t),!0).forEach((function(e){i(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function l(n,e){if(null==n)return{};var t,a,i=function(n,e){if(null==n)return{};var t,a,i={},r=Object.keys(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||(i[t]=n[t]);return i}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(a=0;a<r.length;a++)t=r[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(i[t]=n[t])}return i}var s=a.createContext({}),c=function(n){var e=a.useContext(s),t=e;return n&&(t="function"==typeof n?n(e):o(o({},e),n)),t},_=function(n){var e=c(n.components);return a.createElement(s.Provider,{value:e},n.children)},d={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},p=a.forwardRef((function(n,e){var t=n.components,i=n.mdxType,r=n.originalType,s=n.parentName,_=l(n,["components","mdxType","originalType","parentName"]),p=c(t),f=i,m=p["".concat(s,".").concat(f)]||p[f]||d[f]||r;return t?a.createElement(m,o(o({ref:e},_),{},{components:t})):a.createElement(m,o({ref:e},_))}));function f(n,e){var t=arguments,i=e&&e.mdxType;if("string"==typeof n||i){var r=t.length,o=new Array(r);o[0]=p;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=n,l.mdxType="string"==typeof n?n:i,o[1]=l;for(var c=2;c<r;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},6885:function(n,e,t){t.r(e),t.d(e,{assets:function(){return _},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return d}});var a=t(7462),i=t(3366),r=(t(7294),t(3905)),o=["components"],l={sidebar_position:0},s="Network Config",c={unversionedId:"develop/api-tools/api-sdk/api/samples/config",id:"develop/api-tools/api-sdk/api/samples/config",title:"Network Config",description:"Get blockchain config",source:"@site/../../src/develop/api-tools/api-sdk/api/samples/config.md",sourceDirName:"develop/api-tools/api-sdk/api/samples",slug:"/develop/api-tools/api-sdk/api/samples/config",permalink:"/develop/api-tools/api-sdk/api/samples/config",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/api-tools/api-sdk/api/samples/config.md",tags:[],version:"current",lastUpdatedAt:1655027077,formattedLastUpdatedAt:"6/12/2022",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Samples",permalink:"/api/samples"},next:{title:"Blocks",permalink:"/develop/api-tools/api-sdk/api/samples/blocks"}},_={},d=[],p={toc:d};function f(n){var e=n.components,t=(0,i.Z)(n,o);return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"network-config"},"Network Config"),(0,r.kt)("p",null,"###Get blockchain config"),(0,r.kt)("p",null,"Attention! This query is available only in Public API now, but soon will be supported in Evernode-DS. Use this temporary solution to get network config in Evernode-DS."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"query {\n  blockchain{\n   key_blocks( last:1){\n          edges {\n           node {\n                    master{\n                     config{\n                       p34{\n                         total_weight\n                       }\n                       #...any other config params\n                       # check graphql schema for available fields\n                     }\n                    }\n           }\n          }\n   }\n  }\n}\n")),(0,r.kt)("p",null,'Result:\n{\n"data": {\n"blockchain": {\n"key_blocks": {\n"edges": ','[\n{\n"node": {\n"master": {\n"config": {\n"p34": {\n"total_weight": "0xfffffffffffffff"\n}\n}\n}\n}\n}\n]',"\n}\n}\n}\n}"),(0,r.kt)("p",null,"Implement Pagination  the same way as described above:)"),(0,r.kt)("p",null,"###(Old) Get blockchain config via blocks collection"),(0,r.kt)("p",null,"Will be deprecated soon"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'query{\n  blocks(filter:{\n    workchain_id:{\n      eq:-1\n    }\n    key_block:{\n      eq:true\n    }\n\n  }\n    orderBy:{\n      path:"seq_no"\n      direction:DESC\n    }\n    limit: 1\n  )\n  {\n    id\n       master { \n          config {\n            p15 {\n              validators_elected_for\n              elections_start_before\n              elections_end_before\n              stake_held_for\n            }\n             p16 {\n              max_validators\n              max_main_validators\n              min_validators\n            }\n            p17 {\n              min_stake\n              max_stake\n              min_total_stake\n              max_stake_factor          \n            }\n            p34 {\n              utime_since\n              utime_until\n              total\n              total_weight\n              list {\n                public_key\n                adnl_addr\n                weight\n              }\n            }\n\n          }\n      }\n  }\n}\n')),(0,r.kt)("p",null,"You will get the result:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'"data": {\n    "blocks": [\n      {\n        "id": "bcddfbde6a6aaf5aec485b10a31d95d0854bae2a8c42d4e1d4aefc5abcc1038b",\n        "master": {\n          "config": {\n            "p15": {\n              "validators_elected_for": 65536,\n              "elections_start_before": 32768,\n              "elections_end_before": 8192,\n              "stake_held_for": 32768\n            },\n            "p16": {\n              "max_validators": 1000,\n              "max_main_validators": 100,\n              "min_validators": 13\n            },\n            "p17": {\n              "min_stake": "0x9184e72a000",\n              "max_stake": "0x2386f26fc10000",\n              "min_total_stake": "0x5af3107a4000",\n              "max_stake_factor": 196608\n            },\n            "p34": {\n              "utime_since": 1602143452,\n              "utime_until": 1602208988,\n              "total": 50,\n              "total_weight": "0xfffffffffffffe9",\n              "list": [\n                {\n                  "public_key": "90ea4fe8575d130bc103b7fbb9f8435f9a3b283e0188078066f96269a63f9841",\n                  "adnl_addr": "59a66ce3f95bfcb5337482fff1ca22489ec4a340af9efab9ab713b6e9f5b311d",\n                  "weight": "0x81c19e63fe5f51"\n                },\n                {\n                  "public_key": "85eb9c8b781014df3554994c7c04f76850b2a61a05a841ad2087b9357c2e2b71",\n                  "adnl_addr": "e0ee212d1d3fa671237ec14c5f428fe3024bf49cc38b29aa2562b8a73c106967",\n                  "weight": "0x7df693d5a2fa8c"\n                },\n                {\n                  "public_key": "348d2f4af518e0c027158b381c0f854ea8046c72bbea320df35565d7d636ba6b",\n                  "adnl_addr": "4edfacd00dc54a0ca53ddf4040c7488d4eed8fe9abd4859b26e2d07f36e02f1a",\n                  "weight": "0x7df693d5a2fa8c"\n                },\n              ...\n          \n')),(0,r.kt)("p",null,"You can also query other config data:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"query { \n  blocks(filter: { \n    seq_no: { eq: 3127942 }\n    workchain_id: { eq: -1}  \n  }) {\n    master {\n      config_addr\n      config {\n#Address of config contract in mc\n        p0\n#Address of elector contract in mc\n        p1\n#Address of minter contract in mc\n        p2\n#Address of fee collector contract in mc\n        p3\n#Address of TON DNS root contract in mc\n        p4\n#Minter prices\n        p6 {\n          mint_new_price\n          mint_add_price\n        }\n#Other Currencies\n        p7 {\n          currency\n          value\n        }\n#Global version\n        p8 {\n          version\n          capabilities\n        }\n#\n        p9\n#        \n        p10\n#Config voting setup\n        p11 {\n          normal_params {\n            min_tot_rounds\n            max_tot_rounds\n            min_wins\n            max_losses\n            min_store_sec\n            max_store_sec\n            bit_price\n            cell_price\n          }\n          critical_params {\n            min_tot_rounds\n            max_tot_rounds\n            min_wins\n            max_losses\n            min_store_sec\n            max_store_sec\n            bit_price\n            cell_price\n          }\n        }\n#Array of all workchain descriptions\n        p12 {\n          workchain_id\n          enabled_since\n          actual_min_split\n          min_split\n          max_split\n          active\n          accept_msgs\n          flags\n          zerostate_root_hash\n          zerostate_file_hash\n          version\n          basic\n          vm_version\n          vm_mode\n          min_addr_len\n          max_addr_len\n          addr_len_step\n          workchain_type_id\n        }\n#Block create fees\n        p14 {\n          masterchain_block_fee\n          basechain_block_fee\n        }\n#Election parameters\n        p15 {\n          validators_elected_for\n          elections_start_before\n          elections_end_before\n          stake_held_for\n        }\n#Validators count\n        p16 {\n          max_validators\n          max_main_validators\n          min_validators\n        }\n#Validator stake parameters\n        p17 {\n          min_stake\n          max_stake\n          min_total_stake\n          max_stake_factor\n        }\n#Storage prices\n        p18 {\n          utime_since\n          bit_price_ps\n          cell_price_ps\n          mc_bit_price_ps\n          mc_cell_price_ps\n        }\n#Gas limits and prices in the masterchain\n        p20 {\n          gas_price\n          gas_limit\n          special_gas_limit\n          gas_credit\n          block_gas_limit\n          freeze_due_limit\n          delete_due_limit\n          flat_gas_limit\n          flat_gas_price\n        }\n#Gas limits and prices in workchains\n        p21 {\n          gas_price\n          gas_limit\n          special_gas_limit\n          gas_credit\n          block_gas_limit\n          freeze_due_limit\n          delete_due_limit\n          flat_gas_limit\n          flat_gas_price \n        }\n#Block limits in the masterchain\n        p22 {\n          bytes {\n              underload\n              soft_limit\n              hard_limit\n          }\n            gas {\n              underload\n              soft_limit\n              hard_limit\n            }\n            lt_delta {\n              underload\n              soft_limit\n              hard_limit\n            }\n          }\n#Block limits in workchains\n        p23 {\n          bytes {\n              underload\n              soft_limit\n              hard_limit\n            }\n            gas {\n              underload\n              soft_limit\n              hard_limit\n            }\n            lt_delta {\n              underload\n              soft_limit\n              hard_limit\n            } \n        }\n#Message forward prices in the masterchain\n        p24 {\n          lump_price\n          bit_price\n          cell_price\n          ihr_price_factor\n          first_frac\n          next_frac\n        } \n#Message forward prices in workchains\n        p25 {\n          lump_price\n          bit_price\n          cell_price\n          ihr_price_factor\n          first_frac\n          next_frac\n        }\n#BlockMasterCongig\n        p28 {\n          mc_catchain_lifetime\n          shard_catchain_lifetime\n          shard_validators_lifetime\n          shard_validators_num\n        }\n#BlockMasterConfig\n        p29 {\n          round_candidates\n          next_candidate_delay_ms\n          consensus_timeout_ms\n          fast_attempts\n          attempt_duration\n          catchain_max_deps\n          max_block_bytes\n          max_collated_bytes\n        }\n#Addresses of some service contracts\n        p31\n#Previous validators set\n        p32 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Previous temporary validators set\n        p33 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Current validators set\n        p34 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Current temporaty validators set\n        p35 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Next validators set\n        p36 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Next temporary validators set\n        p37 {\n          utime_since\n          utime_until\n          total\n          total_weight\n          list {\n            public_key\n            adnl_addr\n            weight\n          }\n        }\n#Array of validators signed temporaty keys\n        p39 {\n          adnl_addr\n          temp_public_key\n          seqno\n          valid_until\n          signature_r\n          signature_s\n        }\n      } \n    }\n  }\n}\n")))}f.isMDXComponent=!0}}]);