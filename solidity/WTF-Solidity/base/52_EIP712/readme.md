### 示例链接

EIP712Mail: https://mirror.xyz/xyyme.eth/cJX3zqiiUg2dxB1nmbXbDcQ1DSdajHP5iNgBc6wEZz4


### 相关教程：https://zhuanlan.zhihu.com/p/573131849

### 签名解析

1. EIP712的签名包括 domain、funcHash、message三个部分
2. domain主要和合约相关，主要包括EIP712Domain签名、名称、版本号、链ID、合约地址五个部分，可以根据实际需求添加其他参数，但是添加的数据需要和EIP712Domain一一对应。

```solidity
DOMAIN_SEPARATOR = keccak256(
    abi.encode(
        keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
        keccak256(bytes(name())),
        keccak256(bytes("1")),
        chainId,
        address(this)
    )
);
```

### funcHash

```js
bytes32 internal constant TYPE_HASH = keccak256(
        "Mail(address from,address to,string contents)"
    );
```

### message和校验签名

```solidity
// 计算待签名的结构体的哈希
function hashStruct(Mail memory mail) public pure returns (bytes32) {
    return keccak256(
        abi.encode(
                TYPE_HASH,
                mail.from,
                mail.to,
                keccak256(bytes(mail.contents))
            )
        );
    }

bytes32 digest = keccak256(abi.encodePacked(
   "\x19\x01",
    DOMAIN_SEPARATOR,
    hashStruct(mail)
));
  
        return ecrecover(digest, v, r, s) == signer;
```
