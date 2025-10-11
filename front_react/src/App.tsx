import { useState, useEffect, useCallback } from 'react';
import { Plus, Package, Tag } from 'lucide-react';
import './App.css';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { produtoService } from './services/produtoService';
import { categoriaService } from './services/categoriaService';
import type { Produto, CreateProdutoDto, UpdateProdutoDto, ProdutoFilters } from './types/produto';

function App() {
  const [activeTab, setActiveTab] = useState<'produtos' | 'categorias'>('produtos');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduto, setEditingProduto] = useState<Produto | undefined>();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showCategoriaForm, setShowCategoriaForm] = useState(false);
  const [categoriaListKey, setCategoriaListKey] = useState(0);
  
  // Estados para paginação e filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<ProdutoFilters>({
    page: 1,
    limit: 10,
  });
  
  // Estado para busca de categorias
  const [categoriaSearch, setCategoriaSearch] = useState('');

  const loadProdutos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await produtoService.getAllProdutos(filters);
      setProdutos(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.total);
      setCurrentPage(response.page);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCreateProduto = () => {
    setEditingProduto(undefined);
    setIsFormOpen(true);
  };

  const handleCreateCategoria = () => {
    setShowCategoriaForm(true);
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

  // Handlers para filtros e paginação
  const handleSearch = useCallback((search: string) => {
    setFilters(prev => ({
      ...prev,
      search: search || undefined,
      page: 1,
    }));
  }, []);



  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  }, []);

  const handleCategoriaSearch = useCallback((search: string) => {
    setCategoriaSearch(search);
  }, []);

  const handleSaveCategoria = async (categoriaData: { nome?: string; descricao?: string }) => {
    try {
      await categoriaService.createCategoria(categoriaData as { nome: string; descricao?: string });
      setShowCategoriaForm(false);
      setToast({ type: 'success', message: 'Categoria criada com sucesso!' });
      
      // Forçar atualização do CategoriaList
      setCategoriaListKey(prev => prev + 1);
      
      // Recarregar produtos para atualizar filtros de categoria
      loadProdutos();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      setToast({ type: 'error', message: 'Erro ao criar categoria' });
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Package size={48} style={{ color: 'var(--primary-color)' }} />
          <h1 className="app-title">CRUD de Produtos Gerais</h1>
        </div>
        <p className="app-subtitle">
          Gerencie seu catálogo de produtos e categorias de forma simples e eficiente.
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

        {/* Navegação por abas */}
        <div className="navigation-tabs">
          <button
            className={`nav-tab ${activeTab === 'produtos' ? 'active' : ''}`}
            onClick={() => setActiveTab('produtos')}
          >
            <Package size={18} />
            Produtos
          </button>
          <button
            className={`nav-tab ${activeTab === 'categorias' ? 'active' : ''}`}
            onClick={() => setActiveTab('categorias')}
          >
            <Tag size={18} />
            Categorias
          </button>
        </div>

        {/* Controles de cada aba - dentro do mesmo card */}
        <div className="tab-controls">
          {activeTab === 'produtos' ? (
            <div className="filters-container">
              <SearchBar onSearch={handleSearch} />
              <button 
                onClick={handleCreateProduto}
                className="btn btn-primary"
                disabled={isLoading}
              >
                <Plus size={16} />
                Novo Produto
              </button>
            </div>
          ) : (
            <div className="filters-container">
              <SearchBar 
                onSearch={handleCategoriaSearch} 
                placeholder="Buscar categorias..."
              />
              <button 
                onClick={handleCreateCategoria}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Nova Categoria
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        {activeTab === 'produtos' ? (
          <>
            <ProdutoList
              produtos={produtos}
              onEdit={handleEditProduto}
              onDelete={handleDeleteProduto}
              isLoading={isLoading}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              total={totalItems}
              limit={filters.limit || 10}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <CategoriaList 
            key={categoriaListKey}
            searchTerm={categoriaSearch}
            onCategoriaChange={loadProdutos}
          />
        )}
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

      {showCategoriaForm && (
        <CategoriaForm
          onSave={handleSaveCategoria}
          onCancel={() => setShowCategoriaForm(false)}
          isLoading={isSubmitting}
        />
      )}

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
