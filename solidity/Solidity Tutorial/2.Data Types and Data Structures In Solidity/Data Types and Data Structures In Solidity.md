Solidity is an object-oriented, high-level, and compiled programming language for [writing smart contracts](https://web3.hashnode.com/solidity-tutorial-learn-how-to-build-your-first-smart-contract), as well as [building and deploying Dapps](https://web3.hashnode.com/solidity-tutorial-how-to-build-and-deploy-an-nft-minting-dapp) on different blockchains.

Solidity, like any other programming language, has its own **data types** and  **data structures** , but with a different syntax and application.

This tutorial will go over some of the most often used data types and data structures in Solidity programming languages.

## Nature of Solidity Data Types

Solidity is a statically typed, strongly typed language in nature that performs type checking before the source code is executed.

As a  **statically typed language** , Solidity requires the programmer to declare the data type of each variable ahead of compiling the code (compile-time).

While Solidity as a **strongly typed language** means the data type of a variable cannot be modified or converted to another data type within the program.

## Solidity Data Types

Solidity, like other programming languages, divides its data types into two categories: **value types** and  **reference types** .

## Value Types in Solidity

A value type variable is one that stores data directly in the [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) memory allocated to itself.

These types are passed by value, which means they are copied anytime they are assigned to a new variable or supplied as an argument to a function and any changes made to the new copies do not affect the original data.

![Pass by value](https://cdn.hashnode.com/res/hashnode/image/upload/v1663410700807/V8P0OvCtl.gif?auto=format,compress&gif-q=60&format=webm)

### 1.) Integers

The integer data type in Solidity is used to store integer values. An integer type is further grouped into ***int*** and ***uint*** used to declare ***signed*** and ***unsigned*** type of integers respectively.

#### i. The int/signed integer

The `int` keyword is used to declare signed integers. The signed integer is a data type that can hold both positive and negative integer values in smart contracts.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Signed_Integer_Example{
    int year = 2022; // positive value (✅)
    int temperature = -89; // negative value (✅)
}
```

#### ii. The uint/unsigned integer

The `uint` keyword is used to declare unsigned integers. The unsigned integer is a data type that can only hold positive integer values in smart contracts.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Unsigned_Integer_Example{
    uint year = 2022; // positive value (✅)
    uint temperature = -89; // negative value (❌)
}
```

When you try to assign a negative value to an unsigned data type, you will receive the following `TypeError` message:

```solidity
TypeError: Type int_const -89 is not implicitly convertible to expected type uint256. Cannot implicitly convert signed literal to an unsigned type.
```

### 2.) Bytes

Bytes in Solidity are fixed-size byte arrays that contain a sequence of bytes. The length of the byte array is defined at the front of the bytes as in `bytes1` to `bytes32`.

The number is equivalent to the number of characters the byte array variable can contain.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Bytes_Array_Example{
    bytes1 one_character = "a"; // 1 character (✅)
    bytes2 two_characters = "ab"; // 2 characters (✅)
    bytes3 three_characters = "abc"; // 3 characters (✅)
    bytes4 four_characters = "abcd"; // 4 characters (✅)
    bytes5 five_characters = "abcde"; // 5 characters (✅)
    bytes32 thrity_two_characters = "abcdefghijklmnopqrstuvwxyz123456"; // 32 characters (✅)
}
```

When you attempt to assign a number of characters that exceed the fixed size of bytes, as shown below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Bytes_Array_Example{
    bytes1 one_character = "ab"; // single value (❌)
    bytes1 two_characters = "abc"; // single value (❌)
}
```

You will receive the following `TypeError` message:

```solidity
TypeError: Type literal_string "abc" is not implicitly convertible to expected type bytes1. Literal is larger than the type.
```

### 3.) Booleans

Boolean in Solidity is denoted by the `bool` keyword and like every other programming language, boolean in Solidity accepts just two values: `true` and `false`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Boolean_Example{
    bool isEthereumMerge = true; // (✅)
    bool currentUserCanMintToken = false; // (✅)

    bool isRaining = "true"; // (❌)
    bool isAdmin = "false"; // (❌)
}
```

When you try to assign a non-boolean value to a boolean variable, you will receive the following `TypeError` message:

```solidity
TypeError: Type literal_string "true" is not implicitly convertible to the expected type bool.
```

### 4.) Address

The address is a special data type in Solidity, capable of receiving and sending Ether to and from it. The address data type is designed to store an Ethereum address, which usually begins with the `0x` value.

Addresses are 20 bytes in size and contain 42 characters.

```solidity
0x0000000000000000000000000000000000000000
```

Addresses are also non-case-sensitive hexadecimal digits generated from the [Keccak-256 hash](https://cryptomarketpool.com/keccak256/) of the [public key](https://www.cs.utexas.edu/users/moore/acl2/manuals/current/manual/index-seo.php/ETHEREUM____PUBLIC-KEY-TO-ADDRESS).

When you try to assign a string to an address data type, as shown below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Address_Example{
    address user_address = 0x0000000000000000000000000000000000000000; // (✅)
    address user_home_address = "Street 2, downtown road"; // (❌)
}
```

You'll get the following `TypeError` message:

```solidity
TypeError: Type literal_string "Street 2, downtown road" is not implicitly convertible to expected type address.
```

When you try to assign a non-hexadecimal number to an address data type, as shown below with an octal number:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Address_Example{
    address user_address = 0x0000000000000000000000000000000000000000; // (✅)
    address phone_address = 080123456789; // (❌)
}
```

You'll get the following `ParserError` message:

```solidity
ParserError: Octal numbers not allowed.
```

Address value types are further divided into two:

| function              | `address` | `address payable` |
| --------------------- | ----------- | ------------------- |
| Check address balance | ✅          | ✅                  |
| Send Ether            | ❌          | ✅                  |
| Receive Ether         | ❌          | ✅                  |

**Pro Tip:** When you want your smart contract to receive and send Ether, use the `address payable` value type. When you don't want your smart contract to receive or transfer Ether, use the plain `address` value type.

### 5.) Enums

Enum data types, also known as enumerations, enable developers to create user-defined data types. The user-defined data are names assigned to an integral constant value starting from zero.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Enum_Example{
    enum Status {
        Sending, // 0
        Success, // 1
        Failed // 2
    }

    Status status;

    function sendSomething () public {
        status = Status.Sending; // set status to sending
    }
}
```

From the code snippet above, we created a `Status` enum that holds the status of action when we send something. We can then use the enum to update the status of the action to any of the predefined statuses in the `Status` enum.

## Reference Types in Solidity (Data Structure)

A reference type variable is one that stores the location (memory address) of their data on the [Heap](https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS2/html/HeapMem.html) memory and they don't share their data directly.

Changes made to the reference data will always affect the original data.

![Pass by reference](https://cdn.hashnode.com/res/hashnode/image/upload/v1663410953300/56kIHvRbD.gif?auto=format,compress&gif-q=60&format=webm)

Examples of reference types in Solidity include strings, structs, arrays, and mapping.

### 1.) String

The `string` type is a sequence of characters. Solidity supports both string literals using single-quotes `' '` and double-quotes `" "`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract String_Example{
        string name = "John Doe";
}
```

### 2.) Structs

The `struct` data type is a reference data type that can be used to create a structure of other data types. A struct can contain both value type and reference type including other structs but not a struct of itself.

A struct can be created in Solidity using the syntax below:

```solidity
struct <Struct_Name> {
    <data_type> <variable_name>; 
}
```

The `data_type` can be a `string`, `int`, `uint`, `bool`, or any solidity data type. Structs can be declared outside of a smart contract and imported into another contract.

A use case of a struct can be seen below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Struct_Example{
    // User profile structure
    struct UserProfile {
        string fullName; // string
        bool isOnboarded; // boolean
        uint age; // unsigned integer (no negative)
    }

    // Create a new record using the created structure
    UserProfile _newUserProfile = UserProfile("Ayodele Samuel Adebayo", true, 19);

    // Get the created profile
    function getUserProfile() public view returns (string memory, bool , uint ){
        return (_newUserProfile.fullName, _newUserProfile.isOnboarded, _newUserProfile.age); 
    }
}
```

From the code above; we created a struct for the user profile that expects a `fullName`, the `isOnboarded` status, and the user `age`. We then use this structure to create a new user with a function that returns the information of the created profile.

 **Takeaway** : Using structs in Solidity makes our code more organized, maintainable, reusable, and readable.

### 3.) Arrays

An array is a collection of variables with the same data type. They're stored in a continuous memory location with each array item having a unique index.

Array in Solidity can be fixed or dynamic in size and each array item can be searched by its unique index.

#### i. Dynamic Array

A dynamic array can be created in Solidity using the syntax below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Dynamic_Array_Syntax{
    <datatype[]> <variable_name> = <[array_items]>
}
```

Below is an example of a `string` dynamic array of names and a `uint` dynamic array of numbers:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Dynamic_Array_Example{
    string[] arrayOfNames = ["Faith", "Becky", "Steve"];
    uint[] arrayOfNumbers = [0, 1, 2, 3, 4, 5];
}
```

#### ii. Fixed-Size Array

A fixed-size array can be created using the syntax below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Fixed_Size_Array_Syntax{
    <datatype[size]> <variable_name> = <[array_items]>
}
```

Below is an example of a 2 fixed-sized `string` array of names and 1 fixed-sized `uint` dynamic array of numbers:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Fixed_Size_Array_Example{
    string[2] arrayOfNames = ["Faith", "Becky"];
    uint[1] arrayOfNumbers = [0];
}
```

When you try to exceed the fixed-size limit:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Fixed_Size_Array_Example{
    string[2] arrayOfNames = ["Faith", "Becky", "Steve"]; // (❌)
    uint[1] arrayOfNumbers = [0, 1, 2]; // (❌)
}
```

You'll get the following `TypeError` messages, respectively:

```solidity
TypeError: Type string[3] memory is not implicitly convertible to expected type string[2] storage ref.
```

```solidity
TypeError: Type uint8[3] memory is not implicitly convertible to expected type uint256[1] storage ref.
```

### 4.) Mapping

Mapping in Solidity is a key-value pair data structure that functions similarly to a dictionary in Python and hashtables or objects in JavaScript.

Mapping can be created in Solidity with the following syntax:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Mapping_Syntax{
        mapping (key => value) variable_name;
}
```

Where the `key` can be any data type except for reference type and the `value` can be both value type and reference type.

Below is an example of mapping users' wallet addresses to their balances:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

contract Mapping_Example{
        mapping (address => uint) users_balances;

```

From the above data structure implementation, we can retrieve the crypto balance of users from the blockchain in `uint` type using their wallet `address`.

## Wrapping Up

Data types and data structures are the foundation of any programming language and the building blocks for developing advanced Dapps with Solidity.

In this tutorial, we've gone through the most commonly used data types and data structures in Solidity programming language.

## What's Next?

Now that you've learned about the data types and data structures in Solidity:

* [Learn How to Build Your First Smart Contract](https://web3.hashnode.com/solidity-tutorial-learn-how-to-build-your-first-smart-contract)
* [How to Build dApps Faster with Web3 and NFT APIs](https://web3.hashnode.com/web3-apis-how-to-build-dapps-faster-with-web3-and-nft-apis)
* [How to Build a Web3 Login with Web3.js Library](https://web3.hashnode.com/how-to-build-a-web3-login-with-web3js-library)
