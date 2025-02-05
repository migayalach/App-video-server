import { Module } from '@nestjs/common';
import { SeederService } from './initial-seeder.service';
import { SeederCommand } from './seed.command';
import { UserModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [UserModule, VideoModule],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
