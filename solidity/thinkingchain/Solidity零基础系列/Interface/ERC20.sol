// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;
import "./IERC20V2.sol";

contract ERC20 is IERC20V2 {

    /*
    //必须是public修饰状态变量
    //必须是override修改状态变量
    string public constant override name = "ThinkingChain";
    string public constant override symbol ="TKCN";
    */

    string private _name = "ThinkingChain";
    string private _symbol = "TKCN";

    constructor() {}

    function name() external override view returns (string memory){
        return _name;
    }

    function symbol() external override view returns (string memory){
        return _symbol;
    }

    function v2() external override pure returns (string memory){
        return "V2";
    }

}

