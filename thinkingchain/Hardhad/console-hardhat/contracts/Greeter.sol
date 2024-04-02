//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.24;

contract Greeter {
    string public greeting;

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}