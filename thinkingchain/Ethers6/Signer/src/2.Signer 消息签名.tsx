// eth_sign | 先对 msg 消息 Hash 完再签名，msg -> hash(mgs) ->sign
// personal_sign | 先对 msg 消息 Encode 完再签名，msg -> encode(mgs) ->sign
// MetaMask 仅仅支持 personal_sign， 不支持 eth_sign
// 验签地址: https://etherscan.io/verifiedSignatures#

import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [msg1, setMsg1] = useState<string>("");
  const [account1, setAccount1] = useState<string>("");
  const [signature1, setSignature1] = useState<string>("");
  const [verify, setVerify] = useState<string>("");

  const [msg2, setMsg2] = useState<string>("");
  const [signature2, setSignature2] = useState<string>("");

  //action
  //通过PersonalSign签名
  const onclickPersonalSign = async () => {
    if (window.ethereum == null) {
      return;
    }
    //这里使用的是ethers Web3Provider
    const providerWeb3 = new ethers.BrowserProvider(window.ethereum);
    const jsonRpcSigner = await providerWeb3.getSigner();

    const result = await jsonRpcSigner.signMessage(msg1);
    setSignature1(result);
    setAccount1(await jsonRpcSigner.getAddress());
  };

  //验签
  const onclickVerify = async () => {
    const signerAddr = ethers.verifyMessage(msg1, signature1);
    if (signerAddr === account1) {
      setVerify(true.toString());
    } else {
      setVerify(false.toString());
    }
  };

  //通过Eth-Sign签名
  const onclickEthSign = async () => {
    /*
   ///MetaMask不再支持Eth-Sign
   if (window.ethereum == null) {
     return;
   }
   const providerWeb3 = new ethers.BrowserProvider(window.ethereum);
   */
    const providerWeb3 = new ethers.JsonRpcProvider();
    const jsonRpcSigner = await providerWeb3.getSigner();
    const result = await jsonRpcSigner._legacySignMessage(msg2);
    setSignature2(result);
  };

  const onChangeMsg1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg1(e.target.value);
  };
  const onChangeMsg2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg2(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">签名内容</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={msg1}
                onChange={onChangeMsg1}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickPersonalSign}
              >
                Personal Sign
              </button>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={signature1}
              ></textarea>
            </label>
            <label className="block"></label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">校验签名</span>
              <p></p>
              <span className="text-red-700">{verify}</span>
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickVerify}
              >
                Verify
              </button>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <span className="text-gray-700">签名内容（开启本地节点）</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={msg2}
                onChange={onChangeMsg2}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={onclickEthSign}
              >
                Eth-Sign
              </button>
            </label>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <label className="block col-span-3">
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={signature2}
              ></textarea>
            </label>
            <label className="block"></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
