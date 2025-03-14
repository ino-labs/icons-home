import React, { useEffect, useState } from 'react';

// Defina a interface para o tipo de ícone
interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string;
}

// Função para buscar os dados do arquivo JSON
const fetchIcons = async (): Promise<Icon[]> => {
  const response = await fetch('/assets/icons-data.json');
  const data = await response.json();
  return data;
};

const IconCounter: React.FC = () => {
  const [iconCount, setIconCount] = useState<number>(0);

  useEffect(() => {
    const getIcons = async () => {
      const icons = await fetchIcons();
      setIconCount(icons.length);
    };

    getIcons();
  }, []);

  return (
    <span>{iconCount}</span>
  );
};

export default IconCounter;
