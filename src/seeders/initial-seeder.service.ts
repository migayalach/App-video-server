import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class SeederService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed() {
    const existingUsers = await this.userModel.countDocuments();
    if (existingUsers === 0) {
      const users = [
        {
          name: 'Patito',
          email: 'nena@gmail.com',
          password: await bcrypt.hash('password123', 10),
        },
        {
          name: 'Nicolas',
          email: 'nicolas@gmail.com',
          password: await bcrypt.hash('password123', 10),
        },
        {
          name: 'Pipocas',
          email: 'pipocas@gmail.com',
          password: await bcrypt.hash('password123', 10),
        },
        {
          name: 'Pelucas',
          email: 'pelucas@gmail.com',
          password: await bcrypt.hash('password123', 10),
        },
      ];

      try {
        await this.userModel.insertMany(users);
        // console.log('Datos iniciales cargados');
      } catch (error) {
        console.error('Error al cargar los datos iniciales:', error);
      }
    } else {
      // console.log('Los datos ya están cargados');
    }
  }
}
