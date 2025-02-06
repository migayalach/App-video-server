import { Module } from '@nestjs/common';
import { SeederService } from './initial-seeder.service';
import { SeederCommand } from './seed.command';
import { UserModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';
import { FollowModule } from 'src/follow/follow.module';
import { LikeModule } from 'src/like/like.module';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  imports: [UserModule, VideoModule, FollowModule, LikeModule, RankingModule],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
