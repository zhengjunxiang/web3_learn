## 什么是扩展公钥

扩展公钥，或 xpub，是一种公钥，可以用来派生子公钥，作为层次确定性(HD)钱包的一部分。扩展公钥是 BIP 32建立的一种比特币标准，主要由一个钱包在幕后使用，以获得公钥。s

> https://river.com/learn/terms/x/xpub-extended-public-key/

## Hierarchical Deterministic (HD) Wallet

层次确定(HD)钱包是一个术语，用来描述钱包使用种子来获得公钥和私钥。高清钱包作为比特币标准实施 BIP 32。在此之前，大多数钱包都会在用户每次需要新地址时生成不相关的密钥。这种格式被称为“一串钥匙”(Just-a-Bunch-of-Keys，JBOK)钱包，需要钱包分别备份每个钥匙，这对钱包和用户来说都非常不方便。HD 钱包可以通过存储一个64字节的种子来备份

> https://river.com/learn/terms/h/hd-wallet/

## BIP 32 标准

描述了等级确定性钱包(或“高清钱包”) : 钱包可以部分或完全与不同的系统共享，每个都有或没有能力花硬币。

该规范旨在为可在不同客户机之间交换的确定性钱包设置一个标准。尽管这里描述的钱包具有许多特性，但并非所有特性都是支持客户端所需的。

规范由两部分组成。在第一部分中，提出了一个从单个种子导出键对树的系统。第二部分演示了如何在这样一个树的顶部构建钱包结构。

HD Wallet 根据 BIP 32 标准实现。

> https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki




# All you need to know about HD wallets, xpub, ypub and zpub

### 什么是 Xpub？

生成的每个子密钥对都可以定义一个 XPub (扩展公钥)。顾名思义，Xpub 不包含关于私钥的信息，而只包含公钥的信息。这意味着 Xpub 不会让您访问钱包中的资金，但是它可以用来查看儿童钱包的地址、交易和余额。你可以把它看作是钱包的只读视图。虽然 Xpub 不能让你消费，只能查看钱包的信息，但是与任何人分享密钥是非常危险的。

### Ypub 和 Zpub 是什么？

在 SegWit 被采用之后，BIP49标准被引入到 Ypub 中。Ypub 密钥与 Xpub 密钥相同，但它遵循新的标准，并且具有地址类型 P2SH-P2WPKH。Ypub 适用于向后兼容的 SegWit 钱包。

在 Xpub 和 Ypub 之后，最新的公共扩展密钥被称为 Zpub。正如其前身 Zpub 遵循 BIP49标准，但地址类型是 P2WPKH。Zpub 适用于本地兼容的 SegWit 钱包。

区分 Xpubs、 Ypubs 和 Zpub 的一个简单方法是，xpub 地址总是以“1”开头，Ypub 地址总是以“3”开头，而 Zpub 地址总是以“ bc1”开头。

> https://medium.com/cryptoapis/all-you-need-to-know-about-hd-wallets-xpub-ypub-and-zpub-f6601f1bce35
