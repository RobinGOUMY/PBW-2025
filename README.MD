# EquityMarketplace Smart Contract

The **EquityMarketplace** smart contract allows entrepreneurs (founders) to raise funds for their projects by offering equity in the form of NFTs. Investors can participate in funding projects and claim NFTs representing their share of equity in the project. The contract handles project creation, investment management, equity distribution, and profit sharing.

## ⚠️ Hackathon Project – Not Fully Completed
🚧 This project was created during a hackathon and remains incomplete. It served as a prototype built under time constraints. Use with caution improvements welcome!

## Table of Contents
- [EquityMarketplace Smart Contract](#equitymarketplace-smart-contract)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Functions](#functions)
    - [`createProject()`](#createproject)
    - [`invest()`](#invest)
    - [`claimNFT()`](#claimnft)
    - [`withdrawFunds()`](#withdrawfunds)
    - [`distributeProfits()`](#distributeprofits)
  - [Events](#events)
  - [Fees](#fees)
  - [Security Considerations](#security-considerations)
  - [License](#license)

## Features
- **Create Projects**: Founders can create fundraising campaigns with funding goals, equity offered, and a deadline.
- **Invest**: Investors can contribute ETH and receive equity shares based on the amount they invest.
- **Claim NFT**: Investors can claim an NFT to represent their equity share in a project.
- **Withdraw Funds**: Founders can withdraw funds once the funding goal is reached, after paying the platform fee.
- **Distribute Profits**: Founders can distribute profits to investors based on their equity share.

## Requirements
- Ethereum compatible blockchain (e.g., Ethereum, Polygon, Binance Smart Chain).
- Solidity version `^0.8.0`.
- Web3 provider (e.g., MetaMask, Infura) for interacting with the blockchain.

## Installation

1. Clone the repository or create a new contract on your development environment.

   ```bash
   git clone <repository_url>
   cd EquityMarketplace


2. Compile the smart contract using a Solidity compiler or deploy it directly using Remix or Truffle.

## Usage
1. **Deploy the contract** on your Ethereum-compatible network.
2. **Founders**: Use the `createProject()` function to launch a fundraising campaign.
3. **Investors**: Use the `invest()` function to send ETH and receive equity in the project.
4. **Withdraw Funds**: Founders can call `withdrawFunds()` to withdraw the raised funds if the goal is met.
5. **Distribute Profits**: Founders can distribute profits to investors using the `distributeProfits()` function.

## Functions

### `createProject()`
- **Parameters**:
  - `_name`: Name of the project.
  - `_fundingGoal`: The goal amount of ETH to raise.
  - `_valuation`: The valuation of the project.
  - `_equityOffered`: Percentage of equity offered to investors.
  - `_durationDays`: Duration (in days) for the project fundraising.

- **Description**: Allows the founder to create a new fundraising project.

### `invest()`
- **Parameters**:
  - `projectId`: The ID of the project to invest in.
  
- **Description**: Allows an investor to send ETH to participate in a project. In return, the investor receives equity in the project.

### `claimNFT()`
- **Parameters**:
  - `projectId`: The ID of the project.
  
- **Description**: Allows the investor to claim an NFT representing their equity share in the project.

### `withdrawFunds()`
- **Parameters**:
  - `projectId`: The ID of the project.
  
- **Description**: Allows the project founder to withdraw the raised funds if the funding goal is met. The platform fee is deducted from the total raised amount.

### `distributeProfits()`
- **Parameters**:
  - `projectId`: The ID of the project.
  
- **Description**: Allows the project founder to distribute profits to the investors based on their equity shares.

## Events

- `ProjectCreated(uint256 indexed projectId, address indexed founder)`: Emitted when a new project is created.
- `Invested(uint256 indexed projectId, address indexed investor, uint256 amount)`: Emitted when an investor makes an investment.
- `NFTMinted(address investor, uint256 projectId, uint256 equityShare)`: Emitted when an investor claims their NFT.
- `FundsWithdrawn(uint256 indexed projectId, address founder)`: Emitted when a founder withdraws the funds after the goal is reached.

## Fees

- **Platform Fee**: 5% of the funds raised in each project (deducted during withdrawal).
- **Cash Out Fee**: 10% of the funds withdrawn by the founder.
- **Equity Reserve**: The platform reserves 2% of equity in each project for itself.

## Security Considerations

- Ensure that only the project founder can withdraw funds or distribute profits.
- Use proper access control for sensitive functions (e.g., `onlyFounder` modifier).
- Review gas limits to avoid transaction failures during high network congestion.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
