//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

struct Voter {
    bool voted;
    uint256 vote; // Index of candidate
}

struct Candidate {
    bytes32 name;
    uint256 voteCount;
}

contract Ballot {
    address public chairperson;

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    constructor() {
        chairperson = msg.sender;
    }

    function addCandidate(bytes32 name) external {
        require(msg.sender == chairperson, "Only the chairperson can add candidates");
        candidates.push(Candidate({name: name, voteCount: 0}));
    }

    function vote(uint256 candidateId) external {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You have already voted");

        sender.voted = true;
        sender.vote = candidateId;

        // If candidateId is out of bounds then the whole txn will revert
        candidates[candidateId].voteCount += 1;
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinningCandidateId() public view returns (uint256 candidateId) {
        uint256 maximumVotes = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maximumVotes) {
                maximumVotes = candidates[i].voteCount;
                candidateId = i;
            }
        }
    }

    function winnerName() public view returns (bytes32 name) {
        name = candidates[getWinningCandidateId()].name;
    }
}
