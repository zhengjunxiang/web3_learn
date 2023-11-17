// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract StructExample {
    struct User {
        string name;
        uint8 age;
        bytes data;
        bool isDeleted;
    }

    User[] public users;

    //新增,使用struct传参，struct对象里每个属性都不能为空
    function addUser(User calldata _user) public {
        users.push(_user);
    }

    //新增2
    function addUserWithParameters(
        string calldata _name,
        uint8 _age,
        bytes calldata _data
    ) public {
        users.push(
            User({name: _name, age: _age, data: _data, isDeleted: false})
        );
    }

    //获取一个用户
    function getUserByIndex(uint256 _index) public view returns (User memory) {
        return users[_index];
    }

    //更新
    function updateUser(uint256 _index, User calldata _updateUser) public {
        User storage user = users[_index];
        require(!user.isDeleted, "Not Exist");
        user.name = _updateUser.name;
        user.age = _updateUser.age;
        user.data = _updateUser.data;
        user.isDeleted = false;
    }

    //删除
    function deleteUser(uint256 _index) public {
        User storage user = users[_index];
        require(!user.isDeleted, "Not Exist");
        user.isDeleted = true;
    }

    //获取所有
    function getUsers() public view returns (User[] memory) {
        return users;
    }
}
