const blockchainService = require('../services/blockchainService');

module.exports = {
  createProject: async (req, res) => {
    const { founderAddress, name, fundingGoal, valuation, equityOffered, durationDays } = req.body;
    try {
      await blockchainService.createProject(founderAddress, name, fundingGoal, valuation, equityOffered, durationDays);
      res.status(200).send('Project created successfully');
    } catch (error) {
      res.status(500).send('Error creating project');
    }
  },
  invest: async (req, res) => {
    const { projectId, investorAddress, amount } = req.body;
    try {
      await blockchainService.invest(projectId, investorAddress, amount);
      res.status(200).send('Investment successful');
    } catch (error) {
      res.status(500).send('Error making investment');
    }
  },
  withdrawFunds: async (req, res) => {
    const { projectId, founderAddress } = req.body;
    try {
      await blockchainService.withdrawFunds(projectId, founderAddress);
      res.status(200).send('Funds withdrawn');
    } catch (error) {
      res.status(500).send('Error withdrawing funds');
    }
  }
};
