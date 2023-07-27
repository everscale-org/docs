"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[7803],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=i,h=p["".concat(c,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(h,o(o({ref:t},d),{},{components:n})):r.createElement(h,o({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:i,o[1]=s;for(var l=2;l<a;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5010:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(7462),i=(n(7294),n(3905));const a={title:"What is TIP?",sidebar_position:0},o="What is TIP? (TIP-0)",s={unversionedId:"standard/workflow",id:"standard/workflow",title:"What is TIP?",description:"TIP \u2014 Trustless Improvement Proposal (TIPs) describe standards for the Everscale blockchain. They may include anything that the community considers in need of improvement or standardization. That can be specifications for core protocol, description of interfaces, smart contract standards and so on.",source:"@site/../../src/standard/workflow.md",sourceDirName:"standard",slug:"/standard/workflow",permalink:"/standard/workflow",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/standard/workflow.md",tags:[],version:"current",lastUpdatedAt:1690468300,formattedLastUpdatedAt:"Jul 27, 2023",sidebarPosition:0,frontMatter:{title:"What is TIP?",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"1.2 MYCODE",permalink:"/standard/TIP-1/2"},next:{title:"Core description",permalink:"/standard/TIP-3"}},c={},l=[],d={toc:l},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"what-is-tip-tip-0"},"What is TIP? (TIP-0)"),(0,i.kt)("p",null,"TIP \u2014 Trustless Improvement Proposal (TIPs) describe standards for the Everscale blockchain. They may include anything that the community considers in need of improvement or standardization. That can be specifications for core protocol, description of interfaces, smart contract standards and so on."),(0,i.kt)("p",null,"I propose a more relaxed structure more closely resembling Bitcoin BIPs but with quite different proccess (see below)."),(0,i.kt)("p",null,"Each TIP should have the following parts (which are heavily copy-pasted from BIP requirements):"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Preamble \u2014 Headers containing metadata about the TIP;"),(0,i.kt)("li",{parentName:"ul"},"Abstract \u2014 A short (~200 word) description of the technical issue being addressed;"),(0,i.kt)("li",{parentName:"ul"},"Copyright \u2014 The TIP must be explicitly licensed under acceptable copyright terms;"),(0,i.kt)("li",{parentName:"ul"},"Specification \u2014 The technical specification should describe the syntax and semantics of any new feature;"),(0,i.kt)("li",{parentName:"ul"},"The specification should be detailed enough to allow competing, interoperable implementations;"),(0,i.kt)("li",{parentName:"ul"},"Motivation \u2014 The motivation is critical for TIPs that want to change the Everscale protocol. It should clearly explain why the existing protocol is inadequate to address the problem that the TIP solves;"),(0,i.kt)("li",{parentName:"ul"},"Rationale \u2014 The rationale fleshes out the specification by describing what motivated the design and why particular design decisions were made. It should describe alternate designs that were considered and related work. The rationale should provide evidence of consensus within the community and discuss important objections or concerns raised during discussion;"),(0,i.kt)("li",{parentName:"ul"},"Backwards compatibility \u2014 All TIPs that introduce backwards incompatibilities must include a section describing these incompatibilities and their severity. The TIP must explain how the author proposes to deal with these incompatibilities;")),(0,i.kt)("p",null,"Each TIP should pass the following process of acceptance:"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Proposal")," \u2192 ",(0,i.kt)("inlineCode",{parentName:"p"},"Discussion")," \u2192 ",(0,i.kt)("inlineCode",{parentName:"p"},"Community Voting")," \u2192 ",(0,i.kt)("inlineCode",{parentName:"p"},"Reference Implementations Contest")," \u2192 ",(0,i.kt)("inlineCode",{parentName:"p"},"Final TIP with Reference Implementations")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Reference implementation \u2014 The reference implementation must be completed before any TIP is given status ",(0,i.kt)("inlineCode",{parentName:"li"},"Final"),", but it need not be completed before the TIP is accepted. It is better to finish the specification and rationale first and reach consensus on it before writing code. The final implementation must include test code and documentation appropriate for the Everscale protocol.")))}u.isMDXComponent=!0}}]);