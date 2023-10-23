// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/*
    solidity中允许函数进行重载（overloading），即名字相同但输入参数类型不同的函数可以同时存在，他们被视为不同的函数。注意，solidity不允许修饰器（modifier）重载。
 */

contract Overloading {
    function SaySomething() public pure returns (string memory) {
        return("Nothing");
    }

    function SaySomething(string memory someting) public pure returns(string memory) {
        return(someting);
    }

    function f(uint8 _in) public pure returns (uint8 out) {
        out = _in;
    }

    function f(uint256 _in) public pure returns (uint256 out) {
        out = _in;
    }
}
