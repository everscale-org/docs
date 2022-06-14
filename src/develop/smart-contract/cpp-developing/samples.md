---
sidebar_position: 2
---

# Samples

Testing in the network is somewhat similar to testing locally, but instead of the linker tonos-cli needs to be used and argument passing is a bit different. The deploying workflow is described in README but we will repeat it once again here. First, we need to recompile the contract since we used for linker tests. Then copy newly generated tvc file (and rename it to HelloWorld.tvc for simplicity) and abi file to

        tonos-cli/target/<debug or release>/ 
        
 After all the preparations, we can execute the following script

    cd tonos-cli/target/<debug or release>/
    cargo run genaddr HelloWorld.tvc HelloWorld.abi --genkey hw.key

The latter command returns the raw address of the contract. Now you can send (test) coins to it using any method described in README. When contract balance is greater than 0, we can deploy the contract:

    cargo run deploy --abi HelloWorld.abi HelloWorld.tvc '{}' --sign hw.key

And finally test hello_world method:

    cargo run call –abi HelloWorld.abi "<raw address>" hello_world "{}" --sign hw.key

The command is supposed to output the message ending with

    Succeded.
    Result = {"output":{"value0":"0x2a"}}

>  The documentation in Everscale repository is a community effort. Therefore, everyone can contribute with proposals for new topics, suggest new content elements, participate in editing, and provide ideas that will be of great help for network development.
Please be informed that our documentation can be [edited via GitHub](https://github.com/everscale-org/docs/issues).  
  Also please make sure to consult our rules and rewards policy via [this link](https://docs.everscale.network/contribute/hot-streams/documentations).  
  Feel free to join [Everscale Documentation Development Telegram chat](https://t.me/+C2IpQXWZtCwxYzEy) and [Everscale Developers Onboarding Telegram chat](https://t.me/+Vca1Gs6uPzIyNWVi)!