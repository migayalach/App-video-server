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
import { FiltersModule } from './filters/filters.module';
import { SignMiddleware } from './sign/sign.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuditMiddleware } from './audit/audit.middleware';
import { RankingMiddleware } from './ranking/ranking.middleware';
import { DownloadMiddleware } from './download/download.middleware';
import { FiltersMiddleware } from './filters/filters.middleware';
import { MyVideosModule } from './my-videos/my-videos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DB_CONNECTION_DEPLOY || process.env.DB_CONNECTION_LOCAL,
    ),
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
    FiltersModule,
    MyVideosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignMiddleware).forRoutes('sign');
    consumer
      .apply(UserMiddleware)
      .exclude({ path: 'user', method: RequestMethod.GET })
      .forRoutes('user');
    consumer.apply(AuthMiddleware).forRoutes('auth');
    consumer
      .apply(VideoMiddleware)
      .exclude({ path: 'video', method: RequestMethod.GET })
      .forRoutes('video');
    consumer.apply(AuditMiddleware).forRoutes('audit');
    consumer
      .apply(FollowMiddleware)
      .exclude({ path: 'follow', method: RequestMethod.GET })
      .forRoutes('follow');
    consumer
      .apply(LikeMiddleware)
      .exclude({ path: 'like', method: RequestMethod.GET })
      .forRoutes('like');
    consumer.apply(RankingMiddleware).forRoutes('ranking');
    consumer.apply(DownloadMiddleware).forRoutes('download');
    consumer.apply(FiltersMiddleware).forRoutes('filters');
  }
}
