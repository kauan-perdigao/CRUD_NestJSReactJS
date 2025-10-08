export type Produto = {
  id?: number
  nome: string
  descricao?: string
  preco: number
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

async function request<T>(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return (await res.json()) as T
}

export const api = {
  listProdutos: () => request<Produto[]>('/produtos'),
  getProduto: (id: number) => request<Produto>(`/produtos/${id}`),
  createProduto: (p: Produto) => request<Produto>('/produtos', { method: 'POST', body: JSON.stringify(p) }),
  updateProduto: (id: number, p: Partial<Produto>) => request<Produto>(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(p) }),
  deleteProduto: (id: number) => request<void>(`/produtos/${id}`, { method: 'DELETE' }),
}
