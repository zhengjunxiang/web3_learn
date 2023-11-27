
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;

interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function balanceOf(address account) external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

