import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favoris } from '../entities/favoris.entity';

// favoris module pour utiliser les controllers crée
@Module({
  imports: [TypeOrmModule.forFeature([Favoris])],
  controllers: [FavorisController],
  providers: [FavorisService],
})
export class FavorisModule {}
