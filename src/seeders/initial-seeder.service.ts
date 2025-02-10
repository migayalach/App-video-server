import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { listUsers, listVideos } from '../helpers/initialData.helper';
import { VideoService } from 'src/video/video.service';
import { FollowService } from 'src/follow/follow.service';
import { Follow } from 'src/enums/follow.enum';
import { LikeService } from 'src/like/like.service';
import { RankingService } from 'src/ranking/ranking.service';

@Injectable()
export class SeederService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private followService: FollowService,
    private likeService: LikeService,
    private rankingService: RankingService,
  ) {}

  private async createUsers() {
    return Promise.all(
      listUsers.map(async (data) => {
        const { user } = await this.userService.create(data);
        return user;
      }),
    );
  }

  private async createVideos(addedUsers: any[]) {
    let count = 0;
    let key = 0;
    const videoList = [];

    for (let i = listUsers.length; i > 0; i--) {
      while (count < i) {
        const {
          video: { idVideo },
        } = await this.videoService.create({
          ...listVideos[key],
          idUser: addedUsers[i - 1].idUser,
        });
        videoList.push(idVideo);
        key++;
        count++;
      }
      count = 0;
    }
    return videoList;
  }

  private async createFollows(addedUsers: any[]) {
    let index = 1;
    let limit = addedUsers.length;
    let current = 0;

    while (current < addedUsers.length) {
      if (index !== limit) {
        for (let j = index; j < limit; j++) {
          await this.followService.create({
            idUser: addedUsers[current].idUser,
            idCreador: addedUsers[j].idUser,
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

  private async createLikesAndRankings(addedUsers: any[], videoList: any[]) {
    for (let i = 0; i < videoList.length; i++) {
      const limit = addedUsers.length + addedUsers.length / 2;
      const number = Math.floor(Math.random() * limit);

      if (number < addedUsers.length) {
        await this.likeService.create({
          idUser: addedUsers[number].idUser,
          idVideo: videoList[i],
        });

        const { idRanking } = await this.videoService.findOne(videoList[i]);
        const information = {
          idUser: addedUsers[number].idUser,
          qualification: Math.floor(Math.random() * 5),
        };
        await this.rankingService.update(idRanking, information);
      }
    }
  }
  async seed() {
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
