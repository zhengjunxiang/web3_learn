import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/rynTs0qXD7CgalmfvKhcsK2j2R7bbkrt",
        //blockNumber: 19529000
      }
    }
  }
};

export default config;
