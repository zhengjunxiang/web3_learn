// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "../flatten.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract verifySignature {
    address owner;
    using ECDSA for bytes32;

    constructor() {
        owner = msg.sender;
    }

    function isMessageValid(bytes memory _signature)
        public
        view
        returns (address, bool)
    {
        bytes32 messagehash = keccak256(
            abi.encodePacked(address(this), msg.sender)
        );

        bytes32 msgHash = MessageHashUtils.toEthSignedMessageHash(messagehash);
        address recoveredSigner = ECDSA.recover(msgHash, _signature);

        // address signer = messagehash.toEthSignedMessageHash().recover(
        //     _signature
        // );

        if (owner == recoveredSigner) {
            return (recoveredSigner, true);
        } else {
            return (recoveredSigner, false);
        }
    }
}
