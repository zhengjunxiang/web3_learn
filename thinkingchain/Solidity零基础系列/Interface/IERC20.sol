// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

//为什么使用接口?
//接口是一种编程规范，在面向对编程中起到非常大的作用
//接口只能定义函数/方法，不能有方法体
//不能包含状态变量
//不能包含构造函数
//所有方法都必须是external,需要暴露给外部调用
//接口是可以继承的
//实现(is)接口的合约必须实现接口里定义的所有方法

interface IERC20 {

    //string public constant override name = "ThinkingChain";

    //constructor() {
    //}
   
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);

}

