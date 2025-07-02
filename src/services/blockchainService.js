const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const contractABI = require('../contracts/EquityMarketplace.json').abi;
const contractAddress = 'ADRESS';

const equityMarketplace = new web3.eth.Contract(contractABI, contractAddress);

module.exports = {
  createProject: async (founderAddress, name, fundingGoal, valuation, equityOffered, durationDays) => {
    const accounts = await web3.eth.getAccounts();
    await equityMarketplace.methods.createProject(name, fundingGoal, valuation, equityOffered, durationDays)
      .send({ from: founderAddress });
  },
  invest: async (projectId, investorAddress, amount) => {
    await equityMarketplace.methods.invest(projectId)
      .send({ from: investorAddress, value: amount });
  },
  withdrawFunds: async (projectId, founderAddress) => {
    await equityMarketplace.methods.withdrawFunds(projectId)
      .send({ from: founderAddress });
  }
};
