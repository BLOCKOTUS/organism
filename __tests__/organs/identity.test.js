const fs = require('fs');
const path = require('path');

const registerUser = require('../../organs/admins/registerUser').main;
const api = require('../../organs/identity/api');
var user;

beforeAll( async () => {
    const username = (Math.random() * 420).toString();
    await registerUser(username);
    const wallet = fs.readFileSync(path.join(__dirname, `../../wallet/${username}.id`), {encoding: 'utf8'});
    user = { username, wallet: JSON.parse(wallet) };
});

it('Should create an identity', async () => {
    var isError = false;
    const identity = await api.create({
        encryptedIdentity: {},
        override: true,
        user
    }).catch(e => isError = true);
    const identity2 = await api.create({
        encryptedIdentity: {},
        override: true,
        user
    }).catch(e => isError = true);

    expect(isError).toBeFalsy();
}, 10000);

it('Should not be able to create an identity', async () => {
    var isError = false;
    const identity = await api.create({
        encryptedIdentity: {},
        override: false,
        user
    }).catch(e => isError = true);

    expect(isError).toBeTruthy();
});

it('Should get an identity', async () => {
    const identity = await api.get({
        user
    });

    expect(identity.encryptedIdentity).toBeDefined();
    expect(identity.confirmations).toBeDefined();
    expect(identity.kyc).toBeDefined();
});
