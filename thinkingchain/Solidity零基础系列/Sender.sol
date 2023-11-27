// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//msg.sender,它是一个全部变量,在Solidity中任何一个地方都可以使用
//msg.sender,它是一个地址(address),有可能是个人钱包地址(EOA),也有可能是合约地址
//msg.sender,它是发起调用转账或调用他人合约的地址

contract Callee {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function whoCallTheCalleeFunction() public view returns (address) {
        return msg.sender;
    }
}

contract Caller {
    Callee public callee;

    constructor(Callee _callee) {
        callee = _callee;
    }

    function callTheCalleeFunction() public view returns (address) {
        address _address = callee.whoCallTheCalleeFunction();
        return _address;
    }
}

