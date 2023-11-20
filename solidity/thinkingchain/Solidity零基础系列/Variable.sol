
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//全局变量Global, Solidity内部固有的变量,比如msg.sender、block.number、tx.origin,它在合约里任何地方都可以使用
//状态变量State, 它是储存在链上的数据变量，永久存在。
//局部变量Local, 它是方法低里临时定义的变量或是方法参数或是方法返回值，方法执行完就被删除释放内存

contract Variable {
  string public name = "Hello";
  uint256 public amount;
  // 不存储在链上，存储在字节码里
  uint256 public constant NUM = 10;

  function updateStateName(string calldata _name) public {
      name = _name;
  }

  function getGlobalWithSender() public view returns (address) {
      return msg.sender;
  }

  function getGlobalWithBlockNumber() public view returns (uint256) {
      return block.number;
  }

  function getGlobalWithTxOrigin() public view returns (address) {
      return tx.origin;
  }

  function localVariable(uint256 _num2) public pure returns (uint256) {
      uint256 _num1 = NUM;
      uint256 _num12 = _num1 + _num2;
      return _num12;
  }
}

