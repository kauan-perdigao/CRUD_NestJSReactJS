import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Categoria } from '../types/produto';

interface CreateCategoriaDto {
  nome: string;
  descricao?: string;
}

interface UpdateCategoriaDto {
  nome?: string;
  descricao?: string;
}

interface CategoriaFormProps {
  categoria?: Categoria;
  onSave: (categoria: CreateCategoriaDto | UpdateCategoriaDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  categoria,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome,
        descricao: categoria.descricao || '',
      });
    }
  }, [categoria]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!formData.nome.trim()) {
      setFormError('Por favor, informe o nome da categoria.');
      return;
    }
    
    onSave({
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim() || undefined,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{categoria ? 'Editar Categoria' : 'Nova Categoria'}</h2>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn-icon"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          {formError && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--danger-color)', 
              padding: '0.75rem', 
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {formError}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="nome">Nome *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              disabled={isLoading}
              maxLength={200}
              placeholder="Ex: Eletrônicos, Roupas, Casa..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
              placeholder="Descrição opcional da categoria..."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              <Save size={16} />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;