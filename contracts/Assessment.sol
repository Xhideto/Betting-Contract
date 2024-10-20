// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Betting {
    address payable public owner;
    uint256 public balance;

    event BetPlaced(address indexed player, uint256 amount);
    event BetResolved(address indexed player, uint256 amount, bool won);

    struct Bet {
        uint256 amount;
        bool resolved;
        bool won;
    }

    mapping(address => Bet) public bets;

    constructor() {
        owner = payable(msg.sender);
        balance = 0;
    }

    function placeBet() public payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        require(bets[msg.sender].amount == 0, "You already have an unresolved bet");

        bets[msg.sender] = Bet(msg.value, false, false);
        balance += msg.value;
        emit BetPlaced(msg.sender, msg.value);
    }

    function resolveBet(address player, bool won) public {
        require(msg.sender == owner, "Only the owner can resolve bets");
        require(bets[player].amount > 0, "No bet found for this player");
        require(!bets[player].resolved, "Bet already resolved");

        Bet storage bet = bets[player];
        bet.resolved = true;
        bet.won = won;

        if (won) {
            uint256 payout = bet.amount * 2;
            require(balance >= payout, "Insufficient balance to pay out winnings");
            balance -= payout;
            payable(player).transfer(payout);
        }

        emit BetResolved(player, bet.amount, won);
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function checkBetResult() public view returns (bool, bool) {
        Bet memory bet = bets[msg.sender];
        require(bet.amount > 0, "No bet found for this player");
        return (bet.resolved, bet.won);
    }
}
