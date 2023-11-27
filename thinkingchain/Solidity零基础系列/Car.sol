// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

//把智能合约看作对象，一切皆为对象
//合约对象有属性、有动作行为,它们相互协同工作
//属性就是储存在区块链上合约对象的数据
contract Car {
  string public constant brand = "TOYOTA";
  string public color = "White";
  uint256 private price;
  //是否在行驶中
  bool public isMove = false;

  function getPrice() public view returns (uint256) {
    return price;
  }

  function setPrice(uint256 _price) public {
    price = _price;
  }

  //ABI

  //停止
  function stop() public {
    if (isMove) {
      isMove = false;
    }
  }

  //启动
  function start() public {
    if (!isMove) {
      isMove = true;
    }
  }

  //根据挡位获取速度
  function getSpeed(uint256 _position) public pure returns (uint256 speed) {
    //uint256 speed;
    if (_position == 1) {
      speed = 20;
    } else if (_position == 2) {
      speed = 30;
    } else if (_position == 3) {
      speed = 40;
    } else if (_position == 4) {
      speed = 60;
    } else if (_position == 5) {
      speed = 110;
    } else {
      speed = 0;
    }
    //return speed;
  }

  //左转
  function turnLeft() public {}

  //右转
  function turnRight() public {}
}
