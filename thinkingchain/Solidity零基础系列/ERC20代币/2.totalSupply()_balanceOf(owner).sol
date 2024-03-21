// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//totalSupply 代币发行总供应量，它即可以固定不变，又可以根据业务需求而改变
//totalSupply 代币发行总供应量是否可变，取决于合约是否存在mint或burn函数/方法
//balanceOf(owner) 获取某个账户的余额，所有账户余额的总和必须等于totalSupply

// V1
interface IERC20V1 {
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint);
}

contract ERC20V1 is IERC20V1 {
    string public constant name = "ThinkingChain";
    string public constant symbol = "TKC";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    address public owner;
    
    /*
    constructor() {
        owner = msg.sender;
    }
    */

    constructor(uint256 _initTotalSupply) {
        owner = msg.sender;
        mint(msg.sender,_initTotalSupply);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /*
    uint256 private _totalSupply;
    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    }
    */

    function mint(address to, uint256 amount) public onlyOwner{
        totalSupply = totalSupply += amount;
        balanceOf[to] = balanceOf[to] += amount;
    }

    function burn(uint256 amount) public {
        address from = msg.sender;
        balanceOf[from] = balanceOf[from] -= amount;
        totalSupply = totalSupply -= amount;
    }

}

