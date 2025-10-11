import React from 'react';
import { Edit, Trash2, Package } from 'lucide-react';
import type { Produto } from '../types/produto';

interface ProdutoListProps {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const ProdutoList: React.FC<ProdutoListProps> = ({
  produtos,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className="empty-state">
        <Package size={64} />
        <h3>Nenhum produto cadastrado.</h3>
        <p>Use o botão "Novo Produto" acima para criar seu primeiro produto.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {produtos.map((produto) => {
        return (
          <div key={produto.id} className="product-card">
            <div className="product-header">
              <h3 className="product-title">{produto.nome}</h3>
              <div className="product-actions">
                <button
                  onClick={() => onEdit(produto)}
                  className="btn-icon btn-edit"
                  title="Editar produto"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(produto.id)}
                  className="btn-icon btn-delete"
                  title="Excluir produto"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {produto.descricao && (
              <p className="product-description">{produto.descricao}</p>
            )}

            <div className="product-details">
              <div className="product-category">
                <span className="category-label">Categoria:</span>
                {produto.categoria ? (
                  <span className="category-value">{produto.categoria.nome}</span>
                ) : (
                  <span className="category-value-null">Sem categoria</span>
                )}
              </div>
              
              <div className="product-price">
                <span className="price-label">Preço:</span>
                <span className="price-value">{formatPrice(produto.preco)}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProdutoList;