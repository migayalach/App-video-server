import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SignController],
  providers: [SignService],
})
export class SignModule {}
