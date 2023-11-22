// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;
import "./IERC20.sol";

interface IERC20V2 is IERC20{

    function v2() external view returns (string memory);

}
