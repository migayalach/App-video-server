import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // SI EL EMAIL YA EXISTE ROMPER
  // SI PASA ALGO EXTRA ROMPER
  async create(infoUser: CreateUserDto): Promise<User> {
    infoUser = {
      ...infoUser,
      password: await bcrypt.hash(infoUser.password, 10),
    };
    const createUser = new this.userModel(infoUser);
    return await createUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return { a: `This action updates a #${id} user`, b: updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
