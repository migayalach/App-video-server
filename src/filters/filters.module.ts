import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Audit, AuditSchema } from 'src/audit/schemas/audit.schema';
import { Video, VideoSchema } from 'src/video/schemas/video.schema';
import { Ranking, RankingSchema } from 'src/ranking/schema/ranking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: Ranking.name, schema: RankingSchema }]),
  ],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
