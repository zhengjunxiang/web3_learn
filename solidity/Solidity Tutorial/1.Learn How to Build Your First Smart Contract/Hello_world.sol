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
