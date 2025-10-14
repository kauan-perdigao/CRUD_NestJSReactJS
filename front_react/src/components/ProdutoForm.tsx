import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Produto, CreateProdutoDto, UpdateProdutoDto, Categoria } from '../types/produto';
import { categoriaService } from '../services/categoriaService';

interface ProdutoFormProps {
  produto?: Produto;
  onSave: (produto: CreateProdutoDto | UpdateProdutoDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({
  produto,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: 0,
    categoriaId: 0,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        descricao: produto.descricao || '',
        preco: produto.preco,
        categoriaId: produto.categoriaId || 0,
      });
    }
  }, [produto]);

  const loadCategorias = async () => {
    try {
      const data = await categoriaService.getAllCategoriasSimple();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!formData.categoriaId) {
      setFormError('Por favor, selecione uma categoria.');
      return;
    }
    
    onSave({
      ...formData,
      preco: Number(formData.preco),
      categoriaId: formData.categoriaId,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoriaId' ? (value ? Number(value) : 0) : value,
    }));
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2>{produto ? 'Editar Produto' : 'Novo Produto'}</h2>
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoriaId">Categoria *</label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formData.categoriaId || ''}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço (R$) *</label>
            <input
              type="number"
              id="preco"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={isLoading}
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

export default ProdutoForm;