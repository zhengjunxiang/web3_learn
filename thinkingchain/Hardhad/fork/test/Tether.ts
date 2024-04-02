import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

//USDT 合约地址
const TETHER_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
//转出 USDT 地址
//币安 0xF977814e90dA44bFA03b6295A0616a897441aceC
const TETHER_FROM = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
//接收 USDT 地址
const TETHER_TO = "0x22E1701aB03212c62C9404be2ddC53608CCf78aA";

//USDT ABI 
const TETHER_ABI = [
  "function balanceOf(address who) public view returns (uint)",
  "function totalSupply() public view returns (uint)",
  "function transfer(address to, uint value) public"];

describe("Tether", function () {

  async function loadTetherFixture() {
    //创建合约
    const tether = await hre.ethers.getContractAt(TETHER_ABI, TETHER_ADDRESS);
    //或
    //const [owner, otherAccount] = await hre.ethers.getSigners();
    //const tether = new hre.ethers.Contract(TETHER_ADDRESS, TETHER_ABI, owner);
    return { tether };

  }

  describe("Balance", function () {
    it("Get usdt balance by address", async function () {
      const { tether } = await loadFixture(loadTetherFixture);
      //获取 FROM 地址的 USDT 余额
      const balance = await tether.balanceOf(TETHER_FROM);
      console.log("USDT balance", hre.ethers.formatUnits(balance, 6));
      //获取 USDT 总发行量
      const totalSupply = await tether.totalSupply();
      console.log("USDT totalSupply", hre.ethers.formatUnits(totalSupply, 6));
    });
   
    it("send eth and usdt balance", async function () {
      //伪装签名者
      const impersonatedSigner = await hre.ethers.getImpersonatedSigner(TETHER_FROM);
      //通过伪装签名者创建合约
      const tether = new hre.ethers.Contract(TETHER_ADDRESS, TETHER_ABI, impersonatedSigner);
      //获取TETHER_FROM USDT 余额
      const balance = await tether.balanceOf(TETHER_FROM);
      console.log("before transfer from account Tether balance", hre.ethers.formatUnits(balance, 6));
      
      //给 TETHER_FROM 账号转 1 ETH燃气费用
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const weiAmount = hre.ethers.parseUnits("1");
      let tx1 = { from: owner, to: TETHER_FROM, value: weiAmount };
      const responseTxETH = await owner.sendTransaction(tx1);
      await responseTxETH.wait();

      //获取TETHER_FROM ETH 余额
      const provider = new hre.ethers.JsonRpcProvider();
      const ethBalance = await provider.getBalance(TETHER_FROM);
      console.log("before transfer from account ETH balance", hre.ethers.formatEther(ethBalance));
      
      //TETHER_FROM 给 TETHER_TO 转 1 USDT
      const responseTxTether = await tether.transfer(TETHER_TO, 1_000_000);
      await responseTxTether.wait();

      //转账后 获取TETHER_FROM USDT 余额
      const UsdtBalance = await tether.balanceOf(TETHER_FROM);
      console.log("after transfer from account balance", hre.ethers.formatUnits(UsdtBalance, 6));

    });
  
  });


});
