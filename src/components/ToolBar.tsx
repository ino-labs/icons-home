import React, { useRef } from 'react';
import Search from './Search';
import iconSearch from '/assets/icons/search.svg';

interface ToolBarProps {
  setSearchResults: React.Dispatch<React.SetStateAction<Icon[]>>;
  icons: Icon[];
}

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const ToolBar: React.FC<ToolBarProps> = ({ setSearchResults, icons }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="search-container">
      <img height={24} width={24} src={iconSearch} alt="icon search" />
      <Search setSearchResults={setSearchResults} icons={icons} searchInputRef={searchInputRef} />
    </div>
  );
};

export default ToolBar;
