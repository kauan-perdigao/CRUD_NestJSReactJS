import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoFilters } from './interfaces/pagination.interface';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('categoriaId') categoriaId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const filters: ProdutoFilters = {
      search,
      categoriaId: categoriaId ? +categoriaId : undefined,
      page: page ? +page : 1,
      limit: limit ? +limit : 10,
    };
    return this.produtosService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  /*@Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }*/

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}
