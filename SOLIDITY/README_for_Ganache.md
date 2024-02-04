 
## 

1. Ganache is a personalized blockchain for Ethereum development. It can be used to run tests, execute commands, and inspect states while controlling how the chain operates. It is provided by Truffle Suite and can be downloaded from `https://www.trufflesuite.com/ganache`

2. Install Node
3. Intall NVM
4. Install Ganache
5. Make sure that truffle compilers 

**For any other errors**
Please visit: `https://stackoverflow.com/questions/54805601/how-do-i-solve-this-truffle-compile-error`



# Implementation of Solidity.

1. . Install Ganache first. Ganache is a personal blockchain for Ethereum development. You must first download and install it. It is available for download from `https://www.trufflesuite.com/ganache` , the official website.



2. Install Truffle Suite: The next step is to set up Truffle Suite, an Ethereum programming framework. The following command will install it using the npm package manager:
        `npm install Truffle`

3. Make a new undertaking: After installing Truffle Suite, you may create a new project by typing the following line in your terminal:

```
truffle init 
```

4. Create your smart contract using Solidity: The final step is to create your smart contract. In the contracts/ directory that Truffle created when you started the project, you can make a new Solidity file.

5. Build your smart contract: After writing your smart contract, you can use the Truffle command line interface to compile it:
```
truffle compile
```

6. Write the following sample code for testing and compile by clicking on the Compile button as shown – 
```
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
 
// Creating a contract
contract Hacthon
{
    // Defining a function
    function get_output() public pure returns (string memory){
        return ("Hello World");
    }
} 

```

7. Set up your smart contract’s deployment parameters. You must identify the network on which you wish to use it. You can do this by making changes to the truffle-config.js file located in your project’s root directory. In order to deploy your smart contract on the Ganache network, you can add a new network configuration. ` network:{ ganache:{ host: "127.0.0.1", port: 7545, network_id:"*"  } }`




8. Deploy your smart contract: After setting up your deployment parameters, use the following command to publish your smart contract to the network:

```
truffle migrate --network ganache
```

Our smart contract will be deployed to the Ganache network as a result.


 

