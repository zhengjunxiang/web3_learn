// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//revert 抛出异常，使程序直接回滚到最初的状态
//error 是自定义错误信息，通常与Revert配合使用

contract RevertErrorExample {
    address payable owner;

    error Unauthorized(string error, address owner);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function withraw() public {
        if (msg.sender != owner)
            revert Unauthorized({error: "Not owner", owner: msg.sender});
        //revert Unauthorized("Not owner",msg.sender);
        //revert("Not owner");
        //revert();
        owner.transfer(address(this).balance);
    }
}
