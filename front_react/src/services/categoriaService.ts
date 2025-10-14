import axios from 'axios';
import type { Categoria, PaginatedResponse, CategoriaFilters } from '../types/produto';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const categoriaService = {
  // Listar todas as categorias com paginação
  async getAllCategorias(filters: CategoriaFilters = {}): Promise<PaginatedResponse<Categoria>> {
    const params: Record<string, string> = {};
    
    if (filters.search) params.search = filters.search;
    if (filters.page) params.page = filters.page.toString();
    if (filters.limit) params.limit = filters.limit.toString();
    
    const response = await api.get('/categorias', { params });
    return response.data;
  },

  // Listar todas as categorias (formato simples para dropdowns)
  async getAllCategoriasSimple(search?: string): Promise<Categoria[]> {
    const params = search ? { search } : {};
    const response = await api.get('/categorias/simple/all', { params });
    return response.data;
  },

  // Buscar categoria por ID
  async getCategoriaById(id: number): Promise<Categoria> {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  // Criar nova categoria
  async createCategoria(categoria: Omit<Categoria, 'id'>): Promise<Categoria> {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  // Atualizar categoria
  async updateCategoria(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    const response = await api.patch(`/categorias/${id}`, categoria);
    return response.data;
  },

  // Deletar categoria
  async deleteCategoria(id: number): Promise<void> {
    await api.delete(`/categorias/${id}`);
  },
};