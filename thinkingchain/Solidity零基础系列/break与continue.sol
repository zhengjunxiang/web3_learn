
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

// break 根据条件跳出循环体
// continue 根据条件跳过循环中的一个迭代。

contract BreakContinueExample {
    function forBreak(uint256 _amount) public view returns (uint256) {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amount; i++) {
            //if(i == 5) break;
            totalAmount = totalAmount + i;
            console.log("i ->", i, "totalAmount ->", totalAmount);
            if(i == 5) break;
        }
        return totalAmount;
    }

    function forContinue(uint256 _amount) public view returns (uint256) {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amount; i++) {
            if (i == 5) continue;
            totalAmount = totalAmount + i;
            console.log("i ->", i, "totalAmount ->", totalAmount);
            //if (i == 5) continue;
        }
        return totalAmount;
    }

}
