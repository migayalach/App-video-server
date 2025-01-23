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
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/appVideo'),
    UserModule,
    VideoModule,
    LikeModule,
    FollowModule,
    LoginModule,
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
