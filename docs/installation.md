## Installation

### Requirements

- NVM, node 10 and 12
- Docker (daemon must be running)
- Clone this repository

#### Known issue
- macOS: Docker Desktop 2.4.0.0 requires to uncheck "Use gRPC FUSE for file sharing" in Docker -> Preferences -> General

### Steps

Start docker.

Run the following commands from the Organism root directory:

```bash
$ yarn run update-submodules
$ yarn run devInstall # you may have to run the command two times and switch your node version
``` 

Done.
