# DanToken

An ethereum token based on the ERC-20 token standard and deployed on the Goerli TestNet.

- Deployed token contract address on Goerli TestNet: `0xE393933c5Ce44399F00e531874399aFeC6FA28d6`

- Token Symbol: `DNT`

- Token Smart Contract: [DanToken.sol](./contracts/DanToken.sol)

- Smart Contract test file: [DanToken.ts](./test/DanToken.ts)

#### Tech Stack

Solidity

TypeScript

Hardhat

Infura

#### Features

The DanToken contract has the following features:

- It is ERC-20 complaint, meaning it follows a standard set of rules of tokens on the Ethereum blockchain.
- It is capped, meaning there is a maximum supply of tokens that can be minted.
- It is burnable, meaning tokens can be permanently removed from circulation.
- It rewards miners with tokens for validating transactions.

#### Usage

- You can interact with the contract using any Ethereum wallet that supports ERC-20 tokens.
- You can use the DanToken contract to create and manage a custom ERC-20 on the Ethereum blockchain.

#### Ownership and Destruction

The owner of the DanToken contract is the address that deployed the contract. The owner has the ability to set the block reward and destroy the contract.
