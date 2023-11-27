
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

contract EnumExample {

    //有些常量，它们具有共同属性，比如订单状态status(open,pending,process,finished)，通常我们用枚举来表示

    enum Status {
        OPEN,      // 0
        PENDING,   // 1
        PROCESS,  // 2
        FINISHED   // 3
    }

    //默认值
    Status public status = Status.PENDING;

    //修改status状态一
    function setStatus(Status _status) public {
        status = _status;
    }

    //修改status状态二
    function setStatus2(uint8 _status) public {
        status = Status(_status);
    }

    //获取状态一
    function getStatus() public view returns (Status) {
        return status;
    }

    //获取状态二
    function getStatus2() public view returns (uint8) {
        return uint8(status);
    }

    //删除后的状态是0
    function reset() public {
        delete status;
    }

    //根据value获取Text文本
    function getTextByValue(Status _status) public pure returns (string memory) {
        if (_status == Status.OPEN) {
            return "OPEN";
        }else if(_status == Status.PENDING) {
            return "PENDING";
        }else if(_status == Status.PROCESS) {
            return "PROCESS";
        }else if(_status == Status.FINISHED) {
            return "FINISHED";
        }else{
          revert();
        }
    }

    //根据Text文本获取value
    function getValueByText(string calldata _text) public pure returns (Status) {
        bytes32 bytesText = keccak256(bytes(_text));
        if (bytesText == keccak256(bytes("OPEN"))) {
            return Status.OPEN;
        }else if(bytesText == keccak256(bytes("PENDING"))) {
            return Status.PENDING;
        }else if(bytesText == keccak256(bytes("PROCESS"))) {
            return Status.PROCESS;
        }else if(bytesText == keccak256(bytes("FINISHED"))){
            return Status.FINISHED;
        }else {
            revert();
        }
    }
}


