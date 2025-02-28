import { Module } from '@nestjs/common';
import { MyVideosService } from './my-videos.service';
import { MyVideosController } from './my-videos.controller';

@Module({
  controllers: [MyVideosController],
  providers: [MyVideosService],
})
export class MyVideosModule {}
