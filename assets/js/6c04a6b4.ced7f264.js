"use strict";(self.webpackChunkeverscale_docs_website=self.webpackChunkeverscale_docs_website||[]).push([[7818],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),p=c(n),h=o,u=p["".concat(s,".").concat(h)]||p[h]||m[h]||l;return n?a.createElement(u,i(i({ref:t},d),{},{components:n})):a.createElement(u,i({ref:t},d))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=h;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[p]="string"==typeof e?e:o,i[1]=r;for(var c=2;c<l;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7914:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>r,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const l={sidebar_position:0},i="Getting started",r={unversionedId:"develop/cpp-developing/getting-started",id:"develop/cpp-developing/getting-started",title:"Getting started",description:"Referenced repository//docs.ton.dev/86757ecb2/p/828241-c-tutorial",source:"@site/../../src/develop/cpp-developing/getting-started.md",sourceDirName:"develop/cpp-developing",slug:"/develop/cpp-developing/getting-started",permalink:"/develop/cpp-developing/getting-started",draft:!1,editUrl:"https://github.com/everscale-org/docs/edit/main/.build/website/../../src/develop/cpp-developing/getting-started.md",tags:[],version:"current",lastUpdatedAt:1684270521,formattedLastUpdatedAt:"May 16, 2023",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Developing with C++",permalink:"/develop/cpp-developing"},next:{title:"C/C++ Compiler",permalink:"/develop/cpp-developing/compiler"}},s={},c=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"The toolchain description",id:"the-toolchain-description",level:2},{value:"Brief introduction to Everscale and TVM and the terminology",id:"brief-introduction-to-everscale-and-tvm-and-the-terminology",level:2},{value:"Environment setup",id:"environment-setup",level:2},{value:"Hello, world!",id:"hello-world",level:2},{value:"Describing a contract interface",id:"describing-a-contract-interface",level:3},{value:"Implementation",id:"implementation",level:3},{value:"Compilation and local testing",id:"compilation-and-local-testing",level:3},{value:"Debugging locally",id:"debugging-locally",level:3},{value:"Deploying and testing in the network",id:"deploying-and-testing-in-the-network",level:3},{value:"Authorization",id:"authorization",level:2},{value:"Interface and implementation",id:"interface-and-implementation",level:3},{value:"Deploying and testing in the network",id:"deploying-and-testing-in-the-network-1",level:3},{value:"Message exchange",id:"message-exchange",level:2},{value:"Interface and implementation",id:"interface-and-implementation-1",level:3},{value:"Debugging locally",id:"debugging-locally-1",level:3},{value:"Deploying and testing in the network",id:"deploying-and-testing-in-the-network-2",level:3}],d={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(p,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting started"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Referenced repository: ",(0,o.kt)("a",{parentName:"p",href:"https://docs.ton.dev/86757ecb2/p/828241-c-tutorial"},"https://docs.ton.dev/86757ecb2/p/828241-c-tutorial"))),(0,o.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.kt)("p",null,"To reproduce the tutorial, you need to get ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/TON-Compiler"},"TON-Compiler sources"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/tonos-cli"},"TONOS-CLI"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/TVM-linker"},"TVM-linker")," sources and build ",(0,o.kt)("inlineCode",{parentName:"p"},"clang++"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"tvm_linker")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"tonos-cli"),". Please follow README files from the corresponding repositories."),(0,o.kt)("h2",{id:"the-toolchain-description"},"The toolchain description"),(0,o.kt)("p",null,"C++ toolchain consists of the following libraries and tools:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"C++ runtime located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-source/stdlib/stdlib_cpp.tvm"),"."),(0,o.kt)("li",{parentName:"ul"},"C++ std headers at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-source/stdlib/cpp-sdk/std"),". These are mostly original headers from LLVM libstdc++ configured with TVM architecture parameters. You might expect these headers to work and to use them. But we don't guarantee that every single feature will work smoothly: some C++ features are beyound the capabilities of TVM architecture. We address this subject later on in this tutorial."),(0,o.kt)("li",{parentName:"ul"},"Boost hana library which might be used in contracts. It's located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-source/stdlib/cpp-sdk/boost"),"."),(0,o.kt)("li",{parentName:"ul"},"TON SDK header-based library containing essential functions and classes to work with contracts. It's located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-source/stdlib/cpp-sdk/tvm"),"."),(0,o.kt)("li",{parentName:"ul"},"Clang-7 based C++ compiler. The binary is located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-build/bin/clang++"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"tvm_linker")," linker for TVM assembly and also a local testing tool for contracts. The tool is located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TVM-linker-source/tvm_linker/target/<debug or release>/tvm_linker"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"tonos-cli")," contract deployment tool. The tool is located at ",(0,o.kt)("inlineCode",{parentName:"li"},"tonos-cli/target/<debug or release>/tonos-cli"),"."),(0,o.kt)("li",{parentName:"ul"},"Compiler driver for C++. Due to TVM backend has very specific requirements for the optimization pipeline we strongly recommend using the tool rather than call clang manually. The driver is located at ",(0,o.kt)("inlineCode",{parentName:"li"},"TON-Compiler-build/bin/tvm-build++"),".")),(0,o.kt)("h2",{id:"brief-introduction-to-everscale-and-tvm-and-the-terminology"},"Brief introduction to Everscale and TVM and the terminology"),(0,o.kt)("p",null,"Unlike common C++ programs, smart contracts are intended to be run in a blockchain. This implies that the code and, perhaps, data need to be stored permanently unless someone modifies or destroys them. In Everscale blockchain all contracts exchange messages between each other. The exchange is essentially asynchronous. When a contract receives a message, it parses it, and in case the message is sensible to a contract it generally invokes a user defined handler called a public method (which is usually a class method with public access specifier, but it doesn\u2019t have to be implemented this way). "),(0,o.kt)("p",null,"When this tutorial refers to a public method it means a public method in terms of TVM rather than in terms of C++. One contract might send a message to another one and by means of this message call a public method asynchronously. Such a message is called an internal message (i.e. the sender is in the blockchain). "),(0,o.kt)("p",null,"Alternatively, an external tool might also create and send a message to a contract. Such a message is called an external message. When a contract is handling a message, it has limited computation resources measured in gas. Gas price is deducted from contract balance and this balance is associated with the contract deployed into the network. "),(0,o.kt)("p",null,"However, even if a contract has outstanding balance, there is a hard limit on how much it can spend on a single incoming message, if this limit is exceeded, the contract is terminated even if the code it runs is well-formed. To minimize the state which is transferred between contracts and stored in the blockchain, TVM does not have random access memory. The memory might be emulated by dictionaries, however, it\u2019s quite expensive and often not practical taking into account limited gas supply. "),(0,o.kt)("p",null,"Thus a typical smart contract in C++ avoids using memory. Moreover, currently all the functions have to be inlined. That\u2019s why ",(0,o.kt)("inlineCode",{parentName:"p"},"-O3")," optimization and LTO are essential and it\u2019s the pipeline ",(0,o.kt)("inlineCode",{parentName:"p"},"tvm-build++")," implements."),(0,o.kt)("h2",{id:"environment-setup"},"Environment setup"),(0,o.kt)("p",null,"Prior to start developing a contract, we configure ",(0,o.kt)("inlineCode",{parentName:"p"},"PATH")," to add all the tools we need:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"export PATH=TON-Compiler-build/bin:TVM-linker-source/tvm_linker/target/<debug or release>:tonos-cli/target/<debug or release>:$PATH\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"tvm-build++ needs additional treatment:\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"export TVM_LINKER=TVM-linker-source/tvm_linker/target/<debug or release>/tvm_linker #path to tvm_linker tool.\nexport TVM_INCLUDE_PATH=TON-Compiler-source/stdlib #path to the folder containing cpp-sdk directory.\nexport TVM_LIBRARY_PATH=TON-Compiler-source/stdlib #path to stdlib_cpp.tvm\n")),(0,o.kt)("h2",{id:"hello-world"},"Hello, world!"),(0,o.kt)("p",null,"A typical smart contract consists of two files:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"contract interface description in a header file"),(0,o.kt)("li",{parentName:"ul"},"contract implementation in a cpp-file A contract might consist of more files if it's needed, but since the contract tends to be small, two files are often enough. Let's start developing our first, ",(0,o.kt)("inlineCode",{parentName:"li"},"Hello, world!")," contract by describing its interface.")),(0,o.kt)("h3",{id:"describing-a-contract-interface"},"Describing a contract interface"),(0,o.kt)("p",null,"A contract interface consists of three parts:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Public methods declarations."),(0,o.kt)("li",{parentName:"ul"},"Persistent data."),(0,o.kt)("li",{parentName:"ul"},"Events. Public methods are functions that receive messages in the blockchain. There is a dedicated method called constructor which is called upon the contract deploy. The constructor is a must, otherwise the contract can not be deployed. The constructor, as well as other public methods, must only take arguments of types that are listed below:"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"int_t<N>")," - N-bits wide signed integer, 0 < N < 256."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"uint_t<N>")," - N-bits wide unsigned integer, 0 < N < 257."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"MsgAddress")," \u2013 message address which work for both internal or external messages."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"MsgAddressInt")," \u2013 an internal message address."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"MsgAddressExt")," \u2013 an external message address."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"dict_array<T, 32>"),' - a map representing an "array" stored in a dictionaly with 32-bits wide keys which are indices of the array. T must also belong to this list.'),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"dict_map<KeyT, ValueT>")," - a map. ValueT must also belong to the list, ",(0,o.kt)("inlineCode",{parentName:"li"},"KeyT")," must be ",(0,o.kt)("inlineCode",{parentName:"li"},"uint_t<N>"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"dict_map<KeyT, ValueT>")," - a map. ValueT must also belong to the list, ",(0,o.kt)("inlineCode",{parentName:"li"},"KeyT")," must be ",(0,o.kt)("inlineCode",{parentName:"li"},"uint_t<N>"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"sequence<uint_t<8>>"),' - a sequence of 8-bit unsigned values, it might also be seen as an "array" of 8-bits values; it\u2019s usually cheaper to use sequentially stored data then maps.'),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"lazy<T>")," - value of ",(0,o.kt)("inlineCode",{parentName:"li"},"T"),", but the parsing is deferred until the actual value is needed. Only lazy, lazy and lazy are supported at the moment."),(0,o.kt)("li",{parentName:"ul"},"a compound type \u2013 a POD structure which only have data members of types from the list. When a compound type is used, it\u2019s encoded the same way the sequence of its element does. Also note, that for the sake of ABI generation (see below) the names of the members are used, so be aware of possible collisions. Aside from that, public methods might have an arbitrary signature. However, at the moment C++ for TVM does not support public method templates. For Hello, world contract all we need is the constructor and a method that sends an external message:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// Hello world interface\nstruct IHelloWorld {\n  // Handle external messages only\n  __attribute__((external))\n  void constructor() = 1;\n\n  // Handle external messages only\n  __attribute__((external))\n  uint_t<8> hello_world() = 2;\n};\n")),(0,o.kt)("p",null,"All the methods here are pure virtual ones, and N in ",(0,o.kt)("inlineCode",{parentName:"p"},"= N")," designates their IDs. These IDs must be unique within a contract and an ID must also not be equal to 0. Also methods have to be marked with at least one of the attributes:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"external \u2013 the method handles external incoming messages"),(0,o.kt)("li",{parentName:"ul"},"internal \u2013 the method handles internal incoming messages"),(0,o.kt)("li",{parentName:"ul"},"getter \u2013 the method could be executed offchain, thus you can read persistent data without paying for it. As you might have noticed, a public method could return. In such a case, the return value is interpreted as the value that needs to be sent via an external message, so an off-chain application can handle it. The type of the return value must also belong to the list above. Note that TVM supports multiple return values. Struct return type is the way to use the feature from C++. ",(0,o.kt)("inlineCode",{parentName:"li"},"Hello, world!")," contract doesn't need any persistent data member, however, currently, it's required to have at least one field of data otherwise you'd receive a weird looking error message. For ",(0,o.kt)("inlineCode",{parentName:"li"},"Hello, world!")," contract, we use the following persistent data.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// Hello world persistent data\nstruct DHelloWorld {\n  uint_t<1> x;\n};\n")),(0,o.kt)("p",null,"Finally, events might be interpreted as a kind of off-chain function calls. When a public method emits an event it works similar to another public method call implying that the message containing the function ID and the call parameters is emitted. However, in case of an event, this message is to be sent externally (i.e. outside of the blockchain), so an external handle could process it. Events are pure virtual methods as well, but they are not supposed to ever be defined or called. Also, their IDs must be different from the IDs of public methods. For Hello, world contract we don't need events at all:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// Hello world events\nstruct EHelloWorld {};\n")),(0,o.kt)("p",null,"Putting all together, below is the complete listing of Hello, world contract interface."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"#pragma once\n\n#include <tvm/schema/message.hpp>\n\nnamespace tvm { namespace schema {\n\n// Hello world interface\nstruct IHelloWorld {\n  // Handle external messages only\n  __attribute__((external))\n  void constructor() = 1;\n\n  // Handle external messages only\n  __attribute__((external))\n  uint_t<8> hello_world() = 2;\n};\n\n// Hello world persistent data\nstruct DHelloWorld {\n  uint_t<1> x;\n};\n\n// Hello world events\nstruct EHelloWorld {};\n\n}} // namespace tvm::schema\n")),(0,o.kt)("h3",{id:"implementation"},"Implementation"),(0,o.kt)("p",null,"To implement a contract some SDK headers will be of help."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"tvm/schema/message.hpp define message structure which is used in Everscale."),(0,o.kt)("li",{parentName:"ul"},"tvm/contract.hpp implement contract class and essential auxiliary functions to work with it."),(0,o.kt)("li",{parentName:"ul"},"tvm/smart_switcher.hpp implement smart_interface which generates boilerplate code for parsing incoming messages, serializing method results and so on."),(0,o.kt)("li",{parentName:"ul"},"tvm/replay_attack_protection/timestamp.hpp implement timestamp based replay protection which is an essential thing which prevent the same message to be handles more than once. After including the headers, we declare a class that represents the contract.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"using namespace tvm::schema;\nusing namespace tvm;\n\nclass HelloWorld final : public smart_interface<IHelloWorld>,\n                         public DHelloWorld {\n\u2026\n};\n")),(0,o.kt)("p",null,"To utilize smart switcher to not to write message parsing by yourself, a contract class must inherit from ",(0,o.kt)("inlineCode",{parentName:"p"},"start_interface<T>")," where ",(0,o.kt)("inlineCode",{parentName:"p"},"T")," is the type of the struct describing public methods (i.e. the interface) and from the struct describing the contract\u2019s persistent data. Implementation of ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorld")," is trivial:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"public:\n  __always_inline void constructor() final {}\n  __always_inline uint_t<8> hello_world() final {return uint_t<8>(42);};\n\n  // Function is called in case of unparsed or unsupported func_id\nstatic __always_inline int _fallback(cell msg, slice msg_body) { return 0; };\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Notes:    "),(0,o.kt)("ol",{parentName:"blockquote"},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"__always_inline")," is essential here. Remember that the compiler will fail if a function fails to inline."),(0,o.kt)("li",{parentName:"ol"},"The first two methods we\u2019ve already seen. Aside from doing what is written they always perform replay protection check and accept the incoming message. By accepting a message, a contact agrees to pay for its processing and thus the computation the contract makes will not be discarded."),(0,o.kt)("li",{parentName:"ol"},"The last method is called when either message ID is invalid or does not exist (e.g. when a contract sending it doesn\u2019t use the ABI). Smart switcher isn\u2019t able to help this method to parse a message, nor does it insert accept into it. Thus, by doing nothing there, the contract ignores ill-formed incoming external messages. A couple of things needs to be added after the contract class is defined:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"DEFINE_JSON_ABI(IHelloWorld, DHelloWorld, EHelloWorld);\n")),(0,o.kt)("p",null,"Insert logic necessary to generate the ABI file which is required to work with the contract."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"DEFAULT_MAIN_ENTRY_FUNCTIONS(HelloWorld, IHelloWorld, DHelloWorld, 1800)\n")),(0,o.kt)("p",null,"Generate entry points function that transfer control flow to a public method. 1800 here is the argument which configure replay protection. 1800 it\u2019s time in seconds which is recommended by the ABI manual. Putting all together, here is the complete listing of the contract implementation."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'#include "HelloWorld.hpp"\n\n#include <tvm/contract.hpp>\n#include <tvm/smart_switcher.hpp>\n#include <tvm/replay_attack_protection/timestamp.hpp>\n\nusing namespace tvm::schema;\nusing namespace tvm;\n\nclass HelloWorld final : public smart_interface<IHelloWorld>,\n                         public DHelloWorld {\npublic:\n  __always_inline void constructor() final {}\n  __always_inline uint_t<8> hello_world() final {return uint_t<8>(42);};\n\n  // Function is called in case of unparsed or unsupported func_id\n  static __always_inline int _fallback(cell msg, slice msg_body) { return 0; }; };\nDEFINE_JSON_ABI(IHelloWorld, DHelloWorld, EHelloWorld);\n\n// ----------------------------- Main entry functions ---------------------- //\nDEFAULT_MAIN_ENTRY_FUNCTIONS(HelloWorld, IHelloWorld, DHelloWorld, 1800)\n')),(0,o.kt)("h3",{id:"compilation-and-local-testing"},"Compilation and local testing"),(0,o.kt)("p",null,"The code we wrote so far can be found at ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/samples/blob/master/cpp/HelloWorld"},"Hello, world!"),". Let\u2019s assume that we put the contract interface into ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorld.hpp")," and its implementation into ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorld.cpp"),". Compilation consist of two steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Generating the ABI")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"clang++ -target tvm --sysroot=$TVM_INCLUDE_PATH -export-json-abi -o HelloWorld.abi HelloWorld.cpp\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Compiling and linking")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'tvm-build++.py --abi HelloWorld.abi HelloWorld.cpp --include $TVM_INCLUDE_PATH --linkerflags="--genkey key"\n')),(0,o.kt)("p",null,'The first command produces the ABI file. Note that in case the contract uses an unsupported type, clang will silently generate "unknown" for it in the ABI and the contract will not link. The second command compiles and links the contract. It produces address.tvc file and the file named \u201ckey\u201d. Option ',(0,o.kt)("inlineCode",{parentName:"p"},"--genkey")," produces keys to sign messages and store them to specified files (",(0,o.kt)("inlineCode",{parentName:"p"},"<filename>")," - for the private key and ",(0,o.kt)("inlineCode",{parentName:"p"},"<filename.pub>")," for the public one). Currently all external messages have to be signed, otherwise an error number 40 will occur, so we need a key to sign if we plan to test a contract locally."),(0,o.kt)("h3",{id:"debugging-locally"},"Debugging locally"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"tvm_linker")," tool can be used to send messages to and to get messages from a contract. Please note though, that a contract modifies its persistent data stored in tvc file so that such a contract might no longer be deployable to the network. So, we recommend you to make a copy of the contract if you plan to test it locally, or alternatively recompile prior to the deployment. When debugging in linker, the constructor is not called automatically and it supposed to be explicitly invoked by a programmer. In case the constructor does nothing like in ",(0,o.kt)("inlineCode",{parentName:"p"},"Hello, world!")," it isn\u2019t necessary, but for the sake of demonstration we still call it."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ export ADDRESS=`ls *.tvc | cut -f 1 -d '.'`\n$ tvm_linker test $ADDRESS \\\n--abi-json HelloWorld.abi \\\n--abi-method constructor \\\n--abi-params '{}' \\\n--sign key\n")),(0,o.kt)("p",null,"After executing the contract, the linker prints a long message. The most important part of it is that TVM is terminated with 0 exit code i.e. successfully. The second important part is how much gas were spent. Let\u2019s call ",(0,o.kt)("inlineCode",{parentName:"p"},"hello_world")," method to ensure that it works as well."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"tvm_linker test $ADDRESS \\\n--abi-json HelloWorld.abi \\\n--abi-method hello_world \\\n--abi-params '{}'  \\\n--sign key \\\n--decode-c6\n")),(0,o.kt)("p",null,"Here we use ",(0,o.kt)("inlineCode",{parentName:"p"},"--decode-c6")," option (please refer to ",(0,o.kt)("inlineCode",{parentName:"p"},"tvm_tools \u2013help")," for a complete manual on its command-line options) to display the outgoing message and ensure that the contract indeed sends a message containing 42 as a payload. You will find the outgoing message at the end of the linker output. The message body is displayed in hexadecimal form, and 0x2a = 42."),(0,o.kt)("h3",{id:"deploying-and-testing-in-the-network"},"Deploying and testing in the network"),(0,o.kt)("p",null,"Testing in the network is somewhat similar to testing locally, but instead of the linker ",(0,o.kt)("inlineCode",{parentName:"p"},"tonos-cli")," needs to be used and argument passing is a bit different. The deploying workflow is described in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/samples/tree/master/cpp#contract-deployment"},"README")," but we will repeat it once again here. First, we need to recompile the contract since we used for linker tests. Then copy newly generated tvc file (and rename it to ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorld.tvc")," for simplicity) and abi file to ",(0,o.kt)("inlineCode",{parentName:"p"},"tonos-cli/target/<debug or release>/")," After all the preparations, we can execute the following script"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd tonos-cli/target/<debug or release>/\ncargo run genaddr HelloWorld.tvc HelloWorld.abi --genkey hw.key\n")),(0,o.kt)("p",null,"The latter command returns the raw address of the contract. Now you can send (test) coins to it using any method described in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tonlabs/samples/tree/master/cpp#getting-test-coins"},"README"),". When contract balance is greater than 0, we can deploy the contract:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cargo run deploy --abi HelloWorld.abi HelloWorld.tvc '{}' --sign hw.key\n")),(0,o.kt)("p",null,"And finally test ",(0,o.kt)("inlineCode",{parentName:"p"},"hello_world")," method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'cargo run call \u2013abi HelloWorld.abi "<raw address>" hello_world "{}" --sign hw.key\n')),(0,o.kt)("p",null,"The command is supposed to output the message ending with"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'Succeded.\nResult = {"output":{"value0":"0x2a"}}\n')),(0,o.kt)("h2",{id:"authorization"},"Authorization"),(0,o.kt)("h3",{id:"interface-and-implementation"},"Interface and implementation"),(0,o.kt)("p",null,"Now we are ready to extend the contract we just developed. The main issue of ",(0,o.kt)("inlineCode",{parentName:"p"},"Hello, world!")," contract is that ",(0,o.kt)("inlineCode",{parentName:"p"},"hello_world")," public method might be called by anybody. Because a method execution is not free, a stranger might spam the contract and thus spend all its balance. To prevent this, we need to introduce additional checks prior to accepting an incoming external message. To perform this check, the contract will do the following:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Store the public key of the owner when deployed."),(0,o.kt)("li",{parentName:"ol"},"Check the message signature against the key when ",(0,o.kt)("inlineCode",{parentName:"li"},"hello_world")," is called. The implementation is simple. First, we need to add persistent data to the contract.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// Hello world persistent data\nstruct DHelloWorld {\n  uint_t<256> ownerKey;\n};\n")),(0,o.kt)("p",null,"Second, we need to add the following members to ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorld")," contract class:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"// The compiler reads the key from the incoming message and stores is in\n// pubkey_. So the key is available in a public method via tvm_pubkey().\nunsigned pubkey_ = 0;\n__always_inline void set_tvm_pubkey(unsigned pubkey) { pubkey_ = pubkey; }\n__always_inline unsigned tvm_pubkey() const { return pubkey_; }\n")),(0,o.kt)("p",null,"Third, we need to modify the constructor and hello_world method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"/// Deploy the contract.\n__always_inline void constructor() final { ownerKey = tvm_pubkey(); }\n__always_inline uint_t<8> hello_world() final {\n  require(tvm_pubkey() == ownerKey, 101);\n  return uint_t<8>(42);\n}\n")),(0,o.kt)("p",null,"Here we store the public key in the constructor, and then check it in ",(0,o.kt)("inlineCode",{parentName:"p"},"hello_world"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"101")," in require call is the error code which needs to be greater than ",(0,o.kt)("inlineCode",{parentName:"p"},"100")," to not interfere with virtual machine and C++ SDK error codes. The only issue remains is that the contract still accepts the incoming message before it checks the requirements. So, we don\u2019t pay for the outgoing message if a stranger called it, but still pay for the rest of the execution. To fix that problem, we need to change the pure virtual method declaration:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"__attribute__((external, noaccept))\nuint_t<8> hello_world() = 2;\n")),(0,o.kt)("p",null,"We also need to accept explicitly:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"__always_inline uint_t<8> hello_world() final {\n  require(tvm_pubkey() == ownerKey, 101);\n  tvm_accept();\n  return uint_t<8>(42);\n};\n")),(0,o.kt)("h3",{id:"deploying-and-testing-in-the-network-1"},"Deploying and testing in the network"),(0,o.kt)("p",null,"This time we omit testing in the linker (you might do it by yourself, following the instructions from the corresponding subsection section of ",(0,o.kt)("inlineCode",{parentName:"p"},"Hello, world!")," contract). For testing in the network, we generate another key when deploying and then check if we can get result using this key and the previous one which should not be valid. Recompile and copy the contract to ",(0,o.kt)("inlineCode",{parentName:"p"},"tonos-cli/target/<debug or release>/")," similar to the previous contract. Then run:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'cd tonos-cli/target/<debug or release>/\ncargo run genaddr HelloWorld.tvc HelloWorld.abi --genkey auth.key\n#send coins to the contract address somehow\ncargo run deploy --abi HelloWorld.abi HelloWorld.tvc \'{}\' --sign auth.key\ncargo run call \u2013abi HelloWorld.abi "<raw address>" hello_world "{}" --sign hw.key\ncargo run call \u2013abi HelloWorld.abi "<raw address>" hello_world "{}" --sign auth.key\n')),(0,o.kt)("p",null,"The first call will fail and terminate by timeout. Any uncaught exception that occurs prior to accept will not be shown, because currently the node doesn\u2019t support such a feature. To properly diagnose it, you should install EverNode SE and use it for debugging, which is out of scope of this tutorial. The second call should successfully return 0x2a."),(0,o.kt)("h2",{id:"message-exchange"},"Message exchange"),(0,o.kt)("h3",{id:"interface-and-implementation-1"},"Interface and implementation"),(0,o.kt)("p",null,"Finally, we are ready to implement more complex contracts that exchange messages between each other. Giver is a good example of such a contract. We ask the reader to familiarize yourself with the code. Here we only provide some gist of it:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"An internal public method could be declared the same way the external is, but it\u2019s marked with ",(0,o.kt)("inlineCode",{parentName:"li"},"internal")," attribute. An internal method use, the incoming message balance rather than the contract's balance to compute, so unlike an external method, it doesn't need to accept a message."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"tvm/contract_handle.hpp")," provides function to call a method of another contract. To do so, it needs the callee contract\u2019s interface class definition, so that was the reason for separate cpp and hpp part of the contract implementation. The syntax is generally the following:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"auto handle = contract_handle<ICallee>(callee_address);\nhandle(message_balance, message_flags).call<&ICallee::method_name>(parameters\u2026);\n")),(0,o.kt)("p",null,"The first line constructs the handle for the contract. A contract might be called though it. The second line configures the call via ",(0,o.kt)("inlineCode",{parentName:"p"},"operator()")," and then performs it. ",(0,o.kt)("inlineCode",{parentName:"p"},"operator()")," is optional, by default this configuration guarantees that if the sender has enough balance the message will carry 1 000 000 units of money."),(0,o.kt)("h3",{id:"debugging-locally-1"},"Debugging locally"),(0,o.kt)("p",null,"Unlike the previous testing scenarios, we need to check how internal messages work. To do so, first we need generate an outgoing message. Let\u2019s call ",(0,o.kt)("inlineCode",{parentName:"p"},"get_money")," method of ",(0,o.kt)("inlineCode",{parentName:"p"},"Client")," contract and ask the ",(0,o.kt)("inlineCode",{parentName:"p"},"Giver")," with address ",(0,o.kt)("inlineCode",{parentName:"p"},"<Giver address>")," 42 000 units of money:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'tvm_linker test <Client address> \\\n--abi-json Client.abi \\\n--abi-method get_money \\\n--abi-params "{\\"giver\\":\\"<Giver address>\\", \\"balance\\":42000}" \\\n--sign client \\\n--decode-c6\n')),(0,o.kt)("p",null,"After the execution, the message is encoded in one of the last lines of the output:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"body  : bits: 288   refs: 0   data: 00000002000000000000000000000000000000000000000000000000000000000000a410\n")),(0,o.kt)("p",null,"The message is ",(0,o.kt)("inlineCode",{parentName:"p"},"00000002000000000000000000000000000000000000000000000000000000000000a410")," The linker does not automatically send this message to Giver contract, so we need to request it to do so:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'tvm_linker test <Giver address> \\\n--src "<Client address> " \\\n--internal <message balance> \\\n--body 00000002000000000000000000000000000000000000000000000000000000000000a410 \\\n--decode-c6\n')),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"--src")," here is the sender address. It might be omitted if the receiver doesn\u2019t check where the message came from."),(0,o.kt)("h3",{id:"deploying-and-testing-in-the-network-2"},"Deploying and testing in the network"),(0,o.kt)("p",null,"When testing in a real network, you don\u2019t need to send internal messages \u2013 only external ones. So the process does not differ much. However, ",(0,o.kt)("a",{parentName:"p",href:"https://net.ever.live/"},"ever.live")," becomes essential to see all incoming and outgoing messages for a contract. All you need is to specify the raw address, and look at the logs."))}m.isMDXComponent=!0}}]);