![Twitter Follow](https://img.shields.io/twitter/follow/BLOCKOTUS?style=for-the-badge&logo=twitter)
![GitHub followers](https://img.shields.io/github/followers/danielfebrero?label=danielfebrero&style=for-the-badge&logo=github)
![GitHub Org's stars](https://img.shields.io/github/stars/BLOCKOTUS?logo=github&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/BLOCKOTUS/Organism?style=for-the-badge)

<br />

# || BLOCKOTUS || Organism Boilerplate

<br />
<br />
<br />

<p align="center">
<img 
    style="margin-right: 10px" 
    height="60px" 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png" 
/>
<img 
    style="margin-right: 10px" 
    height="60px" 
    src="https://www.hyperledger.org/wp-content/uploads/2018/03/Hyperledger_Fabric_Logo_Color-1-300x84.png" 
/>
<img 
    style="margin-right: 10px" 
    height="60px" 
    src="https://github.com/sveltejs/branding/raw/master/svelte-horizontal.png" 
/>
<img 
    style="margin-right: 10px" 
    height="60px" 
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1200px-Node.js_logo_2015.svg.png"
/>
</p>
<br />
<br />
<br />

## _The most advanced boilerplate for Hyperledger Fabric_


Build complete decentralized applications with BLOCKOTUS Organism. 

Easily create a webapp that includes a Frontend (Svelte / React), a Backend (Nodejs / Express), a Network and Chaincode Contracts (Hyperledger Fabric, Smart Contracts).

**Fabric-network @ 2.2.0**

## Built-in 
- Webapp boilerplate: Svelte.js + TypeScript + EsLint
- API boilerplate: express
- Network boilerplate: ibm
- Scripts: hot chaincode upgrade, auto-install, deployment
### Features
- Register user
- Decentralized user verification (KYC)

## Documentation

[Architecture](https://github.com/BLOCKOTUS/organism/blob/master/docs/architecture.md)

## Installation

### Requirements

- NVM, node 10 and 12
- Docker (daemon must be running)
- Clone this repository

### Steps

Start docker.

Add the following to your .bashrc or .zshrc

```
export BLOCKOTUS=PATH TO YOUR BLOCKOTUS ORGANISM
export PATH=${BLOCKOTUS}/network/bin:$PATH
export FABRIC_CFG_PATH=${BLOCKOTUS}/network/config/

# Environment variables for Org1

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${BLOCKOTUS}/network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${BLOCKOTUS}/network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# Environment variables for Org2

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${BLOCKOTUS}/network/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${BLOCKOTUS}/network/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051
```

Run the following commands from the Organism root directory:

```bash
$ git submodules update --init --recursive
$ yarn run devInstall # you may have to run the command two times and switch your node version
``` 

Done.

## Usage

### Run the complete organism

```bash
$ yarn run dev
``` 

Done.
It executes the following tasks:
- run the Hyperledger network
- deploy chaincode contracts
- start the nerves server
- start the webapp
- run the bootstrap

### Hot Chaincode Contract Upgrade

Assuming you made modifications on the `user` chaincode contracts (User, Keypair or another contract of this organ), and you want it to be deployed to the Network, run:

```bash
$ yarn run upgrade-organ user
``` 

The newly deployed contract will be automatically used by the the organism.

### Accessing to the webapp

Go to http://localhost:5000

### Accessing to the CouchDB database interface

Go to http://localhost:5984/_utils

Credentials: admin / adminpw

### Tests

For a full coverage, start the organism before running tests.

```bash
$ yarn dev
$ yarn test
```

### Inspect Chaincode contracts logs (while running)

```bash
$ docker ps # find the container id of the Chaincode you want to inspect
$ docker logs -f <containerId>
```
