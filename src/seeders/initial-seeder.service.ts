import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { listUsers, listVideos } from '../helpers/initialData.helper';
import { VideoService } from 'src/video/video.service';
import { FollowService } from 'src/follow/follow.service';
import { Follow } from 'src/enums/follow.enum';
import { LikeService } from 'src/like/like.service';
import { RankingService } from 'src/ranking/ranking.service';
import { UserData } from 'src/interfaces/user.interface';
import { Types } from 'mongoose';
import { ListVideosSeeders } from 'src/interfaces/video.interface';

@Injectable()
export class SeederService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private followService: FollowService,
    private likeService: LikeService,
    private rankingService: RankingService,
  ) {}

  private async createUsers(): Promise<UserData[]> {
    const userList = Promise.all(
      listUsers.map(async (data) => {
        const { user } = await this.userService.create(data);
        return user;
      }),
    );
    return userList;
  }

  private async createVideos(
    addedUsers: UserData[],
  ): Promise<ListVideosSeeders[]> {
    let count = 0;
    let key = 0;
    const videoList = [];

    for (let i = listUsers.length; i > 0; i--) {
      while (count < i) {
        const {
          video: { idVideo },
        } = await this.videoService.create({
          ...listVideos[key],
          idUser: new Types.ObjectId(addedUsers[i - 1].idUser.toString()),
        });
        videoList.push(idVideo);
        key++;
        count++;
      }
      count = 0;
    }
    return videoList;
  }

  private async createFollows(addedUsers: UserData[]): Promise<void> {
    let index = 1;
    let limit = addedUsers.length;
    let current = 0;

    while (current < addedUsers.length) {
      if (index !== limit) {
        for (let j = index; j < limit; j++) {
          await this.followService.create({
            idUser: new Types.ObjectId(addedUsers[current].idUser.toString()),
            idCreador: new Types.ObjectId(addedUsers[j].idUser.toString()),
            option: Follow.Adding,
          });
        }
        index++;
        current++;
      } else {
        index = 0;
        limit--;
      }
    }
  }

  private async createLikesAndRankings(
    addedUsers: UserData[],
    videoList: ListVideosSeeders[],
  ): Promise<void> {
    for (let i = 0; i < videoList.length; i++) {
      const limit = addedUsers.length + addedUsers.length / 2;
      const number = Math.floor(Math.random() * limit);

      if (number < addedUsers.length) {
        await this.likeService.create({
          idUser: new Types.ObjectId(addedUsers[number].idUser.toString()),
          idVideo: new Types.ObjectId(videoList[i].toString().toString()),
        });

        const { idRanking } = await this.videoService.findOne(
          videoList[i].toString(),
        );

        const information = {
          idUser: new Types.ObjectId(addedUsers[number].idUser.toString()),
          qualification: Math.floor(Math.random() * 5),
        };

        await this.rankingService.update(idRanking, information);
      }
    }
  }

  async seed(): Promise<void> {
    if (!(await this.userService.databaseSize())) {
      try {
        const addedUsers = await this.createUsers();
        const videoList = await this.createVideos(addedUsers);
        await this.createFollows(addedUsers);
        await this.createLikesAndRankings(addedUsers, videoList);
        console.log('Initial data loaded');
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    } else {
      console.log('Data is already loaded');
    }
  }
}
