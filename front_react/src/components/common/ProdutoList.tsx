import React from 'react';
import { Edit2, Trash2, Package } from 'lucide-react';
import type { Produto } from '../../types';

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
    <div className="produto-grid">
      {produtos.map((produto) => (
        <div key={produto.id} className="produto-card">
          <div className="produto-header">
            <div className="produto-icon">
              <Package size={20} />
            </div>
            <div className="produto-actions">
              <button
                onClick={() => onEdit(produto)}
                className="btn-icon btn-edit"
                title="Editar produto"
              >
                <Edit2 size={16} />
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
          
          <div className="produto-content">
            <h3 className="produto-title">{produto.nome}</h3>
            {produto.descricao && (
              <div className="produto-description-container">
                <span className="description-label">Descrição:</span>
                <p className="produto-description">{produto.descricao}</p>
              </div>
            )}
            
            <div className="produto-details">
              <div className="produto-category">
                <span className="category-label">Categoria:</span>
                {produto.categoria ? (
                  <span className="category-value">{produto.categoria.nome}</span>
                ) : (
                  <span className="category-value-null">Sem categoria</span>
                )}
              </div>
              
              <div className="produto-price">
                <span className="price-label">Preço:</span>
                <span className="price-value">{formatPrice(produto.preco)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProdutoList;