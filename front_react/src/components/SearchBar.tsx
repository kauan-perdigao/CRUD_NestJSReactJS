import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar produtos...',
  initialValue = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="search-clear"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;