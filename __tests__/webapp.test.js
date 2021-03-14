/**
 * @jest-environment node
 */

const axios = require('axios');

const WEBAPP_URL = 'http://127.0.0.1:4201/';

it('Should connect to the webapp, status 200', async () => {
    const request = await axios.get(WEBAPP_URL);
    expect(request.status).toBe(200);
});
