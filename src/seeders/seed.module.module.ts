import { Module } from '@nestjs/common';
import { SeederService } from './initial-seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { SeederCommand } from './seed.command';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SeederService, SeederCommand],
  exports: [SeederService],
})
export class SeederModule {}
