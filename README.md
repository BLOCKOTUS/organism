# || BLOCKOTUS || Organism
## _Hyperledger Fabric SDK_

Build complete decentralized applications with BLOCKOTUS Organism. 

Easily create a webapp that includes a Frontend (Svelte / React), a Backend (Nodejs / Express), a Network and Chaincode Contracts (Hyperledger Fabric, Smart Contracts).

## Architecture

### Nerves
HTTP server. It is an API connecting Webapps and the Organs.

[https://github.com/BLOCKOTUS/nerves](https://github.com/BLOCKOTUS/nerves)

### Network
HyperLedger Fabric network. Basic sample with 2 orgs. Used for local development and self-mounted networks. Can be replaced by IBM Cloud.

[https://github.com/BLOCKOTUS/network](https://github.com/BLOCKOTUS/network)

### Organs
Composed of APIs and Chaincodes Contract, linking the Network and the Nerves. 

#### Admins
Manage admins and wallets.

[https://github.com/BLOCKOTUS/admins](https://github.com/BLOCKOTUS/admins)

#### Helper
Shared APIs and Chaincode Contract functions.

[https://github.com/BLOCKOTUS/helper](https://github.com/BLOCKOTUS/helper)

#### Identity
Used for KYC.

[https://github.com/BLOCKOTUS/identity](https://github.com/BLOCKOTUS/identity)

#### Job
Used for job attribution between users.

[https://github.com/BLOCKOTUS/job](https://github.com/BLOCKOTUS/job)

#### User
Used for managing Network users and usernames.

[https://github.com/BLOCKOTUS/user](https://github.com/BLOCKOTUS/user)

### Webapp
Interacts with the nerves. Serve and manipulate data from the Network.

[https://github.com/BLOCKOTUS/webapp](https://github.com/BLOCKOTUS/webapp)

### Scripts
They help the development and deployment operations.

[https://github.com/BLOCKOTUS/scripts](https://github.com/BLOCKOTUS/scripts)

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
