import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    const categoria = this.repo.create(createCategoriaDto);
    return this.repo.save(categoria);
  }

  findAll(search?: string) {
    if (search) {
      return this.repo.find({
        where: [
          { nome: Like(`%${search}%`) },
          { descricao: Like(`%${search}%`) }
        ]
      });
    }
    return this.repo.find();
  }

  async findOne(id: number) {
    const categoria = await this.repo.findOneBy({ id });
    if (!categoria) throw new NotFoundException(`Categoria ${id} not found`);
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.repo.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return this.repo.remove(categoria);
  }
}
