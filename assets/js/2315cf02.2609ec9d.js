"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[9469],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=d(n),f=i,h=p["".concat(s,".").concat(f)]||p[f]||u[f]||r;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:i,o[1]=l;for(var d=2;d<r;d++)o[d]=n[d];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5738:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var a=n(7462),i=(n(7294),n(3905));const r={title:"4.6. Upgradeable NFT",sidebar_position:6,slug:"/standard/TIP-4.6"},o="Upgradeable NFT (TIP-4.6)",l={unversionedId:"standard/TIP-4/6",id:"standard/TIP-4/6",title:"4.6. Upgradeable NFT",description:"Requires: TIP-4.1",source:"@site/../../src/standard/TIP-4/6.md",sourceDirName:"standard/TIP-4",slug:"/standard/TIP-4.6",permalink:"/standard/TIP-4.6",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/standard/TIP-4/6.md",tags:[],version:"current",lastUpdatedAt:1693835149,formattedLastUpdatedAt:"Sep 4, 2023",sidebarPosition:6,frontMatter:{title:"4.6. Upgradeable NFT",sidebar_position:6,slug:"/standard/TIP-4.6"},sidebar:"tutorialSidebar",previous:{title:"4.5. NFT Licensing",permalink:"/standard/TIP-4.5"},next:{title:"Core description",permalink:"/standard/TIP-6"}},s={},d=[{value:"Abstract",id:"abstract",level:2},{value:"Motivation",id:"motivation",level:2},{value:"Specification",id:"specification",level:2},{value:"Collection",id:"collection",level:2},{value:"TIP4_6Collection.nftVersion()",id:"tip4_6collectionnftversion",level:3},{value:"TIP4_6Collection.platformCode()",id:"tip4_6collectionplatformcode",level:3},{value:"TIP4_6Collection.platformCodeInfo()",id:"tip4_6collectionplatformcodeinfo",level:3},{value:"Events",id:"events",level:3},{value:"Mint",id:"mint",level:3},{value:"Upgrade",id:"upgrade",level:3},{value:"Nft",id:"nft",level:2},{value:"TIP4_6Nft.requestUpgrade()",id:"tip4_6nftrequestupgrade",level:3},{value:"TIP4_6Nft.version()",id:"tip4_6nftversion",level:3},{value:"Events",id:"events-1",level:3},{value:"Upgrade",id:"upgrade-1",level:3},{value:"NftPlatform",id:"nftplatform",level:2}],c={toc:d},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"upgradeable-nft-tip-46"},"Upgradeable NFT (TIP-4.6)"),(0,i.kt)("p",null,"Requires: ",(0,i.kt)("a",{parentName:"p",href:"/standard/TIP-4.1"},"TIP-4.1"),"\nRequires: ",(0,i.kt)("a",{parentName:"p",href:"/standard/TIP-6.1"},"TIP-6.1")),(0,i.kt)("h2",{id:"abstract"},"Abstract"),(0,i.kt)("p",null,"This standard describes the operation of upgradeable NFT contracts. This is based on ",(0,i.kt)("a",{parentName:"p",href:"/standard/TIP-4.1"},"TIP-4.1")," and does not describe the functionality proposed there. "),(0,i.kt)("p",null,"The only difference in the minting process is that the Collection deploys an NftPlatform contract rather than an NFT."),(0,i.kt)("p",null,"Immediately after deployment to the network, the NftPlatform contract calls the ",(0,i.kt)("inlineCode",{parentName:"p"},"tvm.setcode()"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"tvm.setCurrentCode()"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"onCodeUpgrade")," functions, changing its code to NFT code."),(0,i.kt)("h2",{id:"motivation"},"Motivation"),(0,i.kt)("p",null,"The standard allows the NFT code to be changed in case an error is found in it or there is a need to add new functionality."),(0,i.kt)("h2",{id:"specification"},"Specification"),(0,i.kt)("p",null,"The keywords \u201cMUST\u201d, \u201cMUST NOT\u201d, \u201cREQUIRED\u201d, \u201cSHALL\u201d, \u201cSHALL NOT\u201d, \u201cSHOULD\u201d, \u201cSHOULD NOT\u201d, \u201cRECOMMENDED\u201d, \u201cMAY\u201d, and \u201cOPTIONAL\u201d in this document are to be interpreted as described in ",(0,i.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc2119"},"RFC 2119"),"."),(0,i.kt)("h2",{id:"collection"},"Collection"),(0,i.kt)("p",null,"The NFT collection contract serves as a repository for the most up-to-date version of the NFT code, including its current version number. When an individual NFT contract seeks to upgrade its own codebase, it can initiate a request to the NFT collection contract. Upon receiving this request, the collection contract will automatically update the requesting NFT with the latest version of the code."),(0,i.kt)("p",null,"Code update functions are not standardized."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"interface ITIP4_6Collection {\n    event UpgradeNftRequested(uint32 oldVersion, uint32 newVersion, address nft, address initiator);\n    event NftCodeUpdated(uint32 oldVersion, uint32 newVersion, uint256 oldCodeHash, uint256 newCodeHash);\n\n    function nftVersion() external view responsible returns (uint32);\n    \n    function platformCode() external view responsible returns (TvmCell);\n    \n    function platformCodeInfo() external view responsible returns (uint256 codeHash, uint16 codeDepth);\n}\n")),(0,i.kt)("h3",{id:"tip4_6collectionnftversion"},"TIP4_6Collection.nftVersion()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"function nftVersion() external view responsible returns (uint32);\n")),(0,i.kt)("p",null,"Returns the current version of the NFT. The Collection stores only the latest version, update history is stored in events."),(0,i.kt)("h3",{id:"tip4_6collectionplatformcode"},"TIP4_6Collection.platformCode()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"function platformCode() external view responsible returns (TvmCell);\n")),(0,i.kt)("p",null,"Returns the NftPlatform code containing the ",(0,i.kt)("inlineCode",{parentName:"p"},"collection"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),") salt. The NftPlatform code is non-upgradeable."),(0,i.kt)("h3",{id:"tip4_6collectionplatformcodeinfo"},"TIP4_6Collection.platformCodeInfo()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"function platformCodeInfo() external view responsible returns (uint256 codeHash, uint16 codeDepth);\n")),(0,i.kt)("p",null,"Returns the hash and depth of the NftPlatform code. These can be used to calculate the NFT address in third-party contracts. The hash is taken from the NftPlatform code containing the ",(0,i.kt)("inlineCode",{parentName:"p"},"collection"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"address"),") salt."),(0,i.kt)("h3",{id:"events"},"Events"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"event UpgradeNftRequested(uint32 oldVersion, uint32 newVersion, address nft, address initiator);\nevent NftCodeUpdated(uint32 oldVersion, uint32 newVersion, uint256 oldCodeHash, uint256 newCodeHash);\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"UpgradeNftRequested")),(0,i.kt)("p",null,"You MUST emit it when an update is requested from the NFT and upgrade is available (the NFT version at the time of the upgrade request is less than the current NFT version in the collection)."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NftCodeUpdated")),(0,i.kt)("p",null,"You MUST emit it when NFT code is updated in a collection. The function of code update is not standardized."),(0,i.kt)("h3",{id:"mint"},"Mint"),(0,i.kt)("p",null,"The functions implementing minting are not standardized. The process itself differs from the one proposed in ",(0,i.kt)("a",{parentName:"p",href:"/standard/TIP-4.1"},"TIP-4.1")," (see Abstract)."),(0,i.kt)("h3",{id:"upgrade"},"Upgrade"),(0,i.kt)("p",null,"When NFT code is updated in a collection, the latter changes the NFT version and emits the ",(0,i.kt)("inlineCode",{parentName:"p"},"NftCodeUpdated")," event."),(0,i.kt)("h2",{id:"nft"},"Nft"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"interface ITIP4_6Nft {\n    event NftUpgraded(uint32 oldVersion, uint32 newVersion, address initiator);\n\n    function requestUpgrade(address sendGasTo) external;\n    \n    function version() external view responsible returns (uint32);\n}\n")),(0,i.kt)("h3",{id:"tip4_6nftrequestupgrade"},"TIP4_6Nft.requestUpgrade()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"function requestUpgrade(address sendGasTo) external;\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"sendGasTo (address)")," - the address to which the remaining gas will be sent")),(0,i.kt)("p",null,"Calls the \u0421ollection function, checking if there is an upgrade. If a new version is available, the \u0421ollection upgrades the NFT by calling the appropriate function (this function is not included in the standard, implementations may vary)."),(0,i.kt)("h3",{id:"tip4_6nftversion"},"TIP4_6Nft.version()"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"function version() external view responsible returns (uint32);\n")),(0,i.kt)("p",null,"Returns the current version of NFT."),(0,i.kt)("h3",{id:"events-1"},"Events"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"event NftUpgraded(uint32 oldVersion, uint32 newVersion, address initiator);\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NftUpgraded")),(0,i.kt)("p",null,"You MUST emit it after the NFT upgrade."),(0,i.kt)("h3",{id:"upgrade-1"},"Upgrade"),(0,i.kt)("p",null,"The NFT upgrade scenario is as follows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"The user (in the general case, the NFT manager) calls the NFT ",(0,i.kt)("inlineCode",{parentName:"li"},"requestUpgrade")," function."),(0,i.kt)("li",{parentName:"ol"},"The NFT requests an upgrade from the collection, passing information about itself (",(0,i.kt)("inlineCode",{parentName:"li"},"id"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"version"),")."),(0,i.kt)("li",{parentName:"ol"},"The Collection compares the version it holds with the one passed by the NFT."),(0,i.kt)("li",{parentName:"ol"},"If the version in the collection is larger, then an upgrade is available. The collection emits the ",(0,i.kt)("inlineCode",{parentName:"li"},"UpgradeNftRequested")," event, calls the NFT function and passes it the new code, version and other necessary data",(0,i.kt)("ol",{parentName:"li"},(0,i.kt)("li",{parentName:"ol"},"If the versions are equal, the process aborts and remaining gas is returned to the owner. "))),(0,i.kt)("li",{parentName:"ol"},"NFT sets the new code, emits ",(0,i.kt)("inlineCode",{parentName:"li"},"NftUpgraded")," event")),(0,i.kt)("h2",{id:"nftplatform"},"NftPlatform"),(0,i.kt)("p",null,"NftPlatform's static variables MUST contain ",(0,i.kt)("inlineCode",{parentName:"p"},"_id"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"uint256"),") and nothing else."),(0,i.kt)("p",null,"The code and interface of the contract are not standardized, except for the previously mentioned static ",(0,i.kt)("inlineCode",{parentName:"p"},"_id"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"static uint256"),") (similar to the NFT contract). As described above, when minting, the collection deploys this contract instead of the NFT, then it upgrades its code to ",(0,i.kt)("strong",{parentName:"p"},"TIP4_6Nft.")),(0,i.kt)("p",null,"This approach allows the collection to accept messages from NFTs of any version without retaining all the NFT code used."),(0,i.kt)("p",null,"An example of this contract is shown below. The NftPlatform code is salted with the address of the Collection that deployed it (similar to the NFT contract) so that the codehash is unique for each Collection."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-solidity"},"contract NftPlatform {\n    uint8 constant value_is_empty = 101;\n    uint8 constant sender_is_not_collection = 102;\n    uint8 constant value_is_less_than_required = 104;\n\n    uint256 static _id;\n\n    constructor(TvmCell nftCode, TvmCell data, uint128 remainOnNft) public {\n        optional(TvmCell) optSalt = tvm.codeSalt(tvm.code());\n        require(optSalt.hasValue(), value_is_empty);\n        address collection = optSalt.get().toSlice().decode(address);\n        require(msg.sender == collection, sender_is_not_collection);\n        require(remainOnNft != 0, value_is_empty);\n        require(msg.value > remainOnNft, value_is_less_than_required);\n\n        initialize(nftCode, data);\n    }\n\n    function initialize(\n        TvmCell nftCode,\n        TvmCell data\n    ) private {\n        tvm.setcode(nftCode);\n        tvm.setCurrentCode(nftCode);\n\n        onCodeUpgrade(data);\n    }\n\n    function onCodeUpgrade(TvmCell data) private {}\n}\n")))}u.isMDXComponent=!0}}]);