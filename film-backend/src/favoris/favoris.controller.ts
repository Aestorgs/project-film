import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { CreateFavorisDto } from './dto/favoris.dto';

// favoris controller pour utiliser les routes
@Controller('favoris')
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  // cette route pour ajouter un film en favoris
  @Post('shows')
  @UsePipes(ValidationPipe)
  postFavoris(@Body() createFavorisDto: CreateFavorisDto) {
    return this.favorisService.createFavoris(createFavorisDto);
  }
  // cette route pour suprimer un film en favoris
  @Delete(':id')
  getDeleteFavoris(@Param('id', ParseIntPipe) id: number) {
    return this.favorisService.deleteFavoris(id);
  }
}
