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