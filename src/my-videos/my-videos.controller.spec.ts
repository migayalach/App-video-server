import { Test, TestingModule } from '@nestjs/testing';
import { MyVideosController } from './my-videos.controller';
import { MyVideosService } from './my-videos.service';

describe('MyVideosController', () => {
  let controller: MyVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyVideosController],
      providers: [MyVideosService],
    }).compile();

    controller = module.get<MyVideosController>(MyVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
