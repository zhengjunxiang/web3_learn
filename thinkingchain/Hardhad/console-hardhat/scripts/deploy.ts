import { ethers } from "hardhat";

async function main() {
  const Greeter = await ethers.deployContract("Greeter");
  const greeter = await Greeter.waitForDeployment();
  console.log(`greeter deployed to ${greeter.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});