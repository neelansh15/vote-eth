const { expect } = require("chai");
const { ethers } = require("hardhat");

const candidateArray = ["Daniil Dubov", "Levon Aronian", "Nihal Sarin"];
describe("Ballot Candidates", function () {
  it("Should add and get candidates and display their names ", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy();
    await ballot.deployed();

    // Add candidates
    candidateArray.forEach(async (name) => {
      await ballot.addCandidate(ethers.utils.formatBytes32String(name));
    });

    const candidates = await ballot.getCandidates();
    console.log("Response from getCandidates:", candidates);

    const names = candidates.map((candidate) =>
      ethers.utils.parseBytes32String(candidate.name)
    );
    console.log("Names: ", names);
  });
});
