import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

// users controller pour utiliser les routes
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // cette route pour ajouter un l'utilisateur
  @Post('register')
  @UsePipes(ValidationPipe)
  postUsers(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.createUsers(createUserDto);
  }

  // cette route pour ce connecter à l'utilisateur
  @Post('login')
  @HttpCode(200)
  loginUsers(@Body() users: any) {
    return this.usersService.loginUsers(users.email, users.password);
  }

  // cette route pour afficher utilisateur avec c'est favoris
  @Get('favoris/:id')
  getUsersFavoris(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findByFavorisId(id);
  }
}
