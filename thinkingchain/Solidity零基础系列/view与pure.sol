// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//1、 默认的方法既可访问也可修改链上数据(状态变量)
//2、 View 可以访问链上数据(状态变量)，但不能修改链上数据
//3、 Pure 不能访问链上数据
//4、 外部调用View或Pure修饰的方法，不需要支付Gas，并不意味着EVM产生执行Gas(execution costs)

contract ViewPureExample {

    uint256 public age;

    function increaseAge() public {
        age++;  // 2 gas 
        age = age +  getAgeWithPure(10); //2 gas
    }

    function getAgeWithView() public view returns (uint256) {
        //age ++ ;
        return age;
    }

    function getAgeWithPure(uint256 _age) public pure returns (uint256) {
        _age++; // 2 gas 
        return _age; 
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

}

