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

  it.skip('should return 500 when there is any error other than validation error', async () => {
    //TODO think in a way to throw a 500
  });
});
