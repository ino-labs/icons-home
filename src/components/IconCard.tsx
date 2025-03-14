import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IconCardProps {
  name: string;
  title: string;
  keywords: string[];
}

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
}

const IconCard: React.FC<IconCardProps> = ({ name }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [iconTitle, setIconTitle] = useState<string>('');

  useEffect(() => {
    fetch(`/assets/icons/${name}.svg`)
      .then(response => response.text())
      .then(data => setSvgContent(data));

    fetch('/assets/icons-data.json')
      .then(response => response.json())
      .then((icons: Icon[]) => {
        const icon = icons.find(icon => icon.name === name);
        if (icon) {
          setIconTitle(icon.title);
        }
      });
  }, [name]);

  return (
    <div className='icon-card'>
      <Link to={`/icon/${name}`}>
        <div className='ino-icon' dangerouslySetInnerHTML={{ __html: svgContent }} />
        <p className='mt-1 md:mt-2'>{iconTitle}</p>
      </Link>
    </div>
  );
};

export default IconCard;
