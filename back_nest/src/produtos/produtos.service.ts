import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

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

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const produto = await this.repo.findOneBy({ id });
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
