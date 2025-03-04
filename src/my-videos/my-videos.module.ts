import { Module } from '@nestjs/common';
import { MyVideosService } from './my-videos.service';
import { MyVideosController } from './my-videos.controller';
import { VideoModule } from 'src/video/video.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, VideoModule],
  controllers: [MyVideosController],
  providers: [MyVideosService],
})
export class MyVideosModule {}
