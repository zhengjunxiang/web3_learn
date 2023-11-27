// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PublicPrivateInternalExternalExample{

    uint private age = 10;

    //任何地方都可以调用该方法
    function getAgeWithPublic() public view returns(uint){
        return age;
    }
    //只能在该合约类里调用该方法
    function getAgeWithPrivate() private view returns(uint){
        return age;
    }
    //只能在该合约类里或继承该类的子类能调用该方法
    function getAgeWithInternal() internal view returns(uint){
        return age;
    }
    //只能外部调用该方法，通常是以接口的形式供外部调用
    function getAgeWithExternal() external view returns(uint){
        return age;
    }

    function callFunction() public view returns(uint){
        return getAgeWithPrivate();
    }
}

