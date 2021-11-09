const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot", function () {
  it("Should get candidate names", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy(["Daniil Dubov", "Levon Aronian", "Nihal Sarin"]);
    await ballot.deployed();
    
  });
});
