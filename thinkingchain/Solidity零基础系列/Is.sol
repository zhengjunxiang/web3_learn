// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// 1、is 有俩个用途：1、is 可以用来实现接口；2、is 可以用来继承合约、抽象合约或接口。
// 2、为什么要有继续？
// 3、通用继承
// 3.1、virtual，如果确认某个方法必定被子类继承，就应该使用 virtual 修饰该方法,它是修饰父类的方法
// 3.2、override，必须用override修饰的子类方法，它才能重写父类的virtual方法,它是修饰子类的方法
// 3.3、override，必须有一致的方法名和参数.
// 4、多重继承，有多个父类

contract A {
    function getName() public pure virtual returns (string memory) {
        return "A";
    }
}

contract B is A {
    function getAName() public pure returns (string memory) {
        return super.getName();
    }

    function getName() public pure virtual override returns (string memory) {
        return "B";
    }
}

contract C is A {
    function getName() public pure virtual override returns (string memory) {
        return "C";
    }
}

contract BC is B, C {
    function getName() public pure override(B, C) returns (string memory) {
        //return B.getName();
        return C.getName();
    }
}
