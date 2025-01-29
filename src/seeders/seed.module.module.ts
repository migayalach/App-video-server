import { Module } from '@nestjs/common';
import { SeederService } from './initial-seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { SeederCommand } from './seed.command';
import { Video, VideoSchema } from 'src/video/schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
