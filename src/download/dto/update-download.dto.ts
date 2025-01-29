import { PartialType } from '@nestjs/swagger';
import { CreateDownloadDto } from './create-download.dto';

export class UpdateDownloadDto extends PartialType(CreateDownloadDto) {}
