import React, { useState, useEffect, useCallback } from 'react';
import { Edit2, Trash2, Tag } from 'lucide-react';
import type { Categoria } from '../types/produto';
import { categoriaService } from '../services/categoriaService';
import CategoriaForm from './CategoriaForm';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';

interface CategoriaListProps {
  searchTerm: string;
  onCategoriaChange?: () => Promise<void>;
}

const CategoriaList: React.FC<CategoriaListProps> = ({ searchTerm, onCategoriaChange }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | undefined>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingCategoria, setDeletingCategoria] = useState<Categoria | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadCategorias = useCallback(async () => {
    try {
      const data = await categoriaService.getAllCategorias(searchTerm || undefined);
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      setToast({ message: 'Erro ao carregar categorias', type: 'error' });
    }
  }, [searchTerm]);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);



  const handleSave = async (categoriaData: { nome?: string; descricao?: string }) => {
    setIsLoading(true);
    try {
      if (editingCategoria) {
        await categoriaService.updateCategoria(editingCategoria.id, categoriaData);
        setToast({ message: 'Categoria atualizada com sucesso!', type: 'success' });
      } else {
        await categoriaService.createCategoria(categoriaData as { nome: string; descricao?: string });
        setToast({ message: 'Categoria criada com sucesso!', type: 'success' });
      }
      
      setShowForm(false);
      setEditingCategoria(undefined);
      loadCategorias();
      if (onCategoriaChange) {
        onCategoriaChange();
      }
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setToast({ message: 'Erro ao salvar categoria', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategoria) return;
    
    setIsLoading(true);
    try {
      await categoriaService.deleteCategoria(deletingCategoria.id);
      setToast({ message: 'Categoria excluída com sucesso!', type: 'success' });
      setShowDeleteDialog(false);
      setDeletingCategoria(undefined);
      loadCategorias();
      if (onCategoriaChange) {
        onCategoriaChange();
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      setToast({ message: 'Erro ao excluir categoria. Verifique se não há produtos vinculados.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setShowForm(true);
  };

  const handleDeleteClick = (categoria: Categoria) => {
    setDeletingCategoria(categoria);
    setShowDeleteDialog(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCategoria(undefined);
  };

  return (
    <div className="categorias-container">

      {categorias.length === 0 ? (
        <div className="empty-state">
          <Tag size={48} />
          <h3>Nenhuma categoria cadastrada.</h3>
          <p>Use o botão "Nova Categoria" acima para criar sua primeira categoria.</p>
        </div>
      ) : (
        <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="categoria-card">
              <div className="categoria-header">
                <div className="categoria-icon">
                  <Tag size={20} />
                </div>
                <div className="categoria-actions">
                  <button
                    onClick={() => handleEdit(categoria)}
                    className="btn-icon btn-edit"
                    title="Editar categoria"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(categoria)}
                    className="btn-icon btn-delete"
                    title="Excluir categoria"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="categoria-content">
                <h3>{categoria.nome}</h3>
                {categoria.descricao && (
                  <p className="categoria-descricao">{categoria.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <CategoriaForm
          categoria={editingCategoria}
          onSave={handleSave}
          onCancel={handleCloseForm}
          isLoading={isLoading}
        />
      )}

      {showDeleteDialog && deletingCategoria && (
        <ConfirmDialog
          isOpen={showDeleteDialog}
          title="Excluir Categoria"
          message={`Tem certeza que deseja excluir a categoria "${deletingCategoria.nome}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteDialog(false);
            setDeletingCategoria(undefined);
          }}
          isLoading={isLoading}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default CategoriaList;