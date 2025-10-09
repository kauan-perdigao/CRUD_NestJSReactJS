import axios from 'axios';
import type { Produto, CreateProdutoDto, UpdateProdutoDto } from '../types/produto';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const produtoService = {
  // Listar todos os produtos
  async getAllProdutos(): Promise<Produto[]> {
    const response = await api.get('/produtos');
    return response.data;
  },

  // Buscar produto por ID
  async getProdutoById(id: number): Promise<Produto> {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  },

  // Criar novo produto
  async createProduto(produto: CreateProdutoDto): Promise<Produto> {
    const response = await api.post('/produtos', produto);
    return response.data;
  },

  // Atualizar produto
  async updateProduto(id: number, produto: UpdateProdutoDto): Promise<Produto> {
    const response = await api.put(`/produtos/${id}`, produto);
    return response.data;
  },

  // Deletar produto
  async deleteProduto(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },
};