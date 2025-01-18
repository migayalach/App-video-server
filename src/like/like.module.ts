import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './schemas/like.schema';
import { UserModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [
    UserModule,
    VideoModule,
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
