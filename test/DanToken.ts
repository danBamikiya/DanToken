import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DanToken } from "../typechain-types";

const { expect } = require("chai");

describe("DanToken contract", function () {
  // global vars
  let Token;
  let danToken: DanToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let tokenCap = 1000000000;
  let tokenBlockReward = 50;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("DanToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    danToken = await Token.deploy(tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await danToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await danToken.balanceOf(owner.address);
      expect(await danToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await danToken.cap();
      expect(Number(ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await danToken.blockReward();
      expect(Number(ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await danToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await danToken.transfer(addr1.address, 100);

      // Transter another 50 tokens from owner to addr2.
      await danToken.transfer(addr2.address, 50);

      // Check balances
      const finalOwnerBalance = await danToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await danToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await danToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await danToken.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(danToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance"
      );

      // Owner balance shouldn't have changed
      expect(await danToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("should update balances after transfers", async function () {
      const initialOwnerBalance = await danToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1
      await danToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2
      await danToken.transfer(addr2.address, 50);

      // Check balances
      const finalOwnerBalance = await danToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await danToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await danToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
