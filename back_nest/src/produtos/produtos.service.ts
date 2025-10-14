import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { PaginatedResponse, ProdutoFilters } from '../interfaces/pagination.interface';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const produto = this.repo.create(createProdutoDto as any);
    return this.repo.save(produto);
  }

  async findAll(filters: ProdutoFilters = {}): Promise<PaginatedResponse<Produto>> {
    const { search, categoriaId, page = 1, limit = 10 } = filters;
    
    const queryBuilder = this.repo.createQueryBuilder('produto')
      .leftJoinAndSelect('produto.categoria', 'categoria');

    if (search) {
      queryBuilder.where('produto.nome ILIKE :search', { search: `%${search}%` });
    }

    if (categoriaId) {
      queryBuilder.andWhere('produto.categoriaId = :categoriaId', { categoriaId });
    }

    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    queryBuilder.orderBy('produto.id', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: number) {
    const produto = await this.repo.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!produto) throw new NotFoundException(`Produto ${id} not found`);
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produto = await this.findOne(id);
    Object.assign(produto, updateProdutoDto as any);
    return this.repo.save(produto);
  }

  async remove(id: number) {
    const produto = await this.findOne(id);
    return this.repo.remove(produto);
  }
}
