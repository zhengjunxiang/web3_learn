import { useState, useEffect } from 'react'

function Home() {

    //该连接不是登录钱包后的连接，即便不登录钱包也连接到网络
    const [connected, setConnected] = useState();
    function connectedOnclick() {
        if (ethereum.isConnected()) {
            setConnected("true");
        } else {
            setConnected("false");
        }
    }

    //加载Home组件完,切换账号触发监听事件
    const [accountsChange, setAccountsChange] = useState();
    useEffect(() => {
        ethereum.on('accountsChanged', handleAccountsChanged);
    }, []);
    function handleAccountsChanged(accounts){
        setAccountsChange(accounts);
    }

    //切换网络，触发事件
    const [chainChanged, setChainChanged] = useState();
    useEffect(() => {
        ethereum.on('chainChanged', (chainId) => {
            setChainChanged(chainId);
        });
    })

    /**
     * 获取账号
     * eth_accounts 与 eth_requestAccounts的区别
     * eth_accounts和eth_requestAccounts的区别，它们都是获取账号
     * eth_accounts必须登录后才能获取
     * eth_requestAccounts如果没有登录，会弹出MetaMask登录,登录成功后再获取账号
     * eth_requestAccounts不是以太坊API规范，MetaMask自行封装。而eth_accounts是以太坊API规范
     */
    const [accounts, setAccountss] = useState();
    function accountsOnclick(){
        const getAccounts = async() =>{
            await ethereum.request({ method: 'eth_accounts' }).then((result) =>{setAccountss(result)});
        }
        getAccounts();
    }

    /**
     * 根据账号获取余额
     * 参见:https://eth.wiki/json-rpc/API#the-default-block-parameter
     * earliest:创世纪块
     * latest  :最后打包的区块
     * pending :等待打包的状态
     * 0x9c97A4351571027EeE50275001959Ca5Dc50BD53:修改为你的账号
     */
    const [balance,setBalance] = useState();
    const paramsBalance =['0x4a64da1f0408Bac18622AD50e40fb1479944e8DC','latest'];
    function balanceOnclick(){
        const getBalance = async() =>{
            const result=  await ethereum.request({ method: 'eth_getBalance', params:paramsBalance});
            setBalance(Number(result));
        }
        getBalance();
    }

    return (
        <>
            <div className="topnav">
                <a href="#">Home</a>
                <a href="#">Article</a>
                <a href="#">Tag</a>
                <a href="#">About</a>
                <a href="#" style={{ float: 'right' }} >Connect</a>
            </div>
            <div className="container">
                <div className="row">

                    <h3>https://thinkingChain.app</h3>
                    <div>
                        <button className="button" onClick={connectedOnclick}>是否已经连接?</button>
                        <h5>是否已经连接到网络:{connected}</h5>
                        <h5>切换账号后:{accountsChange}</h5>
                        <h5>切换网络后:{chainChanged}</h5>
                        <button className="button" onClick={accountsOnclick}>获取所有账号</button>
                        <h5>所有账号:{accounts}</h5>
                        <button className="button" onClick={balanceOnclick}>获取余额</button>
                        <h5>余额:{balance}</h5>
                    </div>

                    <div className="fakeimg"></div>
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
            `}
            </style>

        </>
    )
}

export default Home;

