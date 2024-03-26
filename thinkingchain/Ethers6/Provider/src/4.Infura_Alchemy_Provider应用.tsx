import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

const RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/rynTs0qXD7CgalmfvKhcsK2j2R7bbkrt";
//const RPC_URL = "http://127.0.0.1:8545";

function App() {
  ///JsonRpcProvider -> infuraUrl 能正常工作
  //const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/0e3a77ae40234066ab2a778eab1e91de");

  ///InfuraProvider 不能正常工作，主要原因是InfuraProvider没有升级
  //const provider = new ethers.InfuraProvider(1,"0e3a77ae40234066ab2a778eab1e91de","8aee2158ca374ba4a346bb4910af79db");

  ///AlchemyProvider 能正常工作
  //const provider = new ethers.AlchemyProvider("mainnet","rynTs0qXD7CgalmfvKhcsK2j2R7bbkrt");

  ///JsonRpcProvider -> alchemy 能正常工作
  const provider = new ethers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/X0MHoR7c5ni-Lq0d86Q_s9B_6dNfqshC"
  );

  console.log("provider", provider);
  const [lastNumber, setLastNumber] = useState<any | null>();
  const [block, setBlock] = useState<any | null>();
  const [blockHash, setBlockHash] = useState<any | null>();
  const [blockNumber, setBlockNumber] = useState<any | null>();

  //action
  //获取最新区块编号
  const requestBlockNumber = async () => {
    setLastNumber(await provider.getBlockNumber());
  };

  //根据编号获取区块
  const requestBlockByNumber = async () => {
    const block = (await provider.getBlock(
      parseInt(lastNumber)
    )) as ethers.Block;
    setBlock(block);
    setBlockHash(block.hash);
  };

  //根据hash获取区块
  const requestBlockByHash = async () => {
    const block = (await provider.getBlock(blockHash)) as ethers.Block;
    setBlock(block);
    setBlockNumber(block.number);
  };

  const onChangeLastNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNumber(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <h2 className="text-2xl font-bold">Thinkingchain</h2>
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-3 gap-5">
            <label className="block ">
              <span className="text-gray-700">最新区块</span>
              <input
                type="number"
                className="mt-1 block w-full"
                placeholder="正整数"
                value={lastNumber}
                onChange={onChangeLastNumber}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestBlockNumber}
              >
                获取
              </button>
            </label>
            <label className="block col-span-2">
              <span className="text-gray-700">区块 Hash</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder="文本"
                value={blockHash}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="submit"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestBlockByNumber}
              >
                获取
              </button>
            </label>

            <label className="block ">
              <span className="text-gray-700">区块编号</span>
              <input
                type="number"
                className="mt-1 block w-full"
                placeholder="正整数"
                value={blockNumber}
              />
            </label>
            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestBlockByHash}
              >
                获取
              </button>
            </label>
            <label className="block"></label>

            <label className="block col-span-3">
              <span className="text-gray-700">区块信息</span>
              <textarea
                className="mt-1 block w-full"
                rows={3}
                value={JSON.stringify(block)}
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
