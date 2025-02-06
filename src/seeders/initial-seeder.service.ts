import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { listUsers, listVideos } from '../helpers/initialData.helper';
import { VideoService } from 'src/video/video.service';
import { FollowService } from 'src/follow/follow.service';
import { Follow } from 'src/enums/follow.enum';

@Injectable()
export class SeederService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
    private followService: FollowService,
  ) {}

  // private name(params: any) {}

  async seed() {
    if (!(await this.userService.databaseSize())) {
      try {
        console.log('*****************************************');
        const addedUsers = await Promise.all(
          listUsers.map(async (data) => {
            const { user } = await this.userService.create(data);
            return user;
          }),
        );

        console.log('*****************************************');
        let count = 0;
        let key = 0;
        for (let i = listUsers.length; i > 0; i--) {
          while (count < i) {
            await this.videoService.create({
              ...listVideos[key],
              idUser: addedUsers[i - 1].idUser,
            });
            key++;
            count++;
          }
          count = 0;
        }

        console.log('*****************************************');
        let index = 1;
        let limit = listUsers.length;
        let current = 0;
        while (current < listUsers.length) {
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
        // console.log('Datos iniciales cargados');
      } catch (error) {
        console.error('Error al cargar los datos iniciales:', error);
      }
    } else {
      // console.log('Los datos ya están cargados');
    }
  }
}
