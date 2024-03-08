import React, { useState } from "react";
import { ethers, Wallet } from "ethers";
import "./App.css";

function App() {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [privateKeyOut, setPrivateKeyOut] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [wallet, setWallet] = useState<Wallet>();

  //通过私钥创建钱包
  const createOnclick = async () => {
    const newWallet = new Wallet(privateKey);
    setWallet(newWallet);
    console.log(`create wallet success`);
  };

  //获取钱包属性
  const getPropertiesOnclick = async () => {
    setAddress(wallet?.address);
    //setAddress(await wallet?.getAddress());
    setPrivateKeyOut(wallet?.privateKey);
  };

  const onChangePrivateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-6 gap-5">
            <label className="block col-span-4">
              <span className="text-gray-700">PrivateKey In:</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={privateKey}
                onChange={onChangePrivateKey}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={createOnclick}
              >
                Create
              </button>
            </label>
          </div>

          <div className="grid grid-cols-6 gap-5">
            <label className="block col-span-4">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={address}
                onChange={onChangeAddress}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={getPropertiesOnclick}
              >
                Get{" "}
              </button>
            </label>
          </div>

          <div className="grid grid-cols-6 gap-5">
            <label className="block col-span-4">
              <span className="text-gray-700">PrivateKey Out:</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={privateKeyOut}
              />
            </label>
            <label className="block"></label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
