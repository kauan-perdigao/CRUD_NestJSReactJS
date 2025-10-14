export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  categoriaId?: number;
  categoria?: Categoria;
}

export interface CreateProdutoDto {
  nome: string;
  descricao?: string;
  preco: number;
  categoriaId: number;
}

export interface UpdateProdutoDto {
  nome?: string;
  descricao?: string;
  preco?: number;
  categoriaId?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProdutoFilters {
  search?: string;
  categoriaId?: number;
  page?: number;
  limit?: number;
}

export interface CategoriaFilters {
  search?: string;
  page?: number;
  limit?: number;
}