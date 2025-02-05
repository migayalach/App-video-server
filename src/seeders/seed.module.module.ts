import { Module } from '@nestjs/common';
import { SeederService } from './initial-seeder.service';
import { SeederCommand } from './seed.command';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
