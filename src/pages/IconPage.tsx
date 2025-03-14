import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconResize from '../images/icon-resize.svg';
import iconBorder from '../images/icon-border.svg';
import iconClose from '/assets/icons/ino-close.svg';
import iconCopy from '/assets/icons/ino-copy.svg';
import iconCopyCheck from '/assets/icons/ino-copy-check.svg';
import iconCopyX from '/assets/icons/ino-copy-x.svg';
import iconDownload from '/assets/icons/ino-download-arrow-down.svg';
import { MuiColorInput } from 'mui-color-input';

interface Icon {
  id: number;
  name: string;
  title: string;
  keywords: string[];
  cssClass: string;
}

const IconPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [size, setSize] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [svgContent, setSvgContent] = useState<string>('');
  const { darkMode } = useDarkMode();
  const [iconTitle, setIconTitle] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]); // Adicionando state para keywords
  const [copyIcon, setCopyIcon] = useState(iconCopy);
  const [copyClass, setCopyClass] = useState('clicked-button');

  // Define a cor inicial baseada no modo dark
  const defaultColor = darkMode ? '#FFFFFF' : '#000000';
  const [color, setColor] = useState(defaultColor);
  const [activeTab, setActiveTab] = useState("svg"); // Controla a tab ativa

  useEffect(() => {
    // Carrega o conteúdo SVG e os dados do ícone
    fetch(`/assets/icons/${name}.svg`)
      .then(response => response.text())
      .then(data => setSvgContent(data));

    fetch('/assets/icons-data.json')
      .then(response => response.json())
      .then((icons: Icon[]) => {
        const icon = icons.find(icon => icon.name === name);
        if (icon) {
          setIconTitle(icon.title);
          setKeywords(icon.keywords); // Define as keywords do ícone
        }
      });
  }, [name]);

  // Atualiza a cor do ícone quando o modo dark muda
  useEffect(() => {
    setColor(darkMode ? '#FFFFFF' : '#000000');
  }, [darkMode]);

  // Função para resetar a cor
  const resetColor = () => {
    setColor(defaultColor);
  };

  // Função para copiar o código SVG para a área de transferência
  const handleCopy = () => {
    let textToCopy = "";
  
    if (activeTab === "svg") {
      textToCopy = svgContent;
    } else if (activeTab === "html") {
      textToCopy = `<i class="icon-${name}"></i>`;
    }
  
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopyIcon(iconCopyCheck); // Ícone de sucesso
        setCopyClass("clicked-button-success");
        setTimeout(() => {
          setCopyIcon(iconCopy); // Ícone padrão
          setCopyClass("clicked-button");
        }, 1500);
      })
      .catch(err => {
        setCopyIcon(iconCopyX); // Ícone de erro
        setCopyClass("clicked-button-error");
        setTimeout(() => {
          setCopyIcon(iconCopy); // Ícone padrão
          setCopyClass("clicked-button");
        }, 1500);
        console.error("Failed to copy:", err);
      });
  };
  

  // Atualiza o conteúdo SVG com os novos valores
  const updatedSvgContent = svgContent
    .replace(/<svg/, `<svg id="${name}" style="width: ${size}px; height: ${size}px;"`)
    .replace(/width="[^"]*"/g, `width="${size}"`)
    .replace(/height="[^"]*"/g, `height="${size}"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
    .replace(/stroke="[^"]*"/g, `stroke="${color}"`);

  const handleDownload = () => {
    // Espera que o SVG esteja renderizado
    setTimeout(() => {
      const svgElement = document.getElementById('svg-icon') as SVGSVGElement | null;
      if (svgElement) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        const blob = new Blob([source], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('SVG element not found');
      }
    }, 0); // Executa o código após o próximo ciclo de renderização
  };

  return (
    <div>
      <NavBar />
      <div className="icon-page-header px-4 py-4">
        <h1 className='text-left font-bold text-[24px] sm:mb-1 md:mb-2'>INO - {iconTitle}</h1>
        {/* Exibe as tags com as keywords do ícone */}
        <div className='icon-keywords'>
          {keywords.map((keyword, index) => (
            <span key={index} className='icon-tag'>{keyword}</span>
          ))}
        </div>
      </div>
      
      <div className='icon-preview-container'>
        <div className='icon-preview' dangerouslySetInnerHTML={{ __html: updatedSvgContent }} />
        <div className="icon-controls">
          <div className="icon-controls-toolbar">
            <div className='icon-control'>
              <button onClick={handleDownload}>
                <img src={iconDownload} alt="Download SVG" />                SVG
              </button>
            </div>
            <div className='icon-control'>
              <img className="icon-control-img" src={iconResize} alt="Size" />
              <input
                className='input-range'
                type="range"
                min="16" 
                max="200"
                value={size}
                onChange={e => setSize(Number(e.target.value))}
              />
              <span>{size}px</span>
            </div>
            <div className='icon-control'>
              <img className="icon-control-img" src={iconBorder} alt="Stroke Width" />
              <input
                className='input-range'
                type="range"
                min="1" 
                max="2"
                step={0.25}
                value={strokeWidth}
                onChange={e => setStrokeWidth(Number(e.target.value))}
              />
              <span>{strokeWidth}px</span>
            </div>
            <div className='icon-control'>
              <MuiColorInput isAlphaHidden value={color} onChange={setColor} format='hex' />
              <img className='reset-value' src={iconClose} onClick={resetColor} alt="Reset" />
            </div>
          </div>
          <div className="tabs-container">
            <div className="tabs-header">
              <div className="tabs-container-tabs mx-4 mt-2">
                <button
                  className={activeTab === "svg" ? "active" : ""}
                  onClick={() => setActiveTab("svg")}
                  title="SVG"
                >
                  SVG
                </button>
                <button 
                  className={activeTab === "html" ? "active" : ""}
                  onClick={() => setActiveTab("html")}
                  title="HTML"
                >
                  HTML
                </button>
              </div>
            </div>
            {activeTab === "svg" ? (
              <div className="tab-content">
                <div className='code-container'>
                  <div className="pre-code-container">
                    <pre>{updatedSvgContent}</pre>
                  </div>
                  <button className={copyClass +' code-copy'} onClick={handleCopy}>
                    <img src={copyIcon} title="copy svg" alt="copy svg" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="tab-content">
                <div className='code-container'>
                  <div className="pre-code-container">
                    <pre>&lt;i class="icon-{name}"&gt;&lt;/i&gt;</pre>
                  </div>
                  <button className={copyClass +' code-copy'} onClick={handleCopy}>
                    <img src={copyIcon} title="copy svg" alt="copy svg" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      

      <FooterBar />
    </div>
  );
};

export default IconPage;
