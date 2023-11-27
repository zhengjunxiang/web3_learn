// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9;
import "./ERC20Base.sol";

contract ERC20 is ERC20Base {

    //强制执行该方法
    function symbol() external override view returns (string memory){
        return _symbol;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override  {
        require(amount >= 1000, "ERC20: less 1000 wei");
        //如果基类里方法_beforeTokenTransfer没有方法体,可以不调用super
        super._beforeTokenTransfer(from, to, amount);
    }

}
