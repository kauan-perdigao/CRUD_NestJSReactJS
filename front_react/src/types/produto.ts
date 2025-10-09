export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
}

export interface CreateProdutoDto {
  nome: string;
  descricao?: string;
  preco: number;
}

export interface UpdateProdutoDto {
  nome?: string;
  descricao?: string;
  preco?: number;
}