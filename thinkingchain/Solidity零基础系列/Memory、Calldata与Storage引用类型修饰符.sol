// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// memory、calldata与storage,它们只能修饰引用数据类型变量，比如字符串、数组、字节等...
// memory 适用于方法传参、返参或在方法体内使用，使用完就会清除掉，释放内存
// calldata 仅适用于方法传参,而且该变量的值不能修改
// storage 仅适用于方法体内，而且它的指针必须指向链上数据。使用完，链上数据将保存最新状态

contract StorageCalldataMemory {
    string public name;
    string public name2;
    uint8 public age;

    struct Employee {
        string name;
        uint8 age;
    }

    Employee[] public employees;
    mapping(address => Employee) public employeeMapping;

    function setAge(uint8 _age) public {
        age = _age;
    }

    //引用类型传参时，如果memory作为该参数的修饰符，是可以修改该变量的值
    function setNameWithMemory(string memory _name) public {
        _name = "World";
        name = _name;
    }

    //引用类型传参时，如果calldata作为该参数的修饰符，不可以修改该变量的值
    function setNameWithCalldata(string calldata _name) public {
        // _name = "World";
        name = _name;
    }

    //方法返回类型是引用类型，只能用memory修饰
    function getName() public view returns (string memory) {
        return name;
    }

    //使用方法不正确
    function setNameWithStorage() public {
        string storage name3 = name;
        name2 = name3;
    }

    function setEmployee(Employee calldata _employee) public {
        employees.push(_employee);
    }

    //正解的使用方法
    function updateEmployeeName(string calldata _name, uint256 _index) public {
        //memory 将不修改链上数据
        Employee storage updateEmployee = employees[_index];
        updateEmployee.name = _name;
    }

    function setEmployeeMapping(address _address,  Employee calldata _employee) public {
        employeeMapping[_address] = _employee;
    }

    function updateEmployeeMappingName(address _address, string calldata _name) public {
        Employee storage updateEmployee= employeeMapping[_address];
        updateEmployee.name = _name;

    }
}

