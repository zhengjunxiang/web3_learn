> https://web3.hashnode.com/solidity-tutorial-learn-how-to-build-your-first-smart-contract

This Solidity tutorial will guide you on how to write your first [smart contract](https://web3.hashnode.com/glossary/what-are-smart-contracts).

## Prerequisites

Before you start with this Solidity tutorial, you need to have a basic understanding of programming concepts like functions, variables, and know what an IDE is.

## What are Smart Contracts?

Smart contracts are functions that are deployed and executed on the blockchain only when a specific condition is satisfied, without the involvement of any third parties.

Because smart contracts are immutable and distributed by nature, they cannot be modified or updated after they’ve been written and deployed. Also, distributed in the sense that anyone can check and look at the smart contract status and transaction histories on the blockchain.

## How to Build Smart Contracts?

Smart contracts may be written in a variety of programming languages, including Javascript, Rust, Go, and Yul, although Solidity is the most widely used and official smart contract language.

## What is Solidity?

Solidity is an object-oriented, high-level, and compiled programming language for writing smart contracts. Solidity is easier for anyone with JavaScript knowledge because it’s syntactically similar to JavaScript.

## Solidity Syntax

The following is an example of a simple Solidity smart contract:

**COPY**

```solidity
// 1. SPDX-License-Identifier: MIT

// 2. Solidity Version
pragma solidity ^ 0.8.13;

// 3. Contract
contract My_Smart_Contract {

    // 4. Contract state declaration
    string public myName;

    // 5. Constructor to initialize value to declared states
    constructor() {
        myName = "Samuel";
    }

    // 6. Contract function
    function showMyName() public view returns (string memory) {
        return myName;
    }
}
```

### 1. Solidity Smart Contract License

Every developer is encouraged to add a machine readable license at the top of their Solidity Source file, as shown below:

**COPY**

```
// SPDX-License-Identifier: MIT
```

The MIT license is similar to the license you'll find on [GitHub](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository). You can add the `UNLICENSED` value if you don't want to specify a license on your Solidity source file, but this should not be left blank.

You can check out the complete list of Solidity Licenses supported by SPDX [here](https://spdx.org/licenses/).

### 2. Solidity Pragma

A pragma directive instructs the Solidity compiler on the version a smart contract should run on.

The pragma directive below shows that the smart contract is written for Solidity version 0.8.13. The caret symbol indicates that the Solidity program should not work with versions less than 0.8.0 or versions beginning with 0.9.0.

**COPY**

```
pragma solidity ^ 0.8.13;
```

A pragma directive is always local to the source file, which means you have to add it to all of your source files.

### 3. Solidity Contract

A contract is a collection of states and functions that is deployed on the blockchain at a specified address.

**COPY**

```
contract My_Smart_Contract {}
```

### 4. Variables in Solidity

Solidity is a statically-typed programming language, meaning that the state and local variables in a Solidity program must be declared by the programmer before compiling the smart contract.

Here's an example of declaring a variable in Solidity:

**COPY**

```
string public myName;
```

The defined variable is initialized as follows:

**COPY**

```
myName = "Samuel";
```

The above variable can be declared and initialized like this:

**COPY**

```
string myName = "Samuel";
```

There are 3 main types of variables in Solidity: local, state, and global variables.

#### 1. Local variable

These are variables declared inside of a solidity function, and they’re not stored on the blockchain.

#### 2. State variables

The state variables are variables that are declared outside of a solidity function, and they’re permanently stored on the blockchain.

**3. Global variables**

Solidity global variables are variables that are accessible by other functions. They hold the information about the blockchain and its transaction properties.

### 5. Solidity Constructor

In Solidity, a constructor is a special keyword that’s used to create an optional function that initializes state variables in a smart contract.

**COPY**

```solidity
constructor() {
     myName = "Samuel";
}
```

A smart contract can only have a single constructor, and it only executes once a smart contract has been compiled.

### 6. Solidity Function

In programming, a function is a block of code that performs a task. They’re code components that have been encapsulated into a single object.

The `function` keyword is used to create a function in Solidity, similar to how functions are created in JavaScript.

**COPY**

```
function showMyName() public view returns (string memory) {}
```

Solidity function breakdown:

* The `public` keyword indicates that the function is accessible by other contracts.
* The `view` keyword indicates that the function is read-only on the blockchain, it doesn’t change data on the blockchain..
* The `returns` keyword indicates the data types returned by the function.
* The `string` keyword specifies the data type of the returned value.
* The `memory` keyword means that the variables of the function will be stored in a temporary place while the function is being called.

### 7. Solidity String Concatenation

Concatenation is generally the process of joining one string to the end of another. Concatenation is a very essential concept in any programming language.

Concatenating a string in Solidity is quite different from using the popular `+` sign to concatenate two or more strings together.

In Solidity, we'll make use of a method called `abi` to concatenate two or more strings. The `abi` is a short form of  *Application Binary Interface* , and it allows us to encode or decode parameters into ABI.

**COPY**

```

string a = "A ";
string b = "B ";
string c = "C ";

string(abi.encodePacked(a, b, c));
```

The code above will give the output below:

**COPY**

```
A B C
```

You can read more about the Application Binary Interface from [here](https://www.quicknode.com/guides/solidity/what-is-an-abi).

## Building our First Smart Contract

Now that we have the fundamentals of Solidity under our belt, we’ll proceed to use Solidity to write our first smart contract.

### Step 1 - Solidity IDE - Remix

The fastest way to run a solidity smart contract is by using an online Solidity IDE like Remix (recommended).

The Remix IDE is a powerful, open source Solidity IDE that allows us to quickly write, compile, and deploy smart contracts directly from the web browser.

Visit [remix.ethereum.org](https://remix.ethereum.org/) to launch the Remix IDE on your browser.

![Remix IDE is used to create, compile and deploy smart contracts from the web browser - Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648806330581/w0glk3xqT.png?auto=compress,format&format=webp)

### Step 2 - Creating a Solidity Source File

Next, locate the contracts folder under the "File Explorers" section and create a new `Hello_World.sol` file inside like this:

![How to create smart contract source file](https://cdn.hashnode.com/res/hashnode/image/upload/v1648806904599/SmvUHTSt9.png?auto=compress,format&format=webp)

### Step 3 - Writing the Smart Contract

In this step, we're going to write a `Hello_World` smart contract that will store the information of a pet on the blockchain and return the following sentence below:

> "Hello World! My name is  **Kitty** , I'm **2** years old and my owner's name is  **John Doe** .

The name, age, and owner's information of the pet will be made dynamic using a set function that allows the user to enter their pet's information.

Copy and paste the code below inside of your `Hello_World.sol` file:

**COPY**

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.13;

contract Hello_World {
    string public greetingPrefix = "Hello World! ";
    string public petName;
    string public age;
    string public owner;

    constructor() {
        petName = "Kitty";
        age = "2";
        owner = "John Doe";
    }

    function setPetName(string memory newPetName) public {
        petName = newPetName;
    }

    function setAge(string memory newAge) public {
        age = newAge;
    }

    function setOwner(string memory newOwner) public {
        owner = newOwner;
    }

    function greet() public view returns (string memory){
        return string(abi.encodePacked(greetingPrefix, "My name is ", petName, " I'm ", age, " years old and my owner's name is ", owner));
    }
}
```

In the code above, we're declaring the state variables of our smart contract (`petName`, `age`, and `owner`) as strings. We then set an initial value for the state variables in the constructor function.

When the `greet()` function is called initially without setting the pet name, age, and the owner, the initial pet details in the constructor function will be returned.

Next, `setPetName`, `setAge`, and the `setOwner` are serving as the setter function for our contract, which will receive and set the name, age, and owner state variables respectively.

Finally, the `greet()` function will return a concatenated string to form a sentence with the pet details currently provided in the state variables.

> A Solidity best practice is to name your smart contract the same name as your source file.

### Step 4 - Compiling the Smart Contract

Remix IDE allows us to compile our Solidity smart contracts directly from our browser.

* Ensure to save your source file with `ctrl + s`.
* If you notice a red flag on the pragma directive like this:

![Remix IDE showing red flag for pragma directive](https://cdn.hashnode.com/res/hashnode/image/upload/v1648811465704/Faz7AnA0j.png?auto=compress,format&format=webp)

It means that the Remix IDE compiler is not set to the specified Solidity version in our source code.

To fix this, click on the Solidity compiler icon and select the Solidity version you're using for your smart contract:

![The Solidity version in your smart contract source file must be the same as the Remix IDE compiler version](https://cdn.hashnode.com/res/hashnode/image/upload/v1648824122348/3TNFqcTfh.png?auto=compress,format&format=webp)

Finally, save your source file with `ctrl + s` and click on the compile button. Your Solidity compiler icon should change to green as shown below:

![Resolve Solidity compiler error by setting the Remix IDE to the correct version of your Solidity smart contract source file](https://cdn.hashnode.com/res/hashnode/image/upload/v1648811776761/ljAYRZRA6.png?auto=compress,format&format=webp)

### Step 5 - Deploying the Smart Contract

It's time to deploy our smart contract. Click on the "Deploy & Run Transaction" button from the sidebar.

First, select a JavaScript Virtual Machine Environment (we'll be using the JavaScript London VM for this Solidity tutorial).

You can read more about the Remix IDE Virtual Machine Environment [here](https://remix-ide.readthedocs.io/en/latest/run.html#run-setup).

![Selecting a Virtual Machine Environment for a Solidity Smart Contract on Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648825721997/7YLXBui9F.png?auto=compress,format&format=webp)

Next, leave the other default options as they are, and click on the "deploy" button:

![Deploying a Solidity Smart Contract on Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648811936992/0dzbb_sX0.png?auto=compress,format&format=webp)

If the deploy was successful, you'll see our smart contract name under the **Deployed Contracts** section, which is located under the "deploy" button:

![Solidity Smart Contract is successfully deployed on the Remix IDE and can be found under the Deployed Contracts section](https://cdn.hashnode.com/res/hashnode/image/upload/v1648826841326/zRnDDM9tA.png?auto=compress,format&format=webp)

The Remix IDE provides an interface for us to interact with our smart contract.

Expand the smart contract card to see our smart contract setter function with input boxes by the side, and a "getter function" button to display our state variables.

The `getter` function is automatically generated for all state variables by the Remix IDE.

![The Remix IDE provides an interface to interact with our smart contract](https://cdn.hashnode.com/res/hashnode/image/upload/v1648812827829/-tKIa2VnR.png?auto=compress,format&format=webp)

### Step 6 - Interacting with the Smart Contract

Our first interaction with our smart contract will be to check if the `greet()` function will return our default pet details.

Click on the "greet" button:

![Testing a getter function in Solidity smart contract with Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648813123242/l69Qzv-ae.png?auto=compress,format&format=webp)

> Hello World! My name is **Kitty** I'm **2** years old and my owner's name is **John Doe**

As shown above, the `greet` function returns our smart contract's initial state variables as expected, while also correctly replacing the **greet** sentence placeholders with the state variables.

Next, click on all the "getter function" buttons. Each getter function should return the value from their respective state variables as shown below:

![Testing the state variables from the Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648828100557/fEwOr8UtE.png?auto=compress,format&format=webp)

In this step, we'll test our `setAge` function:

* Fill in the `setAge` input box with a new pet's age.
* Next, click on the `setAge` button to run the function.
* Then, click on the `age` getter button (it should return the new age).
* Finally, click on the `greet` function button.

![Testing Solidity smart contract function in Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648813348427/thO_ZhwiM.png?auto=compress,format&format=webp)

Next, we'll test our `setOwner` function:

* Fill in the `setOwner` input box with the pet's owner.
* Next, click on the `setOwner` button to run the function.
* Then, click on the `owner` getter button (it should return the new owner name).
* Finally, click on the `greet` function button.

The pet's age should be updated to the new pet’s age you entered:

![The state variable of a smart contract will be updated when its getter function is executed on Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648813732935/5ua_O3CEr.png?auto=compress,format&format=webp)

Finally, we'll test our `setPetName` function:

* Fill in the `setPetName` input box with the pet's name.
* Next, click on the `setPetName` button to run the function.
* Then, click on the `petName` getter button (it should return the new pet name).
* Finally, click on the `greet` function button.

The pet's name should be updated to new pet’s name that you entered:

![The state variable of a smart contract will be updated when its getter function is executed on Remix IDE](https://cdn.hashnode.com/res/hashnode/image/upload/v1648814006259/w2p2CdeYI.png?auto=compress,format&format=webp)

Hooray 🎉🎉🎉

Our Solidity smart contract is functioning as expected. You may go ahead and test the smart contract with a different pet name, age, and owner's name.

![Our first solidity smart contract built with Remix IDE is functioning as expected](https://cdn.hashnode.com/res/hashnode/image/upload/v1648814247739/VyVh7b3_E.png?auto=compress,format&format=webp)

## You Made It through this Solidity tutorial! 👏

Congratulations on completing this Solidity tutorial! We've learned how to use the Remix IDE to write, deploy, and interact with our first smart contract.

If you want to break into the web3 industry, learning Solidity is advantageous. Solidity is a compiled language which you can run directly from the Remix IDE on your computer’s browser.

## Where do you go next?

Now that you've learned how to write and deploy your first Solidity smart contract, as well as how to interact with smart contracts in Remix IDE:

* Learn How to Build a Web3 Login with Web3.js Library [here](https://web3.hashnode.com/how-to-build-a-web3-login-with-web3js-library).
* Learn How to Build your Own NFT Explorer with Moralis React SDK [here](https://web3.hashnode.com/how-to-build-your-own-nft-explorer-with-moralis-react-sdk).

If you're interested in learning web3 as a developer or want to brush up your knowledge on web3 technologies. We've got you covered on our [web3 blog](https://web3.hashnode.com/).

You can also find more educational articles about web3 in general, NFTs, DAOs, etc. on our web3 blog [here](https://web3.hashnode.com/).
