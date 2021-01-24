import { getRepository, Repository } from 'typeorm';
import { LeakEntity } from '../src/models/entities/leak.entity';
import { createLeakMock } from './mocks/leak.mock';

describe('LeakController - REST', () => {
  let repository: Repository<LeakEntity>;

  beforeEach(async () => {
    repository = getRepository(LeakEntity);
    await repository.delete({});
  });

  it('should return a leak successfully', async () => {
    const leak = await repository.save(createLeakMock());

    const response = await global.testRequest
      .post('/api/leak')
      .send({ cpf: leak.cpf });

    const { wasLeaked, leak: savedLeak } = response.body;

    expect(response.status).toBe(200);
    expect(wasLeaked).toEqual(true);
    expect(savedLeak).toEqual(leak);
  });

  it('should not return a leak if database has not data associated', async () => {
    await repository.save(createLeakMock({ cpf: '00000000000' }));

    const response = await global.testRequest
      .post('/api/leak')
      .send({ cpf: '11111111111' });

    const { wasLeaked, leak: savedLeak } = response.body;

    expect(response.status).toBe(200);
    expect(wasLeaked).toEqual(false);
    expect(savedLeak).toEqual({});
  });

  it('should return an error when passing an invalid cpf', async () => {
    const response = await global.testRequest.post('/api/leak').send();
    expect(response.body).toEqual({
      message: 'You have to pass a CPF',
      code: 400,
    });
  });
});
