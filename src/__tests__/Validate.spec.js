const request = require('supertest');

const app = require('../server');

describe('EWally Unit Test - bank bonds and concessionaire payments', () => {
  it('should be able to validate bank bonds', async () => {
    const line = '34191093217220104303024750000002388540000033320';
    const response = await request(app).get(`/boleto/${line}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        barCode: expect.any(String),
        amount: expect.any(String),
        expirationDate: expect.any(String),
      }),
    );
  });

  it('should be able to validate concessionaire payments', async () => {
    const line = '836600000050066300470003000000002303147403220089';
    const response = await request(app).get(`/boleto/${line}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        barCode: expect.any(String),
        amount: expect.any(String),
      }),
    );
  });

  it('should throw an error if has letters in typeable line', async () => {
    const line = '836A00000050066300470003000000002303147403220089';
    const response = await request(app).get(`/boleto/${line}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Linha Digitavel inválida');
  });

  it('should throw an error if invalid verifier digit module 10', async () => {
    const line = '24191096363478638719042686080005789560000028913';
    const response = await request(app).get(`/boleto/${line}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual(
      'Digito Verificador inválido Modulo 10',
    );
  });

  it('should throw an error if invalid verifier digit module 11', async () => {
    const line = '34191096363478638719042686080005759560000028913';
    const response = await request(app).get(`/boleto/${line}`);

    expect(response).toBeTruthy();
    expect(response.status).toBe(400);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual(
      'Digito Verificador inválido Modulo 11',
    );
  });
});
