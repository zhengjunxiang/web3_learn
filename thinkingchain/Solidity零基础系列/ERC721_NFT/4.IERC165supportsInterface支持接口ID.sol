// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

// IERC165 接口只有一个方法supportsInterface，该方法用来识别一个合约的类型，比如ERC721、ERC1155等...
// supportsInterface，合约必须实现与Overwrite该方法，才能识别出合约的类型

interface IERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

contract ERC165 is IERC165 {
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

interface IERC721 {
    function balanceOf(address owner) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function approve(address to, uint256 tokenId) external payable;

    function getApproved(uint256 tokenId) external view returns (address);

    function setApprovalForAll(address operator, bool approved) external;

    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external payable;
}

contract ERC721 is ERC165, IERC721 {
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) public tokenApprovals;
    mapping(address => mapping(address => bool)) public operatorApprovals;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable {
        //获取NFT的owner
        address owner = ownerOf[tokenId];
        //唯有Owner 或代理人可以操作该方法
        require(
            msg.sender == owner ||
                isApprovedForAll(owner, msg.sender) ||
                getApproved(tokenId) == msg.sender,
            "ERC721: caller is not token owner nor approved"
        );
        //参数 from 必须等于 owner
        require(owner == from, "ERC721: transfer from incorrect owner");
        //接收地址不能为空
        require(to != address(0), "ERC721: transfer to the zero address");
        //取消授权该NFT

        //approve(address(0), tokenId);
        delete tokenApprovals[tokenId];

        //from NFTs数量 -1
        balanceOf[from] -= 1;
        //to 的NFTs数量 +1
        balanceOf[to] += 1;
        //NFT 转让所有权到 to
        ownerOf[tokenId] = to;
    }

    function approve(address to, uint256 tokenId) public payable {
        address owner = ownerOf[tokenId];
        require(
            msg.sender == owner ||
                isApprovedForAll(owner, msg.sender) ||
                getApproved(tokenId) == msg.sender,
            "ERC721: caller is not token owner nor approved"
        );
        tokenApprovals[tokenId] = to;
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        require(ownerOf[tokenId] != address(0), "ERC721: invalid token ID");
        return tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public {
        require(msg.sender != operator, "ERC721: approve to caller");
        operatorApprovals[msg.sender][operator] = approved;
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view returns (bool) {
        return operatorApprovals[owner][operator];
    }

    function mint(address to, uint256 tokenId) public {
        require(to != address(0), "ERC721: mint to the zero address");
        require(ownerOf[tokenId] == address(0), "ERC721: token already minted");
        balanceOf[to] += 1;
        ownerOf[tokenId] = to;
    }

    function burn(uint256 tokenId) public {
        address owner = ownerOf[tokenId];
        balanceOf[owner] -= 1;
        delete ownerOf[tokenId];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function getIERC721InterfaceId() public pure returns (bytes4) {
        return type(IERC721).interfaceId;
    }

    function getIERC165InterfaceId() public pure returns (bytes4) {
        return type(IERC165).interfaceId;
    }
}

contract DexNFTs {
    address public erc721;

    constructor(address _erc721) {
        erc721 = _erc721;
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        IERC721(erc721).transferFrom(from, to, tokenId);
    }
}
