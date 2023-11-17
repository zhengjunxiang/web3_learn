
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

contract MappingExample {

    //Mapping 没有其他语言功能那么强大

    //Mapping 不能遍历里面的Key，也就是不知道Mapping有多少个key

    //Mapping 是以Key -> Value 的形式储存

    //Mapping 的Key是根据hash (Key + slot) 进行hash产生的bytes32,所以Key是不会重复

    mapping(address => uint256) public balance;
    mapping(string => string) public balance2;
    mapping(uint256 => uint256) public balance3;
    mapping(bytes => uint256) public balance4;

    struct Student {
        string name;
        uint8 age;
    }

    //嵌套mapping,可以把它们Key看作是一个联合主键
    mapping(uint256 => mapping(string => Student)) public studentInfo;

    function setBalance(address _address,  uint256 _balance) public {
        balance[_address] = _balance;
    }

    function getBalance(address _address) public view returns (uint256) {
        return balance[_address];
    }

    function removeBalance(address _address) public {
        delete balance[_address];
    }

    function setStudentInfo (uint256 _classId, string calldata _name, Student calldata _student) public {
        studentInfo[_classId][_name] = _student;

    }

    function getStudentInfo (uint256 _classId, string calldata _name) public view returns(Student memory){
        return studentInfo[_classId][_name];
    }

    function removeStudentInfo (uint256 _classId, string calldata _name) public {
        delete studentInfo[_classId][_name];
    }

}

