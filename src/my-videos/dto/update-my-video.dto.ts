import { PartialType } from '@nestjs/swagger';
import { CreateMyVideoDto } from './create-my-video.dto';

export class UpdateMyVideoDto extends PartialType(CreateMyVideoDto) {}
