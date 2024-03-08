// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

// safeTransferFrom 安全转让NFTs，确保发送方能发送，接收方能接收，并且能提现相应的NFTs
// 安全转让的实现机制：接收方实现ERC721TokenReceiver接口里的onERC721Received方法
// 发送方在发送的同时，先调用接收方的onERC721Received的方法，确认返回True，方能发送NFTs
// 如果接收方非合约地址，是不必要采用安全转让safeTransferFrom的

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

interface ERC721TokenReceiver {
    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes memory _data
    ) external returns (bytes4);
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

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external payable;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
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

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public payable {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
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

        require(
            _checkOnERC721Received(from, to, tokenId, data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        if (to.code.length > 0) {
            try
                ERC721TokenReceiver(to).onERC721Received(
                    msg.sender,
                    from,
                    tokenId,
                    data
                )
            returns (bytes4 retval) {
                return retval == ERC721TokenReceiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert(
                        "ERC721: transfer to non ERC721Receiver implementer"
                    );
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
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

contract DexNFTs is
    ERC721TokenReceiver //
{
    address public erc721;

    constructor(address _erc721) {
        erc721 = _erc721;
    }

    function transferFrom(address from, address to, uint256 tokenId) public {
        IERC721(erc721).transferFrom(from, to, tokenId);
    }

    function transfer(address to, uint256 tokenId, bytes memory data) public {
        IERC721(erc721).safeTransferFrom(address(this), to, tokenId, data);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
    ) external override returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
        //return ERC721TokenReceiver.onERC721Received.selector;
    }
}
