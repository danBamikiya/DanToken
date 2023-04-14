import { ethers } from "hardhat";

async function main() {
  const DanToken = await ethers.getContractFactory("DanToken");
  const danToken = await DanToken.deploy(100000000, 50);

  await danToken.deployed();

  console.log("Dan Token deployed: ", danToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
