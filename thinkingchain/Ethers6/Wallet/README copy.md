
* provider | Signer 对象属性，用于广播数据到链上
* connect | 连接/切换到新的 Provider。将放到"钱包章节"去讲
* getAddress | 获取 Singer 对象的账号地址
* getNonce | 获取 Singer 对象的账号地址的 Nonce 值
* populateCall | 填充交易参数，它在 Call 方法里被内部调用
* populateTransaction | 填充交易参数，它在 sendTransaction 方法里被内部调用
* estimateGas | 评估Gas使用量，将放到"合约章节"去讲
* call | 调用合约只读方法，将放到"合约章节"去讲
* resolveName | 解析 ENS 域名
* signTransaction | 转账签名，MetaMask 不支持，将放到"钱包章节"去讲
* sendTransaction | 转账
* signMessage | 消息签名
* signTypedData | 链下签名 [参见](http://localhost:3000/articles/vip/zep-05-permit-eip-712)
