
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;
import "./IERC20.sol";
import "hardhat/console.sol";

//什么是抽象智能合约?
//抽象的反义词是具体、详细、明确。我们需要把不明确的功能抽出来，让继承我们的合约去实现
//使用抽象合约的场景？
//一、强制用户必须执行某个业务逻辑方法
//二、用户可选择执行某个业务逻辑方法


abstract contract ERC20Base is IERC20 {

    string private _name = "ThinkingChain";
    string internal _symbol = "TKCN";
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    function name() external override view returns (string memory){
        return _name;
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20:zero address");
        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

    }
    //抽象业务逻辑方法
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual {
        console.log(from,to,amount);
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

}

