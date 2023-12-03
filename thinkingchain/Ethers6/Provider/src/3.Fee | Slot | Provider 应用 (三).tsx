import React, { useState } from "react";
import { AbiCoder, ethers, FeeData } from "ethers";
import "./App.css";

const RPC_URL =
  "https://eth-mainnet.g.alchemy.com/v2/rynTs0qXD7CgalmfvKhcsK2j2R7bbkrt";
//const RPC_URL = "http://127.0.0.1:8545";

function App() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const [gasPrice, setGasPrice] = useState<any | null>();
  const [maxFeePerGas, setMaxFeePerGas] = useState<any | null>();
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState<
    any | null
  >();

  const [address, setAddress] = useState<any | null>();
  const [slot, setSlot] = useState<any | null>(0);
  const [slotValue, setSlotValue] = useState<any | null>();

  //action
  //获取Gas价格
  const requestGasPrice = async () => {
    const feeData = (await provider.getFeeData()) as FeeData;
    console.log("feeData", feeData);
    if (feeData.gasPrice !== null) {
      setGasPrice(ethers.formatUnits(feeData.gasPrice, "gwei"));
    }
    if (feeData.maxFeePerGas !== null) {
      setMaxFeePerGas(ethers.formatUnits(feeData.maxFeePerGas, "gwei"));
    }
    if (feeData.maxPriorityFeePerGas !== null) {
      setMaxPriorityFeePerGas(
        ethers.formatUnits(feeData.maxPriorityFeePerGas, "gwei")
      );
    }
  };

  ///根据合约地址与插槽获取插槽里面的值
  ///0x24084bf8eb47abf42a80620db6dd6f549673c822
  const requestGetStorage = async () => {
    const storageValue = await provider.getStorage(address, slot);
    console.log("storageValue", storageValue);
    //转换成整数
    //setSlotValue(parseInt(storageValue, 16));
    //转换成字符
    //setSlotValue(ethers.toUtf8String(storageValue));
    setSlotValue(storageValue);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const onChangeSlot = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlot(e.target.value);
  };

  return (
    <div className="flex justify-center ">
      <div className="py-10">
        <div className="mt-8 max-w-none">
          <div className="grid grid-cols-8 gap-5">
            <label className="block col-span-2 "></label>
            <label className="block col-span-2">
              <span className="text-gray-700">获取 gasPrice (gwei)</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={gasPrice}
              />
            </label>

            <label className="block">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="button"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestGasPrice}
              >
                获取
              </button>
            </label>
          </div>

          <div className="grid grid-cols-8 gap-5">
            <label className="block col-span-2 "></label>
            <label className="block col-span-2 ">
              <span className="text-gray-700">获取 maxFeePerGas (gwei)</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={maxFeePerGas}
              />
              <span className="text-gray-700">
                获取 maxPriorityFeePerGas (gwei)
              </span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={maxPriorityFeePerGas}
              />
            </label>
          </div>

          <div className="grid grid-cols-8 gap-5">
            <label className="block col-span-2 "></label>
            <label className="block col-span-3">
              <span className="text-gray-700">根据合约的地址</span>
              <input
                type="text"
                className="mt-1 block w-full"
                placeholder=""
                value={address}
                onChange={onChangeAddress}
              />
              <span className="text-indigo-600">{slotValue}</span>
            </label>

            <label className="block ">
              <span className="text-gray-700">插槽</span>
              <input
                type="number"
                className="mt-1 block w-full"
                placeholder=""
                value={slot}
                onChange={onChangeSlot}
              />
            </label>

            <label className="block ">
              <span className="text-gray-700">&nbsp;</span>
              <button
                type="submit"
                className=" block bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={requestGetStorage}
              >
                获取
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
