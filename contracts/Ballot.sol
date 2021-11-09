//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

struct Voter {
    bool voted;
    uint vote; // Index of candidate
}

contract Ballot {
    address public chairman;

}
