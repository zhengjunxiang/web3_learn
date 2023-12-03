// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

//approve(address to, uint256 tokenId) 授权自己某个NFT(NFT的Id)给代理人、交易所或Dapp合约
//getApproved(uint256 tokenId) 根据NFT的Id获取已经授权的代理人、交易所或Dapp合约的地址
//setApprovalForAll(address operator, bool approved) 授权或取消授权自己所有的NFTs给代理人、交易所或Dapp合约
//isApprovedForAll(address owner, address operator) 根据NFT的所有者和被授权者的地址，获取是否已经授权(true or false)

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
}

contract ERC721 is IERC721 {
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public ownerOf;

    mapping(uint256 => address) public tokenApprovals;
    mapping(address => mapping(address => bool)) private operatorApprovals;

    function approve(address to, uint256 tokenId) public payable {
        address owner = ownerOf[tokenId];
        require(
            msg.sender == owner,
            "ERC721: approve caller is not token owner"
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
}
