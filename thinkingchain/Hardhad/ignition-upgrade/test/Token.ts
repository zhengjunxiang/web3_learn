
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token contract", function() {

  it("Deployment should assign the total supply of tokens to the owner", async function() {
    const [owner, account2] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("Token", account2);
    const ownerBalance = await hardhatToken.balanceOf(account2.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Transfer token", async function() {
    const [owner, receive] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("Token", owner);
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log(`Owner balance:`, ethers.formatUnits(ownerBalance, 6));

    const amount = ethers.parseUnits("1", 6);
    const responseTx = await hardhatToken.transfer(receive, amount);
    await responseTx.wait();
    const receiveBalance = await hardhatToken.balanceOf(receive.address);
    expect(receiveBalance).to.equal(amount);

    const ownerBalance2 = await hardhatToken.balanceOf(owner.address);
    console.log(`Owner balance2:`, ethers.formatUnits(ownerBalance2, 6));
    expect(ownerBalance2).to.equal(0);
  });
});
