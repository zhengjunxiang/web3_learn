// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//transfer 转账，接收2个参数，from:msg.sender; to:转入; amount:金额
//transferFrom 转账，接收3个参数，from:转出; to:转入; amount:金额
//transfer与transferFrom使用场景不一样，transfer用在本合约转账，transferFrom用在第三方/去中心交易所/代理人

// V1
interface IERC20V1 {
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function approve(address spender, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address to, uint amount) external returns (bool);
    function transferFrom(address from, address to, uint amount) external returns (bool);
}

contract ERC20V1 is IERC20V1 {
    string public constant name = "ThinkingChain";
    string public constant symbol = "TKC";
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    address public _owner;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initTotalSupply) {
        _owner = msg.sender;
        mint(msg.sender,_initTotalSupply);
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        totalSupply = totalSupply += amount;
        balanceOf[to] = balanceOf[to] +=amount;
    }

    function burn(uint256 amount) public {
        address from = msg.sender;
        balanceOf[from] = balanceOf[from] -= amount;
        totalSupply = totalSupply -= amount;
    }

    function _approve(address owner, address spender, uint amount) private {
        allowance[owner][spender] = amount;
    }

    function approve(address spender, uint amount) external returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function _transfer(address from, address to, uint amount) private {
        balanceOf[from] = balanceOf[from] -= amount;
        balanceOf[to] = balanceOf[to] += amount;
    }

    function transfer(address to, uint amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint amount) external returns (bool) {
        uint256 currentAllowance = allowance[from][msg.sender];
        require(currentAllowance >= amount, "ERC20: insufficient allowance");
        allowance[from][msg.sender] = currentAllowance -= amount;
        _transfer(from, to, amount);
        return true;
    }

}


contract Dex {
   
    address public erc20V1;

    constructor(address _erc20V1) {
        erc20V1 = _erc20V1;
    }

    function transferFromTo(address to,uint amount) external{
        IERC20V1(erc20V1).transferFrom(msg.sender,to, amount);
    }
    
    function transferTo(address to,uint amount) external{
        IERC20V1(erc20V1).transfer(to, amount);
    }

}

