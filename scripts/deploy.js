const hre = require("hardhat");

async function main() {
  const Betting = await hre.ethers.getContractFactory("Betting");
  const betting = await Betting.deploy();
  await betting.deployed();

  console.log("Betting contract deployed to:", betting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
