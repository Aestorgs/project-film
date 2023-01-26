import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favoris } from '../entities/favoris.entity';
import { Repository } from 'typeorm';
import { CreateFavorisDto } from './dto/favoris.dto';

// favoris service pour crée les fonctions
@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favoris) private readonly favoris: Repository<Favoris>,
  ) {}

  // cette fonction pour crée un favoris
  createFavoris(createFavorisDto: CreateFavorisDto) {
    const favoris = this.favoris.create(createFavorisDto);
    return this.favoris.save(favoris);
  }

  // cette fonction pour suprimer un film
  async deleteFavoris(id: number) {
    return this.favoris.delete(id);
  }
}
