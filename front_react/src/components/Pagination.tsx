import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  const getVisiblePages = () => {
    const delta = 2;
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

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Mostrando {startItem}-{endItem} de {total} produtos
      </div>
      
      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn pagination-prev"
        >
          <ChevronLeft size={16} />
          Anterior
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
        >
          Próxima
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;