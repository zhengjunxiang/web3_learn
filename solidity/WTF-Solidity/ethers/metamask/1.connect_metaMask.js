import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.2.3/ethers.js";
// 获得provider
const provider = new ethers.BrowserProvider(window.ethereum)

const ethereumButton = document.querySelector('.connect');
const showAccount = document.querySelector('.showAccount');
const showChainID = document.querySelector('.showChainID');
const showETHBalance = document.querySelector('.showETHBalance');



const onClickHandler = async () => {
  // 读取钱包地址
  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0]
  console.log(`钱包地址: ${account}`)
  showAccount.innerHTML = account;

  // 读取chainid
  const { chainId } = await provider.getNetwork()
  console.log(`chainid: ${chainId}`)
  showChainID.innerHTML = chainId;

  // 读取ETH余额
  const signer = await provider.getSigner()
  const balance = await provider.getBalance(signer.getAddress());
  console.log(`以太坊余额： ${ethers.formatUnits(balance)}`)
  showETHBalance.innerHTML = ethers.formatUnits(balance);
}

ethereumButton.addEventListener(`click`, onClickHandler)


