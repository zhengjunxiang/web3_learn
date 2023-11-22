// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

// 1、构造函数 ，是一种特殊的方法。主要用来在创建合约时初始化合约对象， 即为合约状态变量赋初始值
// 2、构造函数只能在创建合约时被调用一次。
// 3、Solidity只能有一个构造函数，其他语言可以都多个构造函数
// 4、构造函数的参数不能使用"引用类型"修饰符calldata,只能用Memory
// 5、创建合约的同时如果想转ETH给该合约，需要在构造函数后面加payable修饰符

contract ConstructorExample {
    string public name;
    uint8 public age;

    //constructor(){}

    constructor(string memory _name, uint8 _age) payable {
        name = _name;
        age = _age;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
