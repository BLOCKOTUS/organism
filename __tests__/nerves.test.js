const axios = require('axios');
const crypto = require('crypto');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

const NERVES_URL = 'http://localhost:3000';
var users = [];
var crypt = new Crypt();
var rsa = new RSA();

const baseIdentity = {
  firstname: 'John',
  lastname: 'Smith',
  birthdate: '1990-02-23',
  nation: 'UdS',
  nationalId: `8d98${Math.random() * 999}`,
}

const uniqueHashFromIdentity = identity =>
    crypto
        .createHash('md5')
        .update(`${identity.nation}-${identity.nationalId}-${identity.birthdate}`)
        .digest('hex');

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
  });
};

const createUser = async () => {
  const username = (Math.random() * 420).toString();
  const keypair = await generateKeyPair();

  const options = {
    method: 'POST',
    url: `${NERVES_URL}/user`,
    data: {
      username: username,
      publicKey: keypair.publicKey,
    },
  };
  
  const user = await request(options);
  return { ...user.data, keypair, username };
};

const createIdentity = async () => {
  const encryptedIdentity = crypt.encrypt(users[0].keypair.publicKey, JSON.stringify(baseIdentity));
  const options = {
    username: users[0].username,
    wallet: users[0].wallet,
    method: 'POST',
    url: `${NERVES_URL}/identity`,
    data: {
      encryptedIdentity,
      uniqueHash: uniqueHashFromIdentity(baseIdentity)
    },
  };
  
  const identity = await request(options);
  return identity.data;
};

const getIdentity = async (identityId) => {
  const options = {
    username: users[1].username,
    wallet: users[1].wallet,
    method: 'GET',
    url: `${NERVES_URL}/identity`,
    params: {
      identityId,
    },
  };
  
  const identity = await request(options);
  return identity.data;
};

const createJob = async () => {
  const options = {
    username: users[0].username,
    wallet: users[0].wallet,
    method: 'POST',
    url: `${NERVES_URL}/job`,
    data: {
      type: 'confirmation',
      data: {},
      chaincode: 'identity',
      key: 'identityKey',
    },
  };
  
  const job = await request(options);
  return job.data;
};

const createSharedKeypair = async () => {
  const keypair = await generateKeyPair();
  const myEncryptedKeyPair = crypt.encrypt(users[0].keypair.publicKey, keypair);
  const options = {
    username: users[0].username,
    wallet: users[0].wallet,
    method: 'POST',
    url: `${NERVES_URL}/keypair`,
    data: {
      sharedWith: {},
      groupId: 'anyGroupId',
      myEncryptedKeyPair,
      type: 'job',
    },
  };
  
  const sharedKeypair = await request(options);
  return sharedKeypair.data;
};

const listJobs = async () => {
  const options = {
    username: users[1].username,
    wallet: users[1].wallet,
    method: 'GET',
    url: `${NERVES_URL}/job/list`,
    params: {
      status: 'pending'
    },
  };
  
  const jobList = await request(options);
  return jobList.data;
};

const completeJob = async ({ jobId }) => {
  const options = {
    username: users[1].username,
    wallet: users[1].wallet,
    method: 'POST',
    url: `${NERVES_URL}/job/complete`,
    data: {
      jobId,
      result: 1,
    },
  };
  
  const completion = await request(options);
  return completion.data;
};

beforeAll(() => {
  // create 3 users
  var promises = [createUser(), createUser(), createUser()];
  return Promise.all(promises).then(result => users = result);
});
  
it('Should create a user', async () => {
  const user = await createUser();
  expect(user.success).toBeTruthy();
  expect(user.id).toBeDefined();
  expect(user.wallet).toBeDefined();
});

it('Should create an identity', async () => {
  const identity = await createIdentity();
  expect(identity.success).toBeTruthy();
});

it('Should get an identity', async () => {
  const identity = await getIdentity(users[0].id);
  expect(identity.success).toBeTruthy();
});

it('Should not find the identity', async () => {
  const identity = await getIdentity(users[1].id);
  expect(identity.success).toBeFalsy();
});

it('Should create a job', async () => {
  const job = await createJob();
  expect(job.success).toBeTruthy();
  expect(job.jobId).toBeDefined();
  expect(job.workersIds.length).toBeGreaterThan(0);
});

it('Should create a shared keypair', async () => {
  const sharedKeypair = await createSharedKeypair();
  expect(sharedKeypair.success).toBeTruthy();
});

it('Should list jobs', async () => {
  const jobList = await listJobs();
  expect(jobList.success).toBeTruthy();
  expect(Array.isArray(jobList.list)).toBeTruthy();
});

it('Should complete job', () => {
  // it is not straight forward 
  // either we assume the database is empty before running tests, and we can guess who has a job assigned
  // either we cannot guess who has a job assigned, and so, test the completion function
});

it('Should not complete job', async () => {
  const completion = await completeJob({ jobId: 'unknown' });
  expect(completion.success).toBeFalsy();
});
