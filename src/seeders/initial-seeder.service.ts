import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { listUsers, listVideos } from '../helpers/initialData.helper';

@Injectable()
export class SeederService {
  constructor(private userService: UserService) {}

  async seed() {
    if (!(await this.userService.databaseSize())) {
      try {
        const addedUsers = await Promise.all(
          listUsers.map(async (data) => {
            const { user } = await this.userService.create(data);
            return user;
          }),
        );

        for (let i = addedUsers.length; i > 0; i--) {
          // let count = listVideos.length;
          // for (let j = 0; j < count; j++) {
          //   console.log(count);
          // }
          // count--;
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
