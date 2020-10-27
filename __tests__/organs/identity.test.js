const fs = require('fs');
const path = require('path');
const { RSA, Crypt } = require('hybrid-crypto-js');
const crypto = require('crypto');

const registerUser = require('../../organs/admins/registerUser').main;
const api = require('../../organs/identity/api');

var rsa = new RSA();
var crypt = new Crypt();

const identity1 = {
    firstname: 'John',
    lastname: 'Smith',
    birthdate: '1992-01-01',
    nation: 'ES',
    nationalId: '89898989G',
};

const identity2 = { ...identity1, nationalId: '78787878K' };

var user, keypair1, keypair2, encryptedIdentity1, encryptedIdentity2, uniqueHash1, uniqueHash2;

const generateKeyPair = () => {
    return new Promise((resolve) => {
        rsa.generateKeyPair(resolve);
    });
};

const uniqueHashFromIdentity = identity =>
    crypto
        .createHash('md5')
        .update(`${identity.nation}-${identity.nationalId}-${identity.birthdate}`)
        .digest('hex');

beforeAll( async () => {
    // get a keypair and encrypt the identity with the publicKey
    keypair1 = await generateKeyPair();
    keypair2 = await generateKeyPair();
    encryptedIdentity1 = crypt.encrypt(keypair1.publicKey, JSON.stringify(identity1));
    encryptedIdentity2 = crypt.encrypt(keypair2.publicKey, JSON.stringify(identity2));
    uniqueHash1 = uniqueHashFromIdentity(identity1);
    uniqueHash2 = uniqueHashFromIdentity(identity2);

    // register a user in the network
    const username = (Math.random() * 420).toString();
    await registerUser(username);
    const wallet = fs.readFileSync(path.join(__dirname, `../../wallet/${username}.id`), {encoding: 'utf8'});
    user = { username, wallet: JSON.parse(wallet) };
});

it('Should create an identity', async () => {
    var isError = false;
    await api.create({
        encryptedIdentity: encryptedIdentity1,
        uniqueHash: uniqueHash1,
        override: true,
        user
    }).catch(e => isError = true);
    await api.create({
        encryptedIdentity: encryptedIdentity2,
        uniqueHash: uniqueHash2,
        override: true,
        user
    }).catch(e => isError = true);

    expect(isError).toBeFalsy();
}, 10000);

it('Should not be able to create an identity', async () => {
    var isError = false;
    await api.create({
        encryptedIdentity: encryptedIdentity2,
        uniqueHash: uniqueHash2,
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
