
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

//在面向对象语言中, this 表示当前对象的一个引用
//在Solidity语言中, this 表示本合约。确切地说，它不是本合约的对象
//this有以下局限性:
//1、不能访问本合约状态变量或常量
//2、当this访问本合约方法时，它认为是外部调用本合约的方法，所以被调用的方法修饰符必须是public或external
//最常用的是address(this),获取本合约地址

contract ThisExample {

    string public name ="Hello";
    
    /*
    function name() public returns(string memory) {
        return "Hello";
    }*/

    function thisCallState() public view returns (string memory){
        string memory _name= this.name();
        return _name;
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function thisCallFunction() public view returns (uint256){
        uint256  _balance= this.getBalance();
        return _balance;
    }

    function getCodes() public view returns(bytes memory) {
        return address(this).code;
    }

    function getCodehash() public view returns(bytes32) {
        return address(this).codehash;
    }

    constructor()payable{}
}
