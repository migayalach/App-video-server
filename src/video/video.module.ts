import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { UserModule } from 'src/user/user.module';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    UserModule,
    RankingModule,
  ],
  exports: [VideoService],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
