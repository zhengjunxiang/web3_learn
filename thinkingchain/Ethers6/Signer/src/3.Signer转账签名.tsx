import React, { useState } from "react";
import { ethers, JsonRpcSigner, TransactionRequest, FeeData } from "ethers";
import "./App.css";

function App() {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [signature, setSignature] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
  const [balance, setBalance] = useState<string>("");

  //连接钱包
  const connectOnclick = async () => {
    /*
   //MetaMask 
   if (window.ethereum == null) {
     return;
   }
   const providerWeb3 = new ethers.BrowserProvider(window.ethereum);
   await window.ethereum.request({method: "eth_requestAccounts",});
   */
    //JsonRPCProvider
    const providerWeb3 = new ethers.JsonRpcProvider();
    setProvider(providerWeb3);
    //当前账号
    const signer: JsonRpcSigner = await providerWeb3.getSigner();
    setFrom(await signer.getAddress());
    //切换账号
    window.ethereum.on("accountsChanged", function (accountsChange: any) {
      setFrom(accountsChange[0]);
    });
  };

  //转账签名
  const onclickSignTX = async () => {
    const signer: JsonRpcSigner = await provider.getSigner(from);
    const weiAmount = ethers.parseUnits(amount.toString());
    let tx1: TransactionRequest = { from: from, to: to, value: weiAmount };
    const gas: bigint = await provider.estimateGas(tx1);
    const feeData: FeeData = await provider.getFeeData();
    tx1.gasLimit = gas;
    tx1.maxFeePerGas = feeData.maxFeePerGas;
    const result = await signer.signTransaction(tx1);
    setSignature(result);
  };

  //递交签名
  const onclickBroadcastTX = async () => {
    await provider.broadcastTransaction(signature);
  };

  //获取To余额
  const onclickGetBalance = async () => {
    const balance: bigint = await provider.getBalance(to);
    setBalance(ethers.formatEther(balance));
  };

  const onChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(e.target.value);
  };
  const onChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTo(e.target.value);
  };
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-5 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">From:</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={from}
                onChange={onChangeFrom}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connectOnclick}
              >
                Connnet
              </button>
            </label>

            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickSignTX}
              >
                Sign TX
              </button>
            </label>
          </div>

          <div className="grid grid-cols-5 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">To:</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={to}
                onChange={onChangeTo}
              />
              <span className="text-red-700">{balance}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickGetBalance}
              >
                Get Balance
              </button>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-2">
              <span className="text-gray-700">Amount:</span>
              <input
                type="number"
                className="mt-1 block w-full"
                placeholder=""
                value={amount}
                onChange={onChangeAmount}
              />
            </label>
            <label className="block"></label>
          </div>

          <div className="grid grid-cols-5 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">Signature:</span>
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={signature}
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickBroadcastTX}
              >
                Broadcast TX
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
