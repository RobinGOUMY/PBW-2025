// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Aurea {
    
    struct Project {
        address founder;
        string name;
        uint256 fundingGoal;
        uint256 totalRaised;
        uint256 valuation;
        uint256 equityOffered; // in %
        uint256 deadline;
        bool isOpen;
        bool isSuccessful;
        mapping(address => Investor) investors;
        address[] investorList;
    }

    struct Investor {
        uint256 amount;
        uint256 equityShare; // e.g., 0.5% of equity
        bool hasClaimedNFT;
    }

    uint256 public platformFee = 5;
    uint256 public cashOutFee = 10;
    uint256 public equityReserve = 2; // % equity kept by the platform

    mapping(uint256 => Project) public projects;
    uint256 public projectCount;

    // Events
    event ProjectCreated(uint256 indexed projectId, address indexed founder);
    event Invested(uint256 indexed projectId, address indexed investor, uint256 amount);
    event NFTMinted(address investor, uint256 projectId, uint256 equityShare);
    event FundsWithdrawn(uint256 indexed projectId, address founder);

    // Create a new fundraising project
    function createProject(
        string memory _name,
        uint256 _fundingGoal,
        uint256 _valuation,
        uint256 _equityOffered,
        uint256 _durationDays
    ) public {
        projectCount++;
        Project storage p = projects[projectCount];
        p.founder = msg.sender;
        p.name = _name;
        p.fundingGoal = _fundingGoal;
        p.valuation = _valuation;
        p.equityOffered = _equityOffered;
        p.deadline = block.timestamp + (_durationDays * 1 days);
        p.isOpen = true;

        emit ProjectCreated(projectCount, msg.sender);
    }

    // Investors send ETH to participate
    function invest(uint256 projectId) public payable {
        Project storage p = projects[projectId];
        require(p.isOpen, "Project not open");
        require(block.timestamp < p.deadline, "Deadline passed");
        require(msg.value > 0, "Must invest a positive amount");

        Investor storage investor = p.investors[msg.sender];
        investor.amount += msg.value;
        p.totalRaised += msg.value;

        if (investor.equityShare == 0) {
            p.investorList.push(msg.sender);
        }

        investor.equityShare = (investor.amount * p.equityOffered * 100) / (p.fundingGoal * 10000);

        emit Invested(projectId, msg.sender, msg.value);
    }

    // // Mint NFT manually (can be automated or delegated to another contract)
    // function claimNFT(uint256 projectId) public {
    //     Project storage p = projects[projectId];
    //     Investor storage investor = p.investors[msg.sender];
    //     require(investor.amount > 0, "Not an investor");
    //     require(!investor.hasClaimedNFT, "Already claimed");

    //     // Here you'd call your NFT contract (external) to mint the NFT
    //     // Ex: NFTContract.mint(msg.sender, metadata)

    //     investor.hasClaimedNFT = true;
    //     emit NFTMinted(msg.sender, projectId, investor.equityShare);
    // }

    // Founder can withdraw funds if goal reached
    function withdrawFunds(uint256 projectId) public {
        Project storage p = projects[projectId];
        require(msg.sender == p.founder, "Not your project");
        require(p.totalRaised >= p.fundingGoal, "Goal not reached");
        require(p.isOpen, "Already closed");

        p.isOpen = false;
        p.isSuccessful = true;

        uint256 platformCut = (p.totalRaised * cashOutFee) / 100;
        uint256 amountToFounder = p.totalRaised - platformCut;

        // Platform receives fee
        payable(address(this)).transfer(platformCut);

        // Founder receives remaining funds
        payable(msg.sender).transfer(amountToFounder);

        emit FundsWithdrawn(projectId, msg.sender);
    }

    // Optional: distribute rewards / profits
    function distributeProfits(uint256 projectId) public payable {
        Project storage p = projects[projectId];
        require(msg.sender == p.founder, "Only founder");

        for (uint i = 0; i < p.investorList.length; i++) {
            address inv = p.investorList[i];
            uint256 reward = (msg.value * p.investors[inv].equityShare) / 100;
            payable(inv).transfer(reward);
        }
    }
}
