import React from 'react';
import { Link } from 'react-router-dom';

interface FooterBarProps {
}

const FooterBar: React.FC<FooterBarProps> = () => {

  return (
    <div className='footer mt-4 md:mt-12'>
      <ul>
        <li className="footer-item">Made by <Link className='link' to="https://www.behance.net/n3pu" target="_blank" rel="noopener noreferrer">n3pu</Link></li>
        <li className="footer-item"><Link className='link' to="/about">About INO icons</Link></li>
        <li className="footer-item"><Link className='link' to="https://github.com/ino-labs/ino-icons" target="_blank" rel="noopener noreferrer">Github</Link></li>
      </ul>
    </div>
  );
};

export default FooterBar;
