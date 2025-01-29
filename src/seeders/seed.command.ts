import { Command, CommandRunner } from 'nest-commander';
import { SeederService } from './initial-seeder.service';

@Command({ name: 'seed', description: 'Run seeders' })
export class SeederCommand extends CommandRunner {
  constructor(private readonly seederService: SeederService) {
    super();
  }

  async run(): Promise<void> {
    await this.seederService.seed();
  }
}
