import '../../src/setup';
import app from '../../src/app';
import supertest from 'supertest';
import Address from '../../src/interfaces/Address';
import httpStatus from 'http-status';
import AddressDistance from '../../src/interfaces/AddressDistance';

describe('post/adresses', () => {
  it('Returns 422 if less than 2 addresses are provided', async () => {
    const adresses: Address[] = [
      {
        street: 'Rua Capitão Romualdo de Barros',
        city: 'Florianópolis',
        state: 'SC',
      },
    ];
    const result = await supertest(app).post('/addresses').send(adresses);
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Returns 422 no street info is provided', async () => {
    const adresses: Address[] = [
      {
        street: 'Rua Capitão Romualdo de Barros',
        city: 'Florianópolis',
        state: 'SC',
      },
      {
        street: '',
        city: 'Florianópolis',
        state: 'SC',
      },
    ];
    const result = await supertest(app).post('/addresses').send(adresses);
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('Returns 404 a unexistent address is provided', async () => {
    const adresses: Address[] = [
      {
        street: 'Rua Capitão Romualdo de Barros',
        city: 'Florianópolis',
        state: 'SC',
      },
      {
        street: 'fggsdfgdsfgds',
      },
    ];
    const result = await supertest(app).post('/addresses').send(adresses);
    expect(result.status).toBe(httpStatus.NOT_FOUND);
  });

  it('Returns 200 if valid data is provided', async () => {
    const adresses: Address[] = [
      {
        street: 'Rua Capitão Romualdo de Barros',
        city: 'Florianópolis',
        state: 'SC',
      },
      {
        street: 'Avenida Hercilio Luz',
        neighborhood: 'Centro',
        city: 'Florianópolis',
        state: 'SC',
      },
    ];
    const result = await supertest(app).post('/addresses').send(adresses);
    expect(result.status).toBe(httpStatus.OK);
    expect(result.body).toEqual({
      closestAddresses: expect.any(Object),
      farthestAddresses: expect.any(Object),
      otherDistances: expect.any(Array),
    });
  });
});
