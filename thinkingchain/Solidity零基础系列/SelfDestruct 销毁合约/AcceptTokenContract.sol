// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AcceptTokenContract {
    IERC20 myToken;
    address public owner;

    constructor(address _tokenAddress) {
        myToken = IERC20(_tokenAddress);
        owner = msg.sender;
    }

    function transferFrom(uint _amount, address _to) public {
        //将token转个智能合约地址，必须使用transferFrom.否则经过 MyToken转到该合约地址
        myToken.transferFrom(msg.sender, _to, _amount);
    }

    function getMyTokenBalance(address _address) public view returns (uint) {
        return myToken.balanceOf(_address);
    }

    function kill() public {
        //摧毁合约之前，把合约上的币转移
        myToken.transfer(owner, myToken.balanceOf(address(this)));
        selfdestruct(payable(owner));
    }
}
