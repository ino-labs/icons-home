import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconMenuTwoBars from '/assets/icons/ino-menu-two-bars.svg';
import inoIconsLogo from '/ino-icons-logo.svg';
import iconSun from '/assets/icons/ino-sun.svg';
import iconMoon from '/assets/icons/ino-moon.svg';

interface NavBarProps {
  
}

const NavBar: React.FC<NavBarProps> = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  return (
    <nav>
      <div className="nav-first-content">
        <div className="nav-menu" onClick={toggleMenu}>
          <img width={24} height={24} src={iconMenuTwoBars} alt="" />
          {showMenu && (
            <div ref={menuRef} className="menu">
              <ul>
                <li><Link className='link-menu' to="/">Home</Link></li>
                <li><Link className='link-menu' to="/about">About</Link></li>
                <li><Link className='link-menu' to="https://github.com/ino-labs/ino-icons" target="_blank" rel="noopener noreferrer">Docs</Link></li>
                <li><Link className='link-menu' to="https://buymeacoffee.com/n3pu" target="_blank" rel="noopener noreferrer">Buy me a coffee</Link></li>
                <li><Link className='link-menu' to="https://www.paypal.com/donate/?business=CJPN8GQVW32UU&amount=5&no_recurring=0&item_name=Support+me+if+you+think+I%27ve+given+you+good+results&currency_code=USD" target="_blank" rel="noopener noreferrer">Donate</Link></li>
              </ul>
            </div>
          )}
        </div>
        <ul className='nav-title-container'>
          <li className='nav-title'>
            <Link to="/" className='nav-icon-name'>
              <img height={32} width={32} src={inoIconsLogo} alt="" />
              INO icons
            </Link>
            <span className='nav-icon-version'> v1</span>
          </li>
        </ul>
      </div>
      <div className="nav-second-content">
        <ul className='dark-donate-container'>
          <li><Link className='link' to="https://buymeacoffee.com/n3pu" target="_blank" rel="noopener noreferrer">Buy me a coffee</Link></li>
          <li>or</li>
          <li><Link className='link' to="https://www.paypal.com/donate/?business=CJPN8GQVW32UU&amount=5&no_recurring=0&item_name=Support+me+if+you+think+I%27ve+given+you+good+results&currency_code=USD" target="_blank" rel="noopener noreferrer">Donate</Link></li>
        </ul>
        <ul className='dark-mode-container'>
          <li className='dark-mode-container-link'><Link className='link' to="https://github.com/ino-labs/ino-icons" target="_blank" rel="noopener noreferrer">Docs</Link></li>
          <li className='dark-mode-container-link'><Link className='link' to="/about">About</Link></li>
          <li>
            <label className="toggleDarkLabel" arial-label="Toggle dark mode">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <div className="toggleDarkIcon sun">
                <img height={16} width={16} src={iconSun} alt="" />
              </div>
              <div className="toggleDarkIcon moon">
                <img height={16} width={16} src={iconMoon} alt="" />
              </div>
            </label>
          </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default NavBar;
