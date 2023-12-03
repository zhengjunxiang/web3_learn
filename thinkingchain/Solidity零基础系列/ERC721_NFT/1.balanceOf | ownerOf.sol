// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

//balanceOf(address _owner) 获取账户地址拥有多少个NFTs
//ownerOf(uint256 _tokenId) 根据NFT的Id获取账号地址
//mint(address to, uint256 tokenId) 铸造新的NFT
//burn(uint256 tokenId) 根据NFT的Id 销毁

interface IERC721 {
    function balanceOf(address _owner) external view returns (uint256);

    function ownerOf(uint256 _tokenId) external view returns (address);
}

contract ERC721 is IERC721 {
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public ownerOf;

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
