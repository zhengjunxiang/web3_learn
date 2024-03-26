import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [account, setAccount] = useState<any | null>();
  const [accountView, setAccountView] = useState<string | null>("连接钱包");
  const [balance, setBalance] = useState<any | null>("");

  //action
  //连接
  const connectOnclick = async () => {
    if (window.ethereum == null) {
      return;
    }

    //这里使用的是ethers Web3Provider
    const providerWeb3 = new ethers.BrowserProvider(window.ethereum);
    //当前账号
    const currenAccount = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    //const currenAccount = await providerWeb3.send("eth_requestAccounts", []);
    setAccount(currenAccount[0]);
    setAccountView(getFirst4AndLast2Chars(currenAccount[0]));

    //当前账号余额
    const currentBalance = await providerWeb3.getBalance(currenAccount[0]);
    console.log("currentBalance", currentBalance);
    setBalance(ethers.formatEther(currentBalance));

    //切换账号并获取余额
    window.ethereum.on("accountsChanged", function (accountsChange: any) {
      setAccount(accountsChange[0]);
      setAccountView(getFirst4AndLast2Chars(accountsChange[0]));
      //获取余额
      providerWeb3.getBalance(accountsChange[0]).then((result: any) => {
        setBalance(ethers.formatEther(result));
      });
    });
  };

  function getFirst4AndLast2Chars(address: string): string {
    if (address.length !== 42) {
      throw new Error("输入钱包地址");
    }
    const first4Chars = address.slice(0, 4);
    const last2Chars = address.slice(-2);
    return first4Chars + "..." + last2Chars;
  }

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-3 gap-5">
            <label className="block ">
              <span className="text-gray-700">余额</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={balance}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connectOnclick}
              >
                {accountView}
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
