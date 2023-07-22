## Introduction

APIs help you create high-quality and maintainable decentralized applications (dApps) that interact with the blockchain to get information about blocks, transactions, metadata, token pricing, etc.

In this article, we’ll talk about different web3 platforms that provide efficient APIs that power communication between your dApps and the blockchain.

## How Do dApps Communicate With The Blockchain?

DApps are blockchain-based applications that allow users to interact with smart contracts deployed on the blockchain.

Every dApp requires a remote procedure call (RPC) node to perform its functionalities, as it facilitates communication between your dApps and the blockchain.

This implies that without an RPC, your dApp will not be able to perform transactions on the blockchain.

## What is an RPC Node?

> Node: Computer or server

RPC is a traditional way of establishing a communication channel between two or more systems in different locations.

![RPC is a traditional way of establishing a communication channel between two systems - Diagram representation of how RPC nodes operate between two systems](https://cdn.hashnode.com/res/hashnode/image/upload/v1650048391995/K2YIW_slb.png?auto=compress,format&format=webp)

An RPC node is also called the  *brain-box of crypto* , since it manages the interactions between systems. In a distributed system (like your dApp), the execution of subroutines in separate places is frequent.

RPCs can be compared to [Rest APIs](https://www.redhat.com/en/topics/api/what-is-a-rest-api), which you can host yourself, but they only entertain a **GET** and **POST** communication method between two different systems (your dApp and the blockchain). On the other hand, Rest APIs support the  **GET** ,  **POST** ,  **PATCH** ,  **PUT** , and **DELETE** methods.

## Should You Develop an RPC Node?

 **Short answer** : No! Don't do it.

 **Long answer** : RPC nodes can be very difficult to develop and maintain by yourself, especially if you're building one for your dApp with little to no knowledge of when and how to use them correctly.

Below are some of the limitations of developing and self-hosting an RPC node:

* RPCs are not standard, the concept can be implemented in different ways.
* RPCs require complex infrastructure to work properly.
* RPCs are time-consuming because of their complex infrastructure.
* RPCs are expensive to create and maintain.
* RPCs require a lot of resources.
* RPC is only interaction-based.
* Building around RPC Nodes is not a long-term solution.

RPC limitations can be exhausting. You probably don’t even need to develop or host an RPC node on your own because now, there are many web3 platforms that provide solutions to these limitations.

The RPC service providers offer a web3 backend service and some of the best **web3** and **NFT APIs** to power your dApp with a small fee..

## What Are Web3 APIs?

Web3 APIs are blockchain APIs made available by web3 platforms like [Moralis](https://moralis.io/), [Alchemy](https://www.alchemy.com/) and [QuickNode](https://www.quicknode.com/). These platforms address the limitations of RCP nodes, and allow anyone to query data across multiple blockchain projects in a simple way that saves time and resources.

![Web3 APIs allow anyone to easily interact with the blockchain and they are created to address the limitations of RCP nodes](https://cdn.hashnode.com/res/hashnode/image/upload/v1650051920120/pIEbjbOCT.jpeg?auto=compress,format&format=webp)

With a single line of code, web3 APIs can be used to authenticate a user and retrieve information about blocks, transactions, NFT metadata, token prices, etc.

Before creating an RPC from scratch, you should look at these web3 platforms to see whether they provide an API that caters to the requirements of your dApp.

The following are a few examples of dApps that can be created using the web3 and NFT APIs:

* NFT marketplace
* On-chain NFT games
* Digital Assets Ownership Verifier
* NFT minter
* [Web3 authentication](https://web3.hashnode.com/how-to-build-a-web3-login-with-web3js-library).
* [NFT explorer](https://web3.hashnode.com/how-to-build-your-own-nft-explorer-with-moralis-react-sdk).

Some of the web3 APIs and NFT APIs provided by Moralis, Alchemy, and QuickNode are listed below:

## 1. Moralis Web3 APIs

[Moralis](https://moralis.io/) is a web3 platform that provides a backend service for blockchain projects. They offer the highest numbers of web3 and NFT APIs for authentication, blockchain account information, etc.

![Moralis is a next-gen Web3 and dApp development platform. Moralis provides users with a fully managed, infinitely scalable, serverless blockchain backend infrastructure. - Moralis Official landing page](https://cdn.hashnode.com/res/hashnode/image/upload/v1650046360556/Wsqz_WARa.png?auto=compress,format&format=webp)

### Moralis Web3 API - Authentication

Moralis allows you to authenticate users on any blockchain with just one line of code:

```solidity
Moralis.authenticate()
```

### Moralis Web3 API - Account Information

* Get the user's account transaction histories with Moralis web3 API:

```solidity
const transactions = await Moralis.Web3API.account.getTransactions();
```

* Get the user's token balances with Moralis web3 API:

```solidity
const balances = await Moralis.Web3API.account.getTokenBalances();
```

* Get ERC20 token transfers for the current user with Moralis web3 API:

```solidity
const userTrans = await Moralis.Web3API.account.getTokenTransfers();
```

### Moralis Web3 API -Native Asset Transfer

* Transfer tokens between accounts in ETH (Ethereum), BNB (Binance Smart Chain), and MATIC (Polygon) blockchain with Moralis web3 API:

```solidity
// sending 0.5 ETH
const options = {
  type: "native",
  amount: Moralis.Units.ETH("0.5"),
  receiver: "0x.."
};
let result = await Moralis.transfer(options);
```

### Moralis Web3 API - File Upload (IPFS)

Moralis provides an endpoint to store and share files on the blockchain. This system is known as  **IPFSInterPlanetary File System (IPFS)** .

* Upload multiple files on the blockchain and place them in a Moralis folder directory with Moralis web3 API:

```solidity
const options = {
  abi: [
    {
      path: "moralis/logo.jpg",
      content:
        "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
    },
  ],
};
const path = await Moralis.Web3API.storage.uploadFolder(options);
```

> Code snippets examples are from the [Moralis Web3 API documentation](https://docs.moralis.io/moralis-dapp/web3-sdk).

## 2. Moralis NFT APIs

* Get all NFTs owned by the current user with Moralis NFT API:

```solidity
const userEthNFTs = await Moralis.Web3API.account.getNFTs();
```

* Get any NFT transfers for the current user with Moralis NFT API:

```solidity
const transfersNFT = await Moralis.Web3API.account.getNFTTransfers();
```

* Get the lowest price (in Eth) of any NFT in the last X days with Moralis NFT API:

```solidity
const options = { address: "0xd...07", days: "3" };
const NFTLowestPrice = await Moralis.Web3API.token.getNFTLowestPrice(options);
```

* Get the NFT data based on a metadata search with Moralis NFT API:

```solidity
const options = { q: "Pancake", chain: "bsc", filter: "name" };
const NFTs = await Moralis.Web3API.token.searchNFTs(options);
```

* Get NFT owners and an array with their NFT metadata (name, symbol) for a given token contract address with Moralis NFT API:

```solidity
const options = { address: "0xd...07", chain: "bsc" };
const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
```

* Transfer NFTs from one account to another with Moralis NFT API:

```solidity
// sending a token with token id = 1
const options = {
  type: "erc721",
  receiver: "0x..",
  contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  tokenId: 1,
};
let transaction = await Moralis.transfer(options);
```

* Get NFT Metadata on Solana network with Moralis NFT API:

```solidity
// get devnet metadata for a given SPL NFT address
const options = {
  network: "devnet",
  address: "6XU36wCxWobLx5Rtsb58kmgAJKVYmMVqy4SHXxENAyAe",
};
const nftMetadata = await Moralis.SolanaAPI.nft.getNFTMetadata(options);
```

> Code snippets examples are from the [Moralis NFT documentation](https://docs.moralis.io/moralis-dapp/web3-sdk/nft-api).

## 3. Alchemy NFT APIs

[Alchemy Web3 API](https://alchemy.com/) is a drop-in replacement for [web3.js](https://web3.hashnode.com/what-is-web3js-an-introduction-into-the-web3js-libraries), which was created to operate easily with Alchemy. It also provides powerful APIs to power dApps with features that aren’t available in ordinary nodes.

![Alchemy is a drop-in replacement for web3.js that provides powerful APIs to power dApps with features that are not available in ordinary nodes. - Alchemy Official Landing page](https://cdn.hashnode.com/res/hashnode/image/upload/v1650046228888/G_byZnxX-.png?auto=compress,format&format=webp)

* Get all NFTs currently owned by a given address with Alchemy NFT API:

```solidity
const nfts = await web3.alchemy.getNfts({owner: "0xC33881b8FD07d71098b440fA8A3797886D831061"})
```

* Get the metadata associated with a given NFT with Alchemy NFT API:

```solidity
const response = await web3.alchemy.getNftMetadata({
  contractAddress: "0x5180db8F5c931aaE63c74266b211F580155ecac8",
  tokenId: "1590"
})
```

* Get the owner of a token for ERC721 and ERC1155 contracts with Alchemy NFT API:

```solidity
import fetch from 'node-fetch';

var requestOptions = {
   method: 'GET',
   redirect: 'follow'
};

const apiKey = "demo"
const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getOwnersForToken`;
const contractAddr = "0x04b14e3383d42685ae16af3c47b21b2d5941d27e";
const tokenId = "867";
const fetchURL = `${baseURL}?contractAddress=${contractAddr}&tokenId=${tokenId}`;

fetch(fetchURL, requestOptions)
.then(response => response.json())
.then(response => JSON.stringify(response, null, 2))
.then(result => console.log(result))
.catch(error => console.log('error', error));
```

> Code snippets examples are from [Alchemy’s documentation](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api).

## 4. QuickNode NFT APIs

[QuickNode](https://quicknode.com/) is a web3 platform that allows users to build and grow dApps through their RPC endpoints for over 10 networks, including Ethereum and Solana.

![Find Real-Time NFT Data On Demand with QuickNode API and grow blockchain-powered apps (dApps) through their RPC endpoints - QuickNode NFT API Official Landing Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1650049740823/FgaH8wn78.png?auto=compress,format&format=webp)

* Verify an NFT owner on the Ethereum blockchain with QuickNode NFT API:

```solidity
const heads = await provider.send(
    "qn_verifyNFTsOwner",
[
   "0x8ae6422631292c31aeeb2efe154d6326f703f46b",
  [
     "0x60e4d786628fea6478f785a6d7e704777c86a7c6:1090",
  ]
]
```

* Fetch and filter NFTs from Ethereum and Solana networks with QuickNode NFT API:

```solidity
const heads = await provider.send("qn_fetchNFTs", [
    "0x63a63d7b0a4da84e095bac389845615a09e05546",
   [
      "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
   ],
]);
```

* Find NFTs with their creators’ address with QuickNode NFT API:

```solidity
// not currently supported by solanaJS
const axios = require("axios");
(() => {
  const url = "https://quick-infra-structure.solana-mainnet.quiknode.pro/4456aaba19e98f28c900e9d5f997d6f39728f551/";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "qn_fetchNFTsByCreator",
    params: [{
      creator: "5GUrnehPCrVeAeo29sgH3KbPhTvEDaH8HJqonYUceVM",
      page: 1,
      perPage: 3
    }]
  };
  axios
    .post(url, data, config)
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch((err) => {
      // handle error
      console.log(err);
    });
})();
```

* Get gas price with QuickNode NFT API:

```solidity
const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://sample-endpoint-name.network.quiknode.pro/token-goes-here/");
  const gasPrice = await provider.getGasPrice();
  console.log(gasPrice);
})();
```

* Get user wallet balance with QuickNode NFT API:

```solidity
const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://sample-endpoint-name.network.quiknode.pro/token-goes-here/");
  const balance = await provider.getBalance(
    "0x8D97689C9818892B700e27F316cc3E41e17fBeb9",
    "latest"
  );
  console.log(balance);
})();
```

> Code snippets examples are from [QuickNode documentation](https://www.quicknode.com/docs/ethereum).

## Wrapping Up

You’ve probably realized why building an RPC from the ground up might not be the best solution for your dApp. Instead, it might be easier to leverage web3 and NFT APIs from web3 API providers like Moralis, Alchemy, and Quicknode.

Using web3 and NFT APIs speeds up and ensures the reliability of your development. You should also explore each web3 and NFT API provider to see which one provides the best solutions for your dApp.

## Where Do You Go Next?

Now that you've learned about web3 and NFT APIs to power your dApps:

* Learn How to Build Your Own NFT Explorer with Moralis React SDK [here](https://web3.hashnode.com/how-to-build-your-own-nft-explorer-with-moralis-react-sdk).

![Demo of How to Build your Own NFT Explorer with Moralis React SDK](https://cdn.hashnode.com/res/hashnode/image/upload/v1649161337640/WFt8uZi1z.gif?auto=format,compress&gif-q=60&format=webm)

* Learn How to Build a Web3 Login with Web3.js Library [here](https://web3.hashnode.com/how-to-build-a-web3-login-with-web3js-library).

![Final web3 login implementation demonstration](https://cdn.hashnode.com/res/hashnode/image/upload/v1647297582089/EWkN7pJkS.gif?auto=format,compress&gif-q=60&format=webm)

* Solidity Tutorial - Learn How to Build Your First Smart Contract [here](https://web3.hashnode.com/solidity-tutorial-how-to-build-your-first-smart-contract).
