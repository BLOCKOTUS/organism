const registerUser = require('../../tools/admins/registerUser').main;

const username = (Math.random() * 420).toString();

it('Should create a wallet', async () => {
    var isError = false;
    const user = await registerUser(username).catch(e => isError = true);
    expect(user).toBeTruthy();
    expect(isError).toBeFalsy();

});

it('Should not be able to create a wallet with the same username', async () => {
    var isError = false;
    await registerUser(username).catch(e => isError = true);
    expect(isError).toBeTruthy();
});
