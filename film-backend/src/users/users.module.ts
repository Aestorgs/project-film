import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entety';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// users module pour utiliser les controllers crée
@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
