import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entety';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

// users service pour crée les fonctions
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
  ) {}

  // cette fonction pour crée un utilisateur
  async createUsers(createUserDto: CreateUsersDto) {
    const users = this.users.create(createUserDto);
    users.password = await bcrypt.hash(users.password, 10);
    return this.users.save(users);
  }

  // cette fonction pour conneter un utilisateur
  async loginUsers(email: string, password: string) {
    const users = await this.users.findOne({
      select: ['id', 'password'],
      where: { email },
    });
    if (await bcrypt.compare(password, users.password))
      return { users: users.id };
    else
      throw new BadRequestException('erreur email or password', {
        cause: new Error(),
      });
  }

  // cette fonction pour afficher un utilisateur et c'est favoris
  findByFavorisId(id: number) {
    return this.users.findOne({
      relations: { favoris: true },
      where: { id },
    });
  }
}
