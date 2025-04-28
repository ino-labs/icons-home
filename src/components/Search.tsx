import React, { useState, useEffect, RefObject } from 'react';

interface SearchProps {
  setSearchResults: React.Dispatch<React.SetStateAction<Icon[]>>;
  icons: Icon[];
  searchInputRef: RefObject<HTMLInputElement>;
}

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const Search: React.FC<SearchProps> = ({ setSearchResults, icons, searchInputRef }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<Icon[]>([]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchInputRef]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const results = icons.filter(icon =>
        icon.keywords.some(keyword => keyword.includes(term))
      );
      const uniqueResults = Array.from(new Set(results.map(icon => icon.id)))
        .map(id => results.find(icon => icon.id === id));
      setFilteredResults(uniqueResults as Icon[]);
      setSearchResults(uniqueResults as Icon[]);
    } else {
      setFilteredResults(icons);
      setSearchResults(icons);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(icons);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className='input-search'>
      <input
        ref={searchInputRef}
        className='search-icons'
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <div className='flex flex-auto gap-1 items-center'>
          <div className="search-tag">{(filteredResults.length > 1 ? filteredResults.length + ' founds' : filteredResults.length + ' found')}</div>
          <button className="clear-search" onClick={clearSearch}>
            <img height={24} width={24} src="/assets/icons/close.svg" alt="Clear Search" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
