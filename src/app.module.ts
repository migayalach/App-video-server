import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserMiddleware } from './user/user.middleware';
import { VideoModule } from './video/video.module';
import { VideoMiddleware } from './video/video.middleware';
import { LikeModule } from './like/like.module';
import { LikeMiddleware } from './like/like.middleware';
import { FollowModule } from './follow/follow.module';
import { FollowMiddleware } from './follow/follow.middleware';
import { AuthModule } from './auth/auth.module';
import { SignModule } from './sign/sign.module';
import { SeederModule } from './seeders/seed.module.module';
import { DownloadModule } from './download/download.module';
import { AuditModule } from './audit/audit.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/appVideo'),
    UserModule,
    VideoModule,
    LikeModule,
    FollowModule,
    AuthModule,
    SignModule,
    SeederModule,
    DownloadModule,
    AuditModule,
    RankingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({ path: 'user', method: RequestMethod.GET })
      .forRoutes('user');
    consumer
      .apply(VideoMiddleware)
      .exclude({ path: 'video', method: RequestMethod.GET })
      .forRoutes('video');
    consumer
      .apply(LikeMiddleware)
      .exclude({ path: 'like', method: RequestMethod.GET })
      .forRoutes('like');
    consumer
      .apply(FollowMiddleware)
      .exclude({ path: 'follow', method: RequestMethod.GET })
      .forRoutes('follow');
  }
}
