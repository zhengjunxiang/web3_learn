import React, { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [account1, setAccount1] = useState<string>();
  const [signerAccount1, setSignerAccount1] = useState<string>();
  const [balance1, setBalance1] = useState<string>();
  const [nonce1, setNonce1] = useState<number>();

  const [account2, setAccount2] = useState<string>();
  const [signerAccount2, setSignerAccount2] = useState<string>();
  const [balance2, setBalance2] = useState<string>();
  const [nonce2, setNonce2] = useState<number>();

  //action
  //通过MetaMask获取Signer
  const connectOnclickMetaMask = async () => {
    if (window.ethereum == null) {
      return;
    }

    //这里使用的是ethers Web3Provider
    const providerWeb3 = new ethers.BrowserProvider(window.ethereum);
    const jsonRpcSigner = await providerWeb3.getSigner(account1);
    console.log("jsonRpcSignerMetaMask", jsonRpcSigner);
    const address = await jsonRpcSigner.getAddress();
    setSignerAccount1(address);
    setBalance1(ethers.formatEther(await providerWeb3.getBalance(address)));
    setNonce1(await jsonRpcSigner.getNonce());
  };

  //通过本地节点获取Signer
  const connectOnclickLocalHost = async () => {
    ///使用local provider 默认 http://127.0.0.1:8545
    ///需要本地开启ganache
    const providerWeb3 = new ethers.JsonRpcProvider();
    const jsonRpcSigner = (await providerWeb3.getSigner(
      account2
    )) as ethers.Signer;
    console.log("jsonRpcSignerLocalhost", jsonRpcSigner);
    const address = await jsonRpcSigner.getAddress();
    setSignerAccount2(address);
    setBalance2(ethers.formatEther(await providerWeb3.getBalance(address)));
    setNonce2(await jsonRpcSigner.getNonce());
  };

  const onChangeAccount1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount1(e.target.value);
  };
  const onChangeAccount2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount2(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">MetaMask Signer 地址</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={account1}
                onChange={onChangeAccount1}
              />
              <span className="text-red-700">{signerAccount1}</span>
              <p></p>
              <span className="text-red-700"> {balance1}</span>
              <p></p>
              <span className="text-red-700"> {nonce1}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connectOnclickMetaMask}
              >
                MetaMask
              </button>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">LocalHost Signer 地址</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={account2}
                onChange={onChangeAccount2}
              />
              <span className="text-red-700">{signerAccount2}</span>
              <p></p>
              <span className="text-red-700">{balance2}</span>
              <p></p>
              <span className="text-red-700"> {nonce2}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={connectOnclickLocalHost}
              >
                LocalHost
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
