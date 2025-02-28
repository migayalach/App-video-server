import { Test, TestingModule } from '@nestjs/testing';
import { MyVideosService } from './my-videos.service';

describe('MyVideosService', () => {
  let service: MyVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyVideosService],
    }).compile();

    service = module.get<MyVideosService>(MyVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
