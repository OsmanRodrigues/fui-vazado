import { getRepository, Repository } from 'typeorm';
import { LeakEntity } from '../entities/leak.entity';

export class LeakDatasource {
  private repository: Repository<LeakEntity>;

  constructor() {
    const repository = getRepository(LeakEntity);
    this.repository = repository;
  }

  public async findOneByCPF(cpf: string): Promise<LeakEntity> {
    const leak = await this.repository.findOne({ cpf });

    if (!leak) {
      throw new Error(' aasd');
    }

    return leak;
  }
}
