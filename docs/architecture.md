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
