import React from 'react';
import { Edit2, Trash2, Tag } from 'lucide-react';
import type { Categoria } from '../types';

interface CategoriaListProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  categorias,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando categorias...</p>
      </div>
    );
  }

  if (categorias.length === 0) {
    return (
      <div className="empty-state">
        <Tag size={64} />
        <h3>Nenhuma categoria cadastrada.</h3>
        <p>Use o botão "Nova Categoria" acima para criar sua primeira categoria.</p>
      </div>
    );
  }

  return (
    <div className="categoria-grid">
      {categorias.map((categoria) => (
        <div key={categoria.id} className="categoria-card">
          <div className="categoria-header">
            <div className="categoria-icon">
              <Tag size={20} />
            </div>
            <div className="categoria-actions">
              <button
                onClick={() => onEdit(categoria)}
                className="btn-icon btn-edit"
                title="Editar categoria"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(categoria.id)}
                className="btn-icon btn-delete"
                title="Excluir categoria"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="categoria-content">
            <h3 className="categoria-title">{categoria.nome}</h3>
            {categoria.descricao && (
              <div className="categoria-description-container">
                <span className="description-label">Descrição:</span>
                <p className="categoria-description">{categoria.descricao}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriaList;