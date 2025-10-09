import { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
import './App.css';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import { produtoService } from './services/produtoService';
import type { Produto, CreateProdutoDto, UpdateProdutoDto } from './types/produto';

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | undefined>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadProdutos();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const loadProdutos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await produtoService.getAllProdutos();
      setProdutos(data);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduto = () => {
    setEditingProduto(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduto = (produto: Produto) => {
    setEditingProduto(produto);
    setIsFormOpen(true);
  };

  const handleSaveProduto = async (produtoData: CreateProdutoDto | UpdateProdutoDto) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingProduto) {
        const updatedProduto = await produtoService.updateProduto(editingProduto.id, produtoData);
        setProdutos(prev => 
          prev.map(p => p.id === editingProduto.id ? updatedProduto : p)
        );
        setToast({ type: 'success', message: 'Produto atualizado com sucesso!' });
      } else {
        const newProduto = await produtoService.createProduto(produtoData as CreateProdutoDto);
        setProdutos(prev => [...prev, newProduto]);
        setToast({ type: 'success', message: 'Produto criado com sucesso!' });
      }

      setIsFormOpen(false);
      setEditingProduto(undefined);
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      setError('Erro ao salvar produto. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduto = (id: number) => {
    setProdutoToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!produtoToDelete) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await produtoService.deleteProduto(produtoToDelete);
      setProdutos(prev => prev.filter(p => p.id !== produtoToDelete));
      setIsConfirmDialogOpen(false);
      setProdutoToDelete(null);
      setToast({ type: 'success', message: 'Produto excluído com sucesso!' });
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao deletar produto. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingProduto(undefined);
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setProdutoToDelete(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Package size={48} style={{ color: 'var(--primary-color)' }} />
          <h1 className="app-title">CRUD de Produtos Gerais</h1>
        </div>
        <p className="app-subtitle">
          Gerencie seu catálogo de produtos de forma simples e eficiente.
        </p>
        
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--danger-color)', 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
            <button 
              onClick={() => setError(null)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit', 
                marginLeft: '1rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        )}

        <button 
          onClick={handleCreateProduto}
          className="btn btn-primary"
          disabled={isLoading}
        >
          <Plus size={16} />
          Novo Produto
        </button>
      </header>

      <main>
        <ProdutoList
          produtos={produtos}
          onEdit={handleEditProduto}
          onDelete={handleDeleteProduto}
          isLoading={isLoading}
        />
      </main>

      {isFormOpen && (
        <ProdutoForm
          produto={editingProduto}
          onSave={handleSaveProduto}
          onCancel={handleCancelForm}
          isLoading={isSubmitting}
        />
      )}

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isSubmitting}
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App
