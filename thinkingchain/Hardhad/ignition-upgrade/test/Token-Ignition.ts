
import { expect } from "chai";
import { ethers, ignition } from "hardhat";
import TokenModule from "../ignition/modules/Token";
import {
  loadFixture,
  time,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Token contract with ignition", function() {

  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const { token } = await ignition.deploy(TokenModule);
    return { token, owner, otherAccount };
  }

  it("Deployment should assign the total supply of tokens to the owner", async function() {
   
    const { token, owner } = await loadFixture(deployTokenFixture);
    //const { token } = await ignition.deploy(TokenModule);
    const ownerBalance = await token.balanceOf(owner.address);
    
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  it("Transfer token", async function() {
    //const [owner, receive] = await ethers.getSigners();
    const { token,owner,otherAccount } = await loadFixture(deployTokenFixture);
    const ownerBalance = await token.balanceOf(owner.address);
    console.log(`Owner balance:`, ethers.formatUnits(ownerBalance, 6));

    const amount = ethers.parseUnits("1", 6);
    const responseTx = await token.transfer(otherAccount, amount);
    await responseTx.wait();
    const receiveBalance = await token.balanceOf(otherAccount.address);
    expect(receiveBalance).to.equal(amount);

    const ownerBalance2 = await token.balanceOf(owner.address);
    console.log(`Owner balance2:`, ethers.formatUnits(ownerBalance2, 6));
    expect(ownerBalance2).to.equal(0);
  });
});

