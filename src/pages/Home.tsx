import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import IconCounter from '../components/IconCounter';
import ToolBar from '../components/ToolBar';

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const Home: React.FC = () => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [searchResults, setSearchResults] = useState<Icon[]>([]);

  useEffect(() => {
    fetch('/assets/icons-data.json')
      .then(response => response.json())
      .then(data => {
        setIcons(data);
        setSearchResults(data);
      });
  }, []);


  return (
    <div>
      <NavBar />
      <h1 className="text-center font-bold text-[32px] mt-5 mb-4 md:mt-10 md:mb-8">Awesome <IconCounter /> free SVG icons</h1>
      <ToolBar setSearchResults={setSearchResults} icons={icons} />
      <div className={"icons-list " + (searchResults.length > 0 ? '' : 'no-items')}>
        {searchResults.length > 0 ? (
          searchResults.map(icon => (
            <IconCard key={icon.id} name={icon.name} title={icon.title} keywords={icon.keywords} />
          ))
        ) : (
          <p className='text-center w-full no-items-found'>
            <span>No</span> <span> icon</span> <span> found</span> <span> =(</span>
          </p>
        )}
      </div>
      <FooterBar />
    </div>
  );
};

export default Home;
