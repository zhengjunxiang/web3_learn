require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/bHMHDQvFebqsWeWExs2XjdsrGLgg84E9",
      accounts: [`0x3afd05cdf7d25d159d65995465b80dcff59b89b5fd029a90dcd4ee080b4f8b8d`]
    }
  }
};
