require('dotenv').config();  // Load .env file

const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Default network: local development (Ganache)
    development: {
      host: "https://rpc2.bahamut.io",
      port: 5165,
      network_id: "*",  // Match any network id
    },

    // Bahamut Testnet configuration
    bahamutMainnet: {
      host: "https://rpc2.bahamut.io",
      privateKey: "8983f8967fb9d50aa280bd0c4e87f5d36e2965d2e7dbbd226aa9405d925252dd",
      provider: () => new HDWalletProvider("8983f8967fb9d50aa280bd0c4e87f5d36e2965d2e7dbbd226aa9405d925252dd", "https://rpc2.bahamut.io"),
      network_id: 5165,   // Fastex id
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      gas: "6500000",
      gasPrice: "3000000000",
      from: "0xB63e40bC863741ab69Cf2EDd36F87c87f8312DaB", 
      skipDryRun: true
    },
  },

  // Mocha settings (optional)
  mocha: {
    // timeout: 100000,
  },

  // Solidity compiler settings
  compilers: {
    solc: {
      version: "0.8.19", // Specify the Solidity version
    },
  },
};
