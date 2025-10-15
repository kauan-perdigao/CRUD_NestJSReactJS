import { useState, useEffect, useCallback } from 'react';
import { Plus, Package, Tag } from 'lucide-react';
import './styles/App.css';
import {
  ProdutoList,
  CategoriaList,
  ProdutoForm,
  CategoriaForm,
  ConfirmDialog,
  Toast,
  SearchBar,
  SmartPagination
} from './components';
import { produtoService, categoriaService } from './services';
import type { Produto, Categoria, CreateProdutoDto, UpdateProdutoDto, ProdutoFilters, CategoriaFilters } from './types';

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
  
  // Estados para paginação inteligente
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filters, setFilters] = useState<ProdutoFilters>({
    page: 1,
    limit: 12, // Limite menor para mostrar paginação quando necessário
  });
  
  // Estados para categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | undefined>();
  const [categoriaToDelete, setCategoriaToDelete] = useState<number | null>(null);
  const [isConfirmCategoriaDialogOpen, setIsConfirmCategoriaDialogOpen] = useState(false);
  
  // Estados para paginação de categorias
  const [currentPageCategorias, setCurrentPageCategorias] = useState(1);
  const [totalPagesCategorias, setTotalPagesCategorias] = useState(1);
  const [totalItemsCategorias, setTotalItemsCategorias] = useState(0);
  const [categoriaFilters, setCategoriaFilters] = useState<CategoriaFilters>({
    page: 1,
    limit: 12, // Limite menor para categorias também
  });

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

  const loadCategorias = useCallback(async () => {
    try {
      setIsLoadingCategorias(true);
      setError(null);
      const response = await categoriaService.getAllCategorias(categoriaFilters);
      setCategorias(response.data);
      setTotalPagesCategorias(response.totalPages);
      setTotalItemsCategorias(response.total);
      setCurrentPageCategorias(response.page);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError('Erro ao carregar categorias. Verifique se o backend está rodando.');
    } finally {
      setIsLoadingCategorias(false);
    }
  }, [categoriaFilters]);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  useEffect(() => {
    loadCategorias();
  }, [loadCategorias]);

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
        await produtoService.updateProduto(editingProduto.id, produtoData);
        setToast({ type: 'success', message: 'Produto atualizado com sucesso!' });
      } else {
        await produtoService.createProduto(produtoData as CreateProdutoDto);
        setToast({ type: 'success', message: 'Produto criado com sucesso!' });
      }

      setIsFormOpen(false);
      setEditingProduto(undefined);
      
      // Recarregar a lista de produtos para obter os dados atualizados com relações
      await loadProdutos();
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
      setIsConfirmDialogOpen(false);
      setProdutoToDelete(null);
      setToast({ type: 'success', message: 'Produto excluído com sucesso!' });
      
      // Recarregar a lista de produtos
      await loadProdutos();
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

  // Handlers para categorias
  const handleEditCategoria = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setShowCategoriaForm(true);
  };

  const handleDeleteCategoria = (id: number) => {
    setCategoriaToDelete(id);
    setIsConfirmCategoriaDialogOpen(true);
  };

  const confirmDeleteCategoria = async () => {
    if (!categoriaToDelete) return;

    try {
      setIsSubmitting(true);
      setError(null);
      await categoriaService.deleteCategoria(categoriaToDelete);
      setCategorias(prev => prev.filter(c => c.id !== categoriaToDelete));
      setIsConfirmCategoriaDialogOpen(false);
      setCategoriaToDelete(null);
      setToast({ type: 'success', message: 'Categoria excluída com sucesso!' });
      
      // Recarregar produtos para atualizar filtros
      loadProdutos();
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
      setError('Erro ao deletar categoria. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelCategoriaDelete = () => {
    setIsConfirmCategoriaDialogOpen(false);
    setCategoriaToDelete(null);
  };

  // Handlers para filtros e paginação inteligente
  const handleSearch = useCallback((search: string) => {
    setFilters(prev => ({
      ...prev,
      search: search || undefined,
      page: 1, // Voltar para primeira página ao pesquisar
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({
      ...prev,
      page,
    }));
  }, []);

  const handleCategoriaSearch = useCallback((search: string) => {
    setCategoriaFilters(prev => ({
      ...prev,
      search: search || undefined,
      page: 1, // Voltar para primeira página ao pesquisar
    }));
  }, []);

  const handleCategoriaPageChange = useCallback((page: number) => {
    setCategoriaFilters(prev => ({
      ...prev,
      page,
    }));
  }, []);

  const handleSaveCategoria = async (categoriaData: { nome?: string; descricao?: string }) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingCategoria) {
        const updatedCategoria = await categoriaService.updateCategoria(editingCategoria.id, categoriaData);
        setCategorias(prev => 
          prev.map(c => c.id === editingCategoria.id ? updatedCategoria : c)
        );
        setToast({ type: 'success', message: 'Categoria atualizada com sucesso!' });
      } else {
        const newCategoria = await categoriaService.createCategoria(categoriaData as { nome: string; descricao?: string });
        setCategorias(prev => [...prev, newCategoria]);
        setToast({ type: 'success', message: 'Categoria criada com sucesso!' });
      }

      setShowCategoriaForm(false);
      setEditingCategoria(undefined);
      
      // Recarregar produtos para atualizar filtros de categoria
      loadProdutos();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      setError('Erro ao salvar categoria. Tente novamente.');
    } finally {
      setIsSubmitting(false);
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
            
            <SmartPagination
              currentPage={currentPage}
              totalPages={totalPages}
              total={totalItems}
              limit={filters.limit || 12}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <>
            <CategoriaList
              categorias={categorias}
              onEdit={handleEditCategoria}
              onDelete={handleDeleteCategoria}
              isLoading={isLoadingCategorias}
            />
            
            <SmartPagination
              currentPage={currentPageCategorias}
              totalPages={totalPagesCategorias}
              total={totalItemsCategorias}
              limit={categoriaFilters.limit || 12}
              onPageChange={handleCategoriaPageChange}
            />
          </>
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

      <ConfirmDialog
        isOpen={isConfirmCategoriaDialogOpen}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita."
        onConfirm={confirmDeleteCategoria}
        onCancel={handleCancelCategoriaDelete}
        isLoading={isSubmitting}
      />

      {showCategoriaForm && (
        <CategoriaForm
          categoria={editingCategoria}
          onSave={handleSaveCategoria}
          onCancel={() => {
            setShowCategoriaForm(false);
            setEditingCategoria(undefined);
          }}
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
