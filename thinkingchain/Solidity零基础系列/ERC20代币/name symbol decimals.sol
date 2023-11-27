// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//ERC20 同质化代币，每个代币的本质或性质都是相同
//ETH 是原生代币，它不是ERC20代币,它们两是不能协同工作。所以需要将ETH转换成WETH(ERC20)
//ERC20 必须实现相应的接口(规范),参见 https://eips.ethereum.org/EIPS/eip-20

// V1
interface IERC20V1 {

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);

}

contract ERC20V1 is IERC20V1 {

    string public constant name = "ThinkingChain";
    string public constant symbol = "TKC";
    uint8 public constant decimals = 18;

}

// V2 
interface IERC20V2 {

    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);

}

contract ERC20V2 is IERC20V2 {

    string private _name;
    string private _symbol;
    uint8  private _decimals;

    constructor(string memory name_, string memory symbol_, uint8 decimals_) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view  returns (string memory) {
        return _symbol;
    }

    function decimals() public view  returns (uint8 ) {
        return _decimals;
    }

}
