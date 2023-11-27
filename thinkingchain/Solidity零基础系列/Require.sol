// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Require 输入值的校验
// Require 接收两个参数:1、布尔值,2、字符串
// Require 参数布尔值为false的时候，程序会抛出异常
contract RequireExample {
    address payable public owner;
    uint8 public age;
  
    constructor() {
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(owner == msg.sender,"Not Owner");
        owner.transfer(address(this).balance);
    }

    function setAge(uint8 _age) public {
        require(_age <= 100 ,"greater 100");
        age = _age;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}

}
