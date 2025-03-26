import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconResize from '../images/icon-resize.svg';
import iconBorder from '../images/icon-border.svg';
import iconClose from '/assets/icons/close.svg';
import iconCopy from '/assets/icons/copy.svg';
import iconCopyCheck from '/assets/icons/copy-check.svg';
import iconDownload from '/assets/icons/download-arrow-down.svg';
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

  const [clickedButton, setClickedButton] = useState<string | null>(null);
  // Função para copiar o código SVG para a área de transferência
  const handleCopy = (content: string, buttonId: string) => {
  
    navigator.clipboard.writeText(content)
      .then(() => {
        setClickedButton(buttonId); // Define o botão clicado
        setTimeout(() => {
          setClickedButton(null); // Reseta após 1,5s
        }, 1500);
      })
      .catch(err => {
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
    if (!updatedSvgContent) {
      console.error("SVG content is empty");
      return;
    }
  
    // Remove quebras de linha extras para garantir um bom formato do SVG
    const cleanedSvg = updatedSvgContent.trim();
  
    const blob = new Blob([cleanedSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                  <button className={clickedButton === "svg" ? "clicked-button-success code-copy" : "code-copy"} onClick={() => handleCopy(svgContent, "svg")}>
                    <img src={clickedButton === "svg" ? iconCopyCheck : iconCopy} title="copy svg" alt="copy svg" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="tab-content flex flex-col items-start">
                <h4 className='pl-6 pt-2 -mb-2 uppercase text-xs text-[#757575]'>CSS Content:</h4>
                <div className='code-container'>
                  <div className="pre-code-container">
                    <pre>&lt;i class="ino ino-{name}"&gt;&lt;/i&gt;</pre>
                  </div>
                  <button className={clickedButton === "html1" ? "clicked-button-success code-copy" : "code-copy"} onClick={() => handleCopy(`<i class="ino ino-${name}"></i>`, "html1")}>
                    <img src={clickedButton === "html1" ? iconCopyCheck : iconCopy} title="copy HTML content" alt="copy HTML content" />
                  </button>
                </div>
                <h4 className='pl-6 pt-2 -mb-2 uppercase text-xs text-[#757575]'>Ligature:</h4>
                <div className='code-container'>
                  <div className="pre-code-container">
                    <pre>&lt;i class="ino"&gt;{name}&lt;/i&gt;</pre>
                  </div>
                  <button className={clickedButton === "html2" ? "clicked-button-success code-copy" : "code-copy"} onClick={() => handleCopy(`<i class="ino">${name}</i>`, "html2")}>
                    <img src={clickedButton === "html2" ? iconCopyCheck : iconCopy} title="copy ligature structure" alt="copy ligature structure" />
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
