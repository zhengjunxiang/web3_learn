import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/rynTs0qXD7CgalmfvKhcsK2j2R7bbkrt";
//const RPC_URL = "http://127.0.0.1:8545";

function App() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const [address, setAddress] = useState<any | null>();
  const [balance, setBalance] = useState<any | null>();
  const [address2, setAddress2] = useState<any | null>();
  const [transactionCount, setTransactionCount] = useState<any | null>();

  const [hash, setHash] = useState<any | null>();
  const [transactionObject, setTransactionObject] = useState<any | null>();
  const [hash2, setHash2] = useState<any | null>();
  const [transactionReceipt, setTransactionReceipt] = useState<any | null>();

  //action
  //根据地址获取以太坊余额
  const requestBalance = async () => {
    const balanceTemp = await provider.getBalance(address);
    setBalance(ethers.formatEther(balanceTemp));
  };
  //根据地址获取交易次数
  const requestTransactionCount = async () => {
    setTransactionCount(await provider.getTransactionCount(address2));
  };

  //根据哈希获取交易对象
  const requestTransactionObject = async () => {
    setTransactionObject(await provider.getTransaction(hash));
  };
  //根据哈希获取交易凭证
  const requestTransactionReceipt = async () => {
    setTransactionReceipt(await provider.getTransactionReceipt(hash));
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const onChangeAddress2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
  };
  const onChangeHash = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash(e.target.value);
  };
  const onChangeHash2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHash2(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-5 gap-5">
            <label className="block col-span-4">
              <span className="text-gray-700">根据地址获取ETH余额</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={address}
                onChange={onChangeAddress}
              />
              <span className="text-indigo-600">{balance}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestBalance}
              >
                获取
              </button>
            </label>

            <label className="block col-span-4">
              <span className="text-gray-700">根据地址获取交易次数</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={address2}
                onChange={onChangeAddress2}
              />
              <span className="text-indigo-600">{transactionCount}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="submit"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestTransactionCount}
              >
                获取
              </button>
            </label>

            <label className="block col-span-4">
              <span className="text-gray-700">根据Hash获取交易对象</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={hash}
                onChange={onChangeHash}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="submit"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestTransactionObject}
              >
                获取
              </button>
            </label>

            <label className="block col-span-5">
              <span className="text-gray-700">交易对象</span>
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={JSON.stringify(transactionObject)}
              ></textarea>
            </label>

            <label className="block col-span-4">
              <span className="text-gray-700">根据Hash获取交易凭证</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={hash2}
                onChange={onChangeHash2}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="submit"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestTransactionReceipt}
              >
                获取
              </button>
            </label>
            <label className="block col-span-5">
              <span className="text-gray-700">交易凭证</span>
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={JSON.stringify(transactionReceipt)}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
