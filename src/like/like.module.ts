import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [UserModule, VideoModule],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
