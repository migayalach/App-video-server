import { VideoDelete } from 'src/enums/video.enum';

export interface VideoQuery {
  isDelete: { $ne: VideoDelete };
  dateCreate?: {
    $gte?: Date;
    $lte?: Date;
  };
}
