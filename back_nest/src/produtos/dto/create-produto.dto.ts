import { IsNotEmpty, IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class CreateProdutoDto {
	@IsNotEmpty()
	@IsString()
	nome: string;

	@IsOptional()
	@IsString()
	descricao?: string;

	@IsNotEmpty()
	@IsNumber()
	preco: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	estoque?: number;

	@IsNotEmpty()
	@IsNumber()
	categoriaId: number;
}
