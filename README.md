# Betting-Contract

A contract with the use of javascript for managing a betting system.

## Description

This smart contract with the front-end simulates a betting system where users can connect their MetaMask wallet and place, check, and resolve a bet. A contract connects to a javascript file where the front-end works with the contract.

## Prerequisites

- Any JS IDE that has Node.js installed
- Metamask wallet

## Getting Started

### Installing

1. This code can be used by cloning this repository.
   
  ```git clone <repository-url(copy it under drop-down green code button on the repo)>```

2. In your preferred JS IDE open three terminals and type:

- First terminal: ```npm i```
- Second Terminal: ```npx hardhat node```
- Third Terminal: ```npx hardhat run --network localhost scripts/deploy.js```

### Executing program

Back to the first terminal, type `npm run dev` to launch, and click the localhost under it.

### Contract interaction

- The MetaMask will automatically open so you can connect to the contract.
- Place 1 bet and confirm the transaction in the MetaMask
- Check bet status, click it and press `F12`, click the drop-down under bet status
- Resolved the bet if it is won or lost under bet status and proceed to metamask to resolve.

## Help

- After running the third terminal, a contract address will appear. Copy and paste it under the `contractAddress` in `index.js`
- Make sure npm dependencies and bootstrap for the front end are installed.

## Author

Jairell Louis J. Ignacio
https://github.com/Xhideto

## License

This project is licensed under the MIT
