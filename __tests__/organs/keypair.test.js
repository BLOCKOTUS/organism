const fs = require('fs');
const path = require('path');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

const registerUser = require('../../tools/admins/dist/registerUser').main;
const api = require('../../organs/keypair/api/dist/index.js');

var rsa = new RSA();
var crypt = new Crypt();

const generateKeyPair = () => {
  return new Promise((resolve) => {
    rsa.generateKeyPair(resolve);
  });
};

var user;

beforeAll( async () => {
  const username = (Math.random() * 420).toString();
  await registerUser(username);
  const wallet = fs.readFileSync(path.join(__dirname, `../../wallet/${username}.id`), {encoding: 'utf8'});
  user = { username, wallet: JSON.parse(wallet) };
});

it('Should share a keypair', async () => {
  var isError = false;
  const keypair = await generateKeyPair();
  const keypair2 = await generateKeyPair();
  const myEncryptedKeyPair = crypt.encrypt(keypair.publicKey, keypair2);
  const sharedKeypair = await api.share({
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
