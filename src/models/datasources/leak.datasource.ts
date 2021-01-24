import { getRepository, Repository } from 'typeorm';
import { LeakEntity } from '../entities/leak.entity';

export class LeakDatasource {
  private repository: Repository<LeakEntity>;

  constructor() {
    const repository = getRepository(LeakEntity);
    this.repository = repository;
  }

  public async findOneByCPF(cpf: string): Promise<LeakEntity | null> {
    const leak = await this.repository.findOne({ cpf });
    if (!leak) {
      return new LeakEntity();
    }

    return leak;
  }
}
