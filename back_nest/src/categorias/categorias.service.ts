import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { PaginatedResponse, CategoriaFilters } from '../interfaces/pagination.interface';

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

  async findAll(filters: CategoriaFilters = {}): Promise<PaginatedResponse<Categoria>> {
    const { search, page = 1, limit = 10 } = filters;
    
    const shouldPaginate = page !== undefined || limit !== undefined;
    
    const query = this.repo.createQueryBuilder('categoria');
    
    if (search) {
      query.where(
        'categoria.nome ILIKE :search OR categoria.descricao ILIKE :search',
        { search: `%${search}%` }
      );
    }
    
    const totalItems = await query.getCount();
    
    if (shouldPaginate) {
      const skip = (page - 1) * limit;
      query.skip(skip).take(limit);
    }
    
    const data = await query.getMany();
    
    return {
      data,
      total: totalItems,
      page: shouldPaginate ? page : 1,
      limit: shouldPaginate ? limit : totalItems,
      totalPages: shouldPaginate ? Math.ceil(totalItems / limit) : 1
    };
  }

  async findAllSimple(search?: string): Promise<Categoria[]> {
    const result = await this.findAll({ search });
    return result.data;
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
