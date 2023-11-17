// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ArrayExample {
    uint[] iArray;
    uint[] iArray2 = [1, 2, 3];
    uint[3] iArray3;

    //删除重复数组
    uint[] iArrayDuplicated = [0, 1, 0, 2, 3, 0];
    mapping(uint => bool) unique;
    uint[] public iArrayUnique;

    function getArray() public view returns (uint[] memory) {
        return iArray2;
    }

    function getArrayByIndex(uint _i) public view returns (uint) {
        return iArray2[_i];
    }

    function getLength() public view returns (uint) {
        return iArray3.length;
    }

    function push(uint _i) public {
        iArray2.push(_i);
    }

    function pop() public {
        iArray2.pop();
    }

    function deleteByIndex(uint _index) public {
        delete iArray2[_index];
    }

    //内存数组
    function memoryArray() public pure returns (uint[] memory) {
        uint[] memory mArray = new uint[](5);
        //不能这样定义内存数组
        //uint[] memory mArray = [1,2,3];
        for (uint i = 0; i < 5; i++) {
            mArray[i] = i + 1;
        }
        //内存数组不能使用push
        //mArray.push(1);
        return mArray;
    }

    //删除重复数组元素
    function loopsAndRemoveDuplicatedThenSum() public returns (uint) {
        uint sum = 0;
        for (uint i = 0; i < iArrayDuplicated.length; i++) {
            uint iValue = iArrayDuplicated[i];
            bool isExist = unique[iValue];
            if (!isExist) {
                unique[iValue] = true;
                sum += iValue;
                iArrayUnique.push(iValue);
            }
        }
        return sum;
    }

    function getiArrayUnique() public view returns (uint[] memory) {
        return iArrayUnique;
    }
}
