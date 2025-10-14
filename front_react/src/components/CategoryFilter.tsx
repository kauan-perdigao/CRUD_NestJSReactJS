import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import type { Categoria } from '../types/produto';
import { categoriaService } from '../services/categoriaService';

interface CategoryFilterProps {
  onCategoryChange: (categoriaId: number | undefined) => void;
  selectedCategoryId?: number;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onCategoryChange,
  selectedCategoryId,
}) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setIsLoading(true);
      const data = await categoriaService.getAllCategoriasSimple();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCategoryChange(value ? Number(value) : undefined);
  };

  return (
    <div className="category-filter">
      <div className="filter-wrapper">
        <Filter size={20} className="filter-icon" />
        <select
          value={selectedCategoryId || ''}
          onChange={handleChange}
          className="filter-select"
          disabled={isLoading}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;