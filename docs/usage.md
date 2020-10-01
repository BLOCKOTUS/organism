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
