// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

// Assert VS Require
// Assert 主要适用于单元测试或内部测试，它会抛出致命异常Panic(uint256)，开发人员不能定义错误信息
// Require 主要适用于校验输入值是否满足业务需求，它抛出的错误信息是由开发人员定义
// Assert 在任何地方都可能抛出异常，例如计算过程中出现溢出的情况，它是一个的明确Bug存在。 
// Require 用于在执行业务代码之前，对输入参数进行校验，它不是一个Bug。
// Assert 抛出异常信息供内部(开发人员)参考 ，不需要用户了解。
// Require 错误信息供外部用户参考，让用户了解是什么原因导致没能成功调用方法。

// Panic(uint256) 错误信息查看 https://docs.soliditylang.org/en/v0.8.9/control-structures.html#error-handling-assert-require-revert-and-exceptions
contract AssertExample {
    uint8 public age;

    function forRequire(uint8 _age) public {
        require(_age > 0 && _age <=120 , "Age must be greater than 0");
        age = _age;
    }

    function forAssert() public view {
        assert(age <= 120);
        //以下执行相应的业务逻辑
        //...
        console.log("age -> ",age);
    }

}
