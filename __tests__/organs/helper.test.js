const api = require('../../organs/helper/api/dist/index.js');

it.skip('Should get Contract and Gateway', async () => {
    const result = await api.getContractAndGateway({
        username: 'admin', 
        chaincode: 'helper', 
        contract: 'Helper'
    });
    expect(result.contract).toBeDefined();
    expect(result.contract.constructor.name).toBe('ContractImpl');
    expect(result.gateway).toBeDefined();
    expect(result.gateway.constructor.name).toBe('Gateway');
});
