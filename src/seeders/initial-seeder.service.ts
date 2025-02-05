import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { listUsers, listVideos } from '../helpers/initialData.helper';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class SeederService {
  constructor(
    private userService: UserService,
    private videoService: VideoService,
  ) {}

  async seed() {
    if (!(await this.userService.databaseSize())) {
      try {
        const addedUsers = await Promise.all(
          listUsers.map(async (data) => {
            const { user } = await this.userService.create(data);
            return user;
          }),
        );

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

        // console.log('Datos iniciales cargados');
      } catch (error) {
        console.error('Error al cargar los datos iniciales:', error);
      }
    } else {
      // console.log('Los datos ya están cargados');
    }
  }
}
