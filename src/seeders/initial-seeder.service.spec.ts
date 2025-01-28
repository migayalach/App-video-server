import { Test, TestingModule } from '@nestjs/testing';
import { InitialSeederService } from './initial-seeder.service';

describe('InitialSeederService', () => {
  let service: InitialSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitialSeederService],
    }).compile();

    service = module.get<InitialSeederService>(InitialSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
