"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[8397],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,g=p["".concat(i,".").concat(m)]||p[m]||u[m]||r;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s[p]="string"==typeof e?e:o,l[1]=s;for(var c=2;c<r;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8046:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={sidebar_position:5,description:"Integrate EVER ito your backend"},l="TIP3 Integration Guide",s={unversionedId:"develop/recipes/tip3-integration",id:"develop/recipes/tip3-integration",title:"TIP3 Integration Guide",description:"Integrate EVER ito your backend",source:"@site/../../src/develop/recipes/tip3-integration.md",sourceDirName:"develop/recipes",slug:"/develop/recipes/tip3-integration",permalink:"/develop/recipes/tip3-integration",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/recipes/tip3-integration.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",sidebarPosition:5,frontMatter:{sidebar_position:5,description:"Integrate EVER ito your backend"},sidebar:"tutorialSidebar",previous:{title:"Add EVER to your backend",permalink:"/develop/recipes/backend-integration"},next:{title:"Read data from blockchain",permalink:"/develop/recipes/read-data"}},i={},c=[{value:"Glossary",id:"glossary",level:2},{value:"Prepare your keys",id:"prepare-your-keys",level:2},{value:"How to mint TIP3.2 tokens",id:"how-to-mint-tip32-tokens",level:2},{value:"How to get total TIP3.2 token supply",id:"how-to-get-total-tip32-token-supply",level:2},{value:"How to deploy a TIP 3.2 wallet",id:"how-to-deploy-a-tip-32-wallet",level:2},{value:"How to get TIP3.2 wallet address knowing holder address",id:"how-to-get-tip32-wallet-address-knowing-holder-address",level:2},{value:"How to get TIP3.2 wallet balance",id:"how-to-get-tip32-wallet-balance",level:2},{value:"How to make a TIP3.2 transfer",id:"how-to-make-a-tip32-transfer",level:2},{value:"To TIP3.2 wallet address",id:"to-tip32-wallet-address",level:3},{value:"To holder address",id:"to-holder-address",level:3}],d={toc:c},p="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(p,(0,a.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"tip3-integration-guide"},"TIP3 Integration Guide"),(0,o.kt)("p",null,"This guide will explain how to integrate TIP3.2 tokens into your app with the help of Ever SDK. It is useful if you are you are a token holder, and need to make transfers, or you are a token creator and need to mint tokens."),(0,o.kt)("h2",{id:"glossary"},"Glossary"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Owner wallet")," - wallet with Ever tokens which is the creator of TokenRoot and can mint TIP3.2 tokens."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Holder wallet")," -  wallet with Ever tokens which is the owner of a TIP 3.2 Wallet. For example, a MultisigV2 can be a holder wallet. It alone can govern the TIP3.2 wallet."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"TIP 3.2 Wallet")," - account which contains TIP3.2 tokens belonging to the holder."),(0,o.kt)("p",null,"Additional documentation: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/broxus/tip3/blob/c857c077b4e3eacc941c7af2b53f1afe5e6d338b/contracts/abstract/TokenWalletBase.tsol#L81"},"https://github.com/broxus/tip3/blob/c857c077b4e3eacc941c7af2b53f1afe5e6d338b/contracts/abstract/TokenWalletBase.tsol#L81")," "),(0,o.kt)("h2",{id:"prepare-your-keys"},"Prepare your keys"),(0,o.kt)("p",null,"First, you need to get a key pair which will be used to govern your token operations."),(0,o.kt)("p",null," Here we will use Ever Wallet keys for mint operations."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create an account in ",(0,o.kt)("a",{parentName:"p",href:"https://everwallet.net/"},"Ever Wallet")," app. Save seed phrase to a file.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add a new account and choose Multisig wallet option. Transfer 10 tokens to it. Then transfer one token to any other account - the wallet will be fully deployed after the outgoing transfer. The balance will be uneven, since fees will be deducted."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"ew01.png",src:n(9821).Z,width:"352",height:"586"})),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"ew02.png",src:n(9397).Z,width:"352",height:"586"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Save  multisig wallet address."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"ew03.png",src:n(1033).Z,width:"352",height:"586"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Save the ABI of Ever Wallet to your project: ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/broxus/ever-wallet-contract/blob/master/dist/Wallet.abi.json"},"https://github.com/broxus/ever-wallet-contract/blob/master/dist/Wallet.abi.json"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Get the wallet key pair from the seed phrase:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'let phrase = "word1 word2 word3 word4 ... (12 words)";\nconst ownerKeyPair = await client.crypto.mnemonic_derive_sign_keys({phrase});\n')))),(0,o.kt)("h2",{id:"how-to-mint-tip32-tokens"},"How to mint TIP3.2 tokens"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Encode body of internal message from owner wallet to TokenRoot which calls the ",(0,o.kt)("inlineCode",{parentName:"p"},"mint")," method. It will be sent through an owner wallet call. "),(0,o.kt)("p",{parentName:"li"},"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"abi.encode_message_body")," function and the ABI of the receiving TokenRoot contract (",(0,o.kt)("inlineCode",{parentName:"p"},"mint")," function) for it."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'const call_mint_payload = (await client.abi.encode_message_body({\n        abi: {\n            type: \'Contract\',\n            value: TokenRoot.abi,\n        },\n        call_set: {\n            function_name: "mint",\n            input: {\n                amount: your-token-ammount,\n                recipient: recipient-holder-address\n                deployWalletValue: 5000000000 // 5 evers for deploy\n                remainingGasTo: multisigOwnerAddress,\n                notify: false\n                payload: "te6ccgEBAQEAAgAAAA==" // empty cell\n            },\n        },\n        is_internal: true,\n        signer: signerNone(), // internal messages have no signature\n    })).body;\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Call Owner Wallet (wallet which is the creator of TokenRoot), passing in call parameters payload of internal call, Owner Wallet ABI and TokenRoot address:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// Prepare input parameter for 'submitTransaction' method of multisig wallet\nconst sendTransactionParams = {\n    dest: TokenRootAddress,\n    value: more-than-5-evers, // because we will use 5 evers for token wallet deploy\n    bounce: true,\n    flags: 3,\n    payload: call_mint_payload,\n};\n\nconst process_message_params = {\n      send_events: false,\n      message_encode_params: {\n          token_owner_wallet_address,\n          abi: token_owner_wallet.abi, // multisig abi, for example\n          call_set: {\n              function_name: \"submitTransaction\",\n              input: submitTransactionParams,\n          },\n          signer: {\n            type: 'Keys'\n            keys: ownerKeyPair\n          }\n      },\n};\n// Call `submitTransaction` function\nconst sentTransactionInfo = await client.processing.process_message(params);\n")))),(0,o.kt)("h2",{id:"how-to-get-total-tip32-token-supply"},"How to get total TIP3.2 token supply"),(0,o.kt)("p",null,"To get total token supply, you can download ",(0,o.kt)("inlineCode",{parentName:"p"},"tokenRoot")," account state. It is a ",(0,o.kt)("inlineCode",{parentName:"p"},"boc")," or bag of cells - native blockchain data layout. Account's boc contains full account state (code and data) that\nyou will need to execute get methods and get the required information."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"    const query = `\n        query {\n          blockchain {\n            account(\n              address: \"${address}\"\n            ) {\n               info {\n                balance(format: DEC)\n                boc\n              }\n            }\n          }\n        }`\n    const {result}  = await client.net.query({query})\n        const accountState = result.data.blockchain.account.info.boc\n\n// Encoding message for local execution of get method. Get methods do not require\n// signature so we use signer None\nconst { message } = await client.abi.encode_message({\n  abi: {\n      type: 'Contract',\n      value: TokenRoot.abi,\n  },\n  address,  // token root address\n  call_set: {\n      function_name: totalSupply,\n      input: {\n        answerId: 0\n      },\n  },\n  signer: { type: 'None' },\n});\n\n// Run get method\nconst tvm_response = await client.tvm.run_tvm({\n  message,\n  account: accountState,\n  abi: {\n      type: 'Contract',\n      value: TokenRoot.abi,\n  },\n});\nconst getMethodResult = tvm_response.decoded.output;\n")),(0,o.kt)("h2",{id:"how-to-deploy-a-tip-32-wallet"},"How to deploy a TIP 3.2 wallet"),(0,o.kt)("p",null,"You can deploy token wallet via ",(0,o.kt)("inlineCode",{parentName:"p"},"tokenRoot")," contract via ",(0,o.kt)("inlineCode",{parentName:"p"},"deployWallet")," function."),(0,o.kt)("p",null,"It can be called from any token Holder wallet. In this example multisig V2 is used."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"const deploy_payload = (await client.abi.encode_message_body({\n        abi: {\n            type: 'Contract',\n            value: TokenRoot.abi,\n        },\n        call_set: {\n            function_name: \"deployWallet\",\n            input: {\n              answer_id: 0,\n              walletOwner: holder-wallet-address\n              deployWalletValue: deploy-value \n            },\n        },\n        is_internal: true,\n        signer: signerNone(), // internal messages have no signature\n    })).body;\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"\n// Prepare input parameter for 'submitTransaction' method of multisig wallet\nconst sendTransactionParams = {\n    dest: tip3-2-root,\n    value: deployWalletValue+ a bit more, // because we will use 0.5 evers for token  transfer\n    bounce: true,\n    flags: 3,\n    payload: deploy_payload, //information about transfer and recipient is contained here\n};\n\nconst process_message_params = {\n      send_events: false,\n      message_encode_params: {\n          address: holder_wallet_address,\n          abi: holder_wallet.abi, // multisigV2 abi, for example\n          call_set: {\n              function_name: \"submitTransaction\",\n              input: submitTransactionParams,\n          },\n          keys: {\n            type: 'keyPair',\n            keys: ownerKeyPair\n          }\n      },\n};\n// Call `submitTransaction` function\nconst sentTransactionInfo = await client.processing.process_message(params);\n")),(0,o.kt)("h2",{id:"how-to-get-tip32-wallet-address-knowing-holder-address"},"How to get TIP3.2 wallet address knowing holder address"),(0,o.kt)("p",null,"If you need to get the address of the TIP 3 wallet belonging to a certain holder account, the address of which you know, use the ",(0,o.kt)("inlineCode",{parentName:"p"},"walletOf")," get method of TokenRoot, passing the holder address to it:  ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/broxus/tip3/blob/master/build/TokenRoot.abi.json#L162"},"https://github.com/broxus/tip3/blob/master/build/TokenRoot.abi.json#L162")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// Download tokenRoot account state \n// `boc` or bag of cells - native blockchain data layout. \n// Account's boc contains full account state (code and data) that\n// we will  need to execute get methods.\n    const query = `\n        query {\n          blockchain {\n            account(\n              address: \"${address}\"\n            ) {\n               info {\n                balance(format: DEC)\n                boc\n              }\n            }\n          }\n        }`\n    const {result}  = await client.net.query({query})\n    const accountState = result.data.blockchain.account.info.boc\n\n// Encoding message for local execution of get method. Get methods do not require\n// signature so we use signer None\nconst { message } = await client.abi.encode_message({\n  abi: {\n      type: 'Contract',\n      value: TokenRoot.abi,\n  },\n  address, // token root address\n  call_set: {\n      function_name: walletOf,\n      input: {\n        answerId: 0,\n        walletOwner: ownerMultisigAddress\n      },\n  },\n  signer: { type: 'None' },\n});\n\n// Run get method\nconst tvm_response = await client.tvm.run_tvm({\n  message,\n  account: accountState,\n  abi: {\n      type: 'Contract',\n      value: TokenRoot.abi,\n  },\n});\nconst getMethodResult = tvm_response.decoded.output;\n")),(0,o.kt)("h2",{id:"how-to-get-tip32-wallet-balance"},"How to get TIP3.2 wallet balance"),(0,o.kt)("p",null,"To get TIP3.2 wallet balance, download ",(0,o.kt)("inlineCode",{parentName:"p"},"tokenWallet")," account state. It is a",(0,o.kt)("inlineCode",{parentName:"p"},"boc")," or bag of cells - native blockchain data layout.Account's boc contains full account state (code and data) that\nyou will need to execute get methods and get the required information."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"    const query = `\n        query {\n          blockchain {\n            account(\n              address: \"${address}\"\n            ) {\n               info {\n                balance(format: DEC)\n                boc\n              }\n            }\n          }\n        }`\n    const {result}  = await client.net.query({query})\n    const accountState = result.data.blockchain.account.info.boc\n\n// Encoding message for local execution of get method. Get methods do not require\n// signature so we use signer None\nconst { message } = await client.abi.encode_message({\n  abi: {\n      type: 'Contract',\n      value: TokenWallet.abi,\n  },\n  address, // wallet address\n  call_set: {\n      function_name: balance,\n      input: {\n        answerId: 0\n      },\n  },\n  signer: { type: 'None' },\n});\n\n// Run get method\nconst tvm_response = await client.tvm.run_tvm({\n  message,\n  account: accountState,\n  abi: {\n      type: 'Contract',\n      value: TokenRoot.abi,\n  },\n});\nconst getMethodResult = tvm_response.decoded.output;\n")),(0,o.kt)("h2",{id:"how-to-make-a-tip32-transfer"},"How to make a TIP3.2 transfer"),(0,o.kt)("p",null,"Call Holder Wallet of the sender, passing in call parameters payload with internal call parameters, Wallet ABI and address of the token holder (for example, multisig)."),(0,o.kt)("h3",{id:"to-tip32-wallet-address"},"To TIP3.2 wallet address"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Encode body of the internal message with a call of the ",(0,o.kt)("inlineCode",{parentName:"p"},"transferToWallet")," function of sender TIP3.2 wallet. "),(0,o.kt)("p",{parentName:"li"},"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"abi.encode_message_body")," function and ABI of TokenWallet (",(0,o.kt)("inlineCode",{parentName:"p"},"transferToWallet")," function)  for this."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'const transfer_payload = (await client.abi.encode_message_body({\n        abi: {\n            type: \'Contract\',\n            value: TokenWallet.abi,\n        },\n        call_set: {\n            function_name: "transferToWallet",\n            input: {\n              amount: amount-in-units,\n              recipientTokenWallet: recipient-tip3-2-wallet-address\n              remainingGasTo: holder-wallet-address // or tip32 wallet address\n              notify: false\n              payload: "te6ccgEBAQEAAgAAAA==" // empty cell\n            },\n        },\n        is_internal: true,\n        signer: signerNone(), // internal messages have no signature\n    })).body;\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Send message with the request to transfer funds from TIP3.2 wallet to Holder Wallet:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// Prepare input parameter for 'submitTransaction' method of multisig wallet\nconst sendTransactionParams = {\n    dest: tip3-2-wallet-address, // of the sender\n    value: more-than-0.5-evers, // because we will use 0.5 evers for token  transfer\n    bounce: true,\n    flags: 3,\n    payload: transfer_payload, //information about transfer and recipient is contained here\n};\n\nconst process_message_params = {\n      send_events: false,\n      message_encode_params: {\n          address: holder_wallet_address,\n          abi: holder_wallet.abi, // multisigV2 abi, for example\n          call_set: {\n              function_name: \"submitTransaction\",\n              input: submitTransactionParams,\n          },\n          keys: {\n            type: 'keyPair',\n            keys: ownerKeyPair\n          }\n      },\n};\n// Call `submitTransaction` function\nconst sentTransactionInfo = await client.processing.process_message(params);\n")))),(0,o.kt)("h3",{id:"to-holder-address"},"To holder address"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Encode body of the internal message with a call of the ",(0,o.kt)("inlineCode",{parentName:"p"},"transfer")," function of sender TIP3.2 wallet. "),(0,o.kt)("p",{parentName:"li"},"Use the ",(0,o.kt)("inlineCode",{parentName:"p"},"abi.encode_message_body")," function and ABI of TokenWallet (",(0,o.kt)("inlineCode",{parentName:"p"},"transfer")," function)  for this."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},'const transfer_payload = (await client.abi.encode_message_body({\n        abi: {\n            type: \'Contract\',\n            value: TokenWallet.abi,\n        },\n        call_set: {\n            function_name: "transfer",\n            input: {\n              amount: amount-in-units,\n              recipient: recipient-holder-address\n              deployWalletValue: deploy-value // >0, if you want to deploy recipient wallet\n              remainingGasTo: holder-wallet-address // or tip32 wallet address\n              notify: false\n              payload: "te6ccgEBAQEAAgAAAA==" // empty cell\n            },\n        },\n        is_internal: true,\n        signer: signerNone(), // internal messages have no signature\n    })).body;\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Send message with the request to transfer funds from TIP3.2 wallet to Holder Wallet:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-jsx"},"// Prepare input parameter for 'submitTransaction' method of multisig wallet\nconst sendTransactionParams = {\n    dest: tip3-2-wallet-address, // of the sender\n    value: more-than-0.5-evers, // because we will use 0.5 evers for token  transfer\n    bounce: true,\n    flags: 3,\n    payload: transfer_payload, //information about transfer and recipient is contained here\n};\n\nconst process_message_params = {\n      send_events: false,\n      message_encode_params: {\n          holder_wallet_address,\n          abi: holder_wallet.abi, // multisigV2 abi, for example\n          call_set: {\n              function_name: \"submitTransaction\",\n              input: submitTransactionParams,\n          },\n          ownerKeyPair,\n      },\n};\n// Call `submitTransaction` function\nconst sentTransactionInfo = await client.processing.process_message(params);\n")))))}u.isMDXComponent=!0},9821:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ew01-d204884fe6753378e1bae48a7cdfacc3.png"},9397:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ew02-0741d747915a782b620580e9f410779a.png"},1033:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/ew03-03ef09f1e6213fe1c49c225659bca4ce.png"}}]);