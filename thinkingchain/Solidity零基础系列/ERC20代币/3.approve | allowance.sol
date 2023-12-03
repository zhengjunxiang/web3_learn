// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

//approve 授权一定数量的代币给第三方/交易所/代理人。注意，是授权而不是发送代币给第三方
//approve 必须包含3个参数，Owner:谁授权代币给第三方，Spender:第三方/交易所/代理人,Amount:授权数额
//allowance 保存approve方法的3项数据

// V1
interface IERC20V1 {
    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address owner) external view returns (uint256);
    function approve(address spender, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
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
 
}

