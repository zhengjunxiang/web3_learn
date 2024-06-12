### 示例链接

EIP712Mail: https://mirror.xyz/xyyme.eth/cJX3zqiiUg2dxB1nmbXbDcQ1DSdajHP5iNgBc6wEZz4

### 相关教程：

https://zhuanlan.zhihu.com/p/573131849

https://zhuanlan.zhihu.com/p/526786861

以太坊钱包如[MetaMask](https://link.zhihu.com/?target=https%3A//metamask.io/)都支持[EIP712](https://link.zhihu.com/?target=https%3A//github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) —— [类型结构化消息签名](https://link.zhihu.com/?target=https%3A//learnblockchain.cn/2019/04/24/token-EIP712)标准，让钱包可以结构化和可读的格式在签名提示中显示数据。EIP712 在安全性和可用性方面向前迈进了一大步，因为用户不再需要对难以理解的十六进制字符串签名（这是一种令人困惑、不安全的做法）

### 设计域分隔符

这个强制字段有助于防止一个 DApp 的签名被用在另一个 DApp 中。如 EIP712 的[说明](https://link.zhihu.com/?target=https%3A//github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md%23rationale):

> 两个 DApp 可能会出现相同的结构，如 `Transfer(address from,address to,uint256 amount)`，这应该是不兼容的。通过引入域分隔符，DApp 开发人员可以保证不会出现签名冲突。

域分隔符需要在体系结构和实现级别上进行仔细的思考和努力。开发人员和设计人员必须根据对他们的用例有意义的内容来决定要包含或排除哪个字段。

 **name** : DApp 或协议的名称,如“CryptoKitties”

 **version** : “签名域”的当前版本。可以是你的 DApp 或平台的版本号。它阻止一个 DApp 版本的签名与其他 DApp 版本的签名一起工作。

 **chainId** : [EIP-155](https://link.zhihu.com/?target=https%3A//eips.ethereum.org/EIPS/eip-155)链 id。防止一个网络(如测试网)的签名在另一个网络(如主网)上工作。

 **verifyingContract** : 将要验证签名的合约的以太坊地址。Solidity 中的 `this`关键字返回合约自己的地址，可以在验证签名时使用。

 **salt** : 在合约和 DApp 中都硬编码的惟一的 32 字节值，这是将 DApp 与其他应用区分开来的最后手段。

## 合约

### 签名解析

1. EIP712的签名包括 domain、funcHash、message三个部分
2. domain主要和合约相关，主要包括EIP712 Domain 签名、名称、版本号、链ID、合约地址五个部分，可以根据实际需求添加其他参数，但是添加的数据需要和EIP712Domain一一对应。

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
