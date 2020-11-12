const fs = require('fs');
const path = require('path');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

const registerUser = require('../../tools/admins/dist/registerUser').main;
const api = require('../../organs/user/api/index.minified.js');

const generateKeyPair = () => {
  return new Promise((resolve) => {
    rsa.generateKeyPair(resolve);
  });
};

var username2;
var rsa = new RSA();
var crypt = new Crypt();
var user;

beforeAll( async () => {
  const username = (Math.random() * 420).toString();
  await registerUser(username);
  const wallet = fs.readFileSync(path.join(__dirname, `../../wallet/${username}.id`), {encoding: 'utf8'});
  user = { username, wallet: JSON.parse(wallet) };
});


it('Should create a user', async () => {
  username2 = (Math.random() * 420).toString();
  const keypair = await generateKeyPair();
  const newUser = await api.create({
    username: username2,
    publicKey: keypair.publicKey,
  })

  expect(typeof newUser.wallet.credentials).toBe('object');
  expect(newUser.id).toBeDefined();
}, 10000);

it('Should not create a user', async () => {
  var isError = false;
  const keypair = await generateKeyPair();
  const newUser = await api.create({
    username: username2,
    publicKey: keypair.publicKey,
  }).catch(e => isError = true);

  expect(isError).toBeTruthy();
});

it('Should share a keypair', async () => {
  var isError = false;
  const keypair = await generateKeyPair();
  const keypair2 = await generateKeyPair();
  const myEncryptedKeyPair = crypt.encrypt(keypair.publicKey, keypair2);
  const sharedKeypair = await api.shareKeypair({
    sharedWith: {},
    groupId: 'anyGroupId',
    myEncryptedKeyPair,
    type: 'job',
    user,
  }).catch(e => isError = true);

  expect(isError).toBeFalsy();
}, 10000);

it('Should get a keypair', async () => {
  // TODO: getKeypair
});
