import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";

//币安 0xF977814e90dA44bFA03b6295A0616a897441aceC
const BI_AN = "0xF977814e90dA44bFA03b6295A0616a897441aceC";

describe("Fork Helper", function () {
    describe("Signer", function () {
        it("Transfer ETH ", async function () {
            //获取币安ETH余额
            const provider = new ethers.JsonRpcProvider();
            const ethBalance = await provider.getBalance(BI_AN);
            console.log("BiAn before ETH balance", ethers.formatEther(ethBalance));

            //仿冒签名
            const iSigner = await ethers.getImpersonatedSigner(BI_AN);
            const weiAmount = ethers.parseUnits("100");
            let tx1 = { from: BI_AN, to: ethers.ZeroAddress, value: weiAmount };
            const responseTxETH = await iSigner.sendTransaction(tx1);
            await responseTxETH.wait();

            //再次获取币安ETH余额
            const ethBalance2 = await provider.getBalance(BI_AN);
            console.log("BiAn after ETH balance", ethers.formatEther(ethBalance2));
        });
    });
});
