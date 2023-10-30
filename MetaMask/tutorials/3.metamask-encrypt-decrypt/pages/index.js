
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { decrypt, encrypt, getEncryptionPublicKey } from '@metamask/eth-sig-util';

function Home() {

    //合约地址
    const PAYMENT_ADDRESS = '0x8e56C8ffcF38a2f71a3307e3C86259F856838305';

    const encryptVersion = "x25519-xsalsa20-poly1305";

    //abi
    const paymentContractAbi = [
        "function setPayment(address owner, string payment)",
        "function getPayment(address owner) view returns (string)",
    ];

    //状态
    const [provider, setProvider] = useState();
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const [balance, setBalance] = useState();
    const [encryptPayment, setEncryptPayment] = useState();

    const [bankName, setBankName] = useState();
    const [bankAccount, setBankAccount] = useState();
    const [userName, setUserName] = useState();

    //状态变更
    const handleChangeBankName = event => {
        setBankName(event.target.value);
    };
    const handleChangeBankAccount = event => {
        setBankAccount(event.target.value);
    };
    const handleChangeUserName = event => {
        setUserName(event.target.value);
    };

    //点击按钮的时候登录
    const connectOnclick = async () => {
        if (!window.ethereum) {
            return;
        }
        //这里使用的是ethers Web3Provider
        const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(providerWeb3);
        const currenAccount = await providerWeb3.send("eth_requestAccounts", []);
        setAccount(currenAccount[0]);
        setSigner(providerWeb3.getSigner(currenAccount[0]));
        //切换账号
        ethereum.on("accountsChanged", function (accountsChange) {
            setAccount(accountsChange[0]);
            setSigner(providerWeb3.getSigner(currenAccount[0]));
        })
    }

    //切换账号(账号改变)的时候获取余额
    useEffect(() => {
        if (!window.ethereum || !provider || !account) {
            return
        }
        provider.getBalance(account).then((result) => {
            setBalance(ethers.utils.formatEther(result))
        })
    }, [account]);

    //加密encrypt
    const encryptAction = async () => {

        if (!window.ethereum || !provider || !account) {
            alert("please connect wallet")
            return;
        }

        //加密密信息
        let paymentObject = { bankName: bankName, bankAccount: bankAccount, userName: userName };
        let paymentString = JSON.stringify(paymentObject);

        //创建合约
        const paymentContract = new ethers.Contract(PAYMENT_ADDRESS, paymentContractAbi, signer);

        //获取当前用户的公钥
        //该方法已经弃用，当官方还没有给出代替方案
        let encryptionPublicKey = await window.ethereum.request({ "method": "eth_getEncryptionPublicKey","params": [account]});

        //加密
        const encryptsResultObjectIn = encrypt({ publicKey: encryptionPublicKey, data: paymentString, version: encryptVersion });
        const encryptsResultStringIn = JSON.stringify(encryptsResultObjectIn);

        let tx  = await paymentContract.setPayment(account, encryptsResultStringIn);
    }

    //签名和提交
    const decryptAction = async () => {

        if (!window.ethereum || !provider || !account) {
            alert("please connect wallet")
            return;
        }
        const paymentContract = new ethers.Contract(PAYMENT_ADDRESS, paymentContractAbi, signer);
        let encryptsResultStringOut  = await paymentContract.getPayment(account);
        setEncryptPayment(encryptsResultStringOut);

        //解密
        //该方法已经弃用，当前官方还没有给出代替方案
        const decryptsResultStringOut = await ethereum.request({method: 'eth_decrypt', params: [encryptsResultStringOut, account]});
        const decryptsResultObjectOut = JSON.parse(decryptsResultStringOut);

        setBankName(decryptsResultObjectOut.bankName);
        setBankAccount(decryptsResultObjectOut.bankAccount);
        setUserName(decryptsResultObjectOut.userName);
    }

    return (
        <>
            <div className="topnav">
                <a href="#">Home</a>
                <a href="#">Article</a>
                <a href="#">Tag</a>
                <a href="#">About</a>
                {account ?
                    <a href="#" style={{ float: 'right' }} >Connected</a>
                    :
                    <a href="#" style={{ float: 'right' }} onClick={connectOnclick} >Connect Wallet</a>
                }
            </div>
            <div className="container">
                <div className="row">

                    <h3>https://thinkingChain.app</h3>

                    <div>
                        <h5>钱包账号:{account}</h5>
                        <h5>钱包余额:{balance}</h5>

                    </div>
                    <div >
                        银行名称:<input type="text" onChange={handleChangeBankName} value ={bankName} />
                        银行账号:<input type="text" onChange={handleChangeBankAccount} value ={bankAccount} />
                        银行户名:<input type="text" onChange={handleChangeUserName} value ={userName} />
                    </div>

                    <button className="button" onClick={encryptAction}>加密</button>
                    <button className="button" onClick={decryptAction}>解密</button>

                    <textarea  rows="4" className="fakeimg" value={encryptPayment}> </textarea>
                    <p></p>

                </div>
            </div>

            <div className="footer">
                <h3>Footer</h3>
            </div>

            <style jsx>
                {`
            * {
            box-sizing: border-box;
            }

            body {
                font-family: Arial;
                padding: 10px;
                background: #f1f1f1;
            }
            .header {
                padding: 30px;
                text-align: center;
                background: white;
            }
            .header h1 {
                font-size: 50px;
            }
            .topnav {
                overflow: hidden;
                background-color: #333;
            }
            .topnav a {
                float: left;
                display: block;
                color: #f2f2f2;
                text-align: center;
                padding: 14px 16px;
                text-decoration: none;
            }
            .topnav a:hover {
                background-color: #ddd;
                color: black;
            }
            .fakeimg {
                background-color: #aaa;
                width: 100%;
                padding: 20px;
                height:100px;

            }
            .card {
                background-color: white;
                padding: 20px;
                margin-top: 5px;
            }
            .row:after {
                content: "";
                display: table;
                clear: both;
            }
            .footer {
                padding: 5px;
                text-align: center;
                background: #ddd;
                margin-top: 0px;
            }
            .button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 10px 15px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
            input[type=text] {
                width: 20%;
                padding: 12px 20px;
                margin: 8px 0;
                box-sizing: border-box;
            }
            `}
            </style>

        </>
    )
}

export default Home;

