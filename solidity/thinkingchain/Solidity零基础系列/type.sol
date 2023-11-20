// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

contract A {

}

interface IERCA165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    function abc() external;
}

contract TypeExample {

    //Type 不像是我们过去讲的Integer,String等数据类型,它更像是一个通用的工具方法
    //Type 目前仅支持Integer、Interface、Contract

    //接收整型
    uint256 public max = type(uint256).max;
    uint256 public max8 = type(uint8).max;
    uint256 public min = type(uint256).min;
    uint256 public min8 = type(uint8).min;

    //获取合约的名称
    string public name = type(A).name;
    //获取合约部署的bytecode
    //关于creationCode，参考https://www.thinkingchain.app/articles/vip/sol-41-create-create2
    bytes public code = type(A).creationCode;

    //获取合约运行时构造函数里面有内联汇编的bytecode
    bytes public rCode = type(A).runtimeCode;
    //获取接口的ID
    //关于interfaceId应用, 参考https://www.thinkingchain.app/articles/vip/sol-40-address-to-contracts 
    bytes4  public interfaceId = type(IERCA165).interfaceId;

}
