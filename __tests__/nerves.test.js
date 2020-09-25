const axios = require('axios');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

const NERVES_URL = 'http://localhost:3000';
var users = [];
var crypt = new Crypt();
var rsa = new RSA();

const request = ({
  username = '',
  wallet = '',
  method,
  url,
  data = {},
  params = {},
}) => {
  const options = {
    url,
    data,
    params: params,
    method,
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${JSON.stringify(wallet)}`)}`,
    },
  };

  return axios(options);
};

const generateKeyPair = () => {
  return new Promise((resolve) => {
      rsa.generateKeyPair(resolve);
  })
}

const createUser = async () => {
  const username = Math.random() * 420;
  const keypair = await generateKeyPair();

  const options = {
    method: 'POST',
    url: `${NERVES_URL}/user`,
    data: {
      username: username.toString(),
      publicKey: keypair.publicKey,
    },
  };
  
  const user = await request(options);
  return user.data;
} 

beforeAll(() => {
  // create 3 users
  var promises = [createUser(), createUser(), createUser()];
  return Promise.all(promises);
});
  
it('Should create a user', async () => {
  const user = await createUser();
  expect(user.success).toBeTruthy();
  expect(user.id).toBeDefined();
  expect(user.wallet).toBeDefined();
});

it('Should create an identity', () => {

});

it('Should get an identity', () => {

});

it('Should create a job', () => {

});

it('Should create a shared keypair', () => {

});

it('Should list jobs', () => {

});

it('Should complete job', () => {

});