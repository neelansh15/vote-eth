const { expect } = require("chai");
const { ethers } = require("hardhat");

const candidateArray = ["Daniil Dubov", "Levon Aronian", "Nihal Sarin"];
describe("Ballot", function () {
  it("Should get candidates", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy();
    await ballot.deployed();

    candidateArray.forEach(async (name) => {
      await ballot.addCandidate(ethers.utils.formatBytes32String(name));
    });

    const response = await ballot.getCandidates();
    console.log("Response from getCandidates:", response);
  });
});
