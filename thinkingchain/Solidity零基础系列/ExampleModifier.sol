// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract ExampleModifier {

    address public owner;
    uint256 public amount;
    bool public passed100;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier validAmount(uint256 _amount) {
        console.log("1");
        require(_amount == 100,"Amount should be 100");
        console.log("2");
        _;
        console.log("3");
        passed100 = true;
    }

    function updateAmount(uint256 _amount) public onlyOwner validAmount(_amount){ 
        console.log("4");
        amount = _amount;
       // revert("error");
        console.log("5");
    }
}
