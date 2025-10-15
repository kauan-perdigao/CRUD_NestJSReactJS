import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  showAlways?: boolean; // Se true, sempre mostra. Se false, só mostra quando necessário
}

const SmartPagination: React.FC<SmartPaginationProps> = ({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
  showAlways = false,
}) => {
  // Só mostra paginação se:
  // 1. showAlways for true, OU
  // 2. Houver mais de uma página E mais de 20 itens
  const shouldShowPagination = showAlways || (totalPages > 1 && total > 20);
  
  if (!shouldShowPagination) return null;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const getVisiblePages = () => {
    const delta = 1; // Mostra menos páginas para ser mais limpo
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="smart-pagination">
      <div className="pagination-info">
        {total > limit ? (
          `Mostrando ${startItem}-${endItem} de ${total} itens`
        ) : (
          `${total} ${total === 1 ? 'item' : 'itens'}`
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn pagination-prev"
            title="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="pagination-pages">
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                className={`pagination-page ${
                  page === currentPage ? 'active' : ''
                } ${typeof page !== 'number' ? 'dots' : ''}`}
                disabled={typeof page !== 'number'}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn pagination-next"
            title="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartPagination;