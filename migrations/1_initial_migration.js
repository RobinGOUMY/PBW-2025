const Aurea = artifacts.require("contracts/Aurea.sol");

module.exports = async function (deployer) {
  await deployer.deploy(Aurea);
  console.log("Aurea deployed successfully");
};
