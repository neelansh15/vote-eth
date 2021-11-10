const { expect } = require("chai");
const { ethers } = require("hardhat");

const candidateArray = ["Daniil Dubov", "Levon Aronian", "Nihal Sarin"];
describe("Ballot", function () {
  it("Should add and get candidates and display their names ", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy();
    await ballot.deployed();

    // Add candidates
    candidateArray.forEach(async (name) => {
      await ballot.addCandidate(ethers.utils.formatBytes32String(name));
    });

    const candidates = await ballot.getCandidates();

    const names = candidates.map((candidate) =>
      ethers.utils.parseBytes32String(candidate.name)
    );
    // console.log("Candidate Names from the Contract: ", names);
    expect(names).to.deep.equal(candidateArray);
  });

  it("Should add votes and display winner", async function () {
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy();
    await ballot.deployed();

    // Add candidates
    candidateArray.forEach(async (name) => {
      await ballot.addCandidate(ethers.utils.formatBytes32String(name));
    });

    const [account0, account1] = await ethers.getSigners();

    await ballot.connect(account0).vote(0);
    await ballot.connect(account1).vote(0);

    const winnerBytes32 = await ballot.winnerName();
    const winnerName = ethers.utils.parseBytes32String(winnerBytes32);
    // console.log("Winner Result: ", winnerName);

    expect(winnerName).to.equal("Daniil Dubov");
  });
});
