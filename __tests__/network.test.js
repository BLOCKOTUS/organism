const { exec } = require('child_process');

it('Should return the list of channel, containing `mychannel`', async () => {
    await exec("bash __tests__/network.test.sh -listChannels", (error, stdout, stderr) => {
        expect(stdout).toMatch(/mychannel/);
    });
});

it('Should return correct infos for `mychannel`', async () => {
    await exec("bash __tests__/network.test.sh -getInfo", (error, stdout, stderr) => {
        expect(stdout).toMatch(/Blockchain info:/);
    });
});

it('Should describe the peer', async () => {
    await exec("bash __tests__/network.test.sh -peerVersion", (error, stdout, stderr) => {
        expect(stdout).toMatch(/Version: 2.3.1/);
        expect(stdout).toMatch(/Commit SHA: 2f69b4222/);
        expect(stdout).toMatch(/Go version: go1.14.12/);
        expect(stdout).toMatch(/Base Docker Label: org.hyperledger.fabric/);
    });
});