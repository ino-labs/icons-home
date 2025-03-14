import React from 'react';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import { Link } from 'react-router-dom';

const About: React.FC = () => {

  return (
    <div>
      <NavBar />
      <h1 className="text-center font-bold text-[32px] mt-2 mb-2 sm:mt-5 sm:mb-4 md:mt-10 md:mb-8">About INO icons</h1>
      <div className='about-container'>
        <p><span className='font-extrabold'>INO icons</span> is a free tool that helps you create a library of svg icons for your projects.
          <ul>
            <li>1 - Browse or search for different icons</li>
            <li>2 - Customize your icons such as size, border width and color.</li>
            <li>3 - Download the svg of the icons that will be used in your projects.</li>
          </ul>
        </p>
        <p className='about-title font-extrabold text-center'>Creator</p>
        <p>Ewerton Nepomuceno (<Link to="https://www.behance.net/n3pu" target="_blank" rel="noopener noreferrer">n3pu</Link>), a Brazilian designer with more than 12 years of experience in the Technology area, working in UX/UI, Front-end development and Design Systems.</p>
        <p>Made with Figma, lots of love and coffee.<br />
        Support by <Link to="https://buymeacoffee.com/n3pu" target="_blank" rel="noopener noreferrer">buying me a coffee</Link> or <Link to="https://www.paypal.com/donate/?business=CJPN8GQVW32UU&amount=5&no_recurring=0&item_name=Support+me+if+you+think+I%27ve+given+you+good+results&currency_code=USD" target="_blank" rel="noopener noreferrer">donate</Link></p>
      </div>
      <FooterBar />
    </div>
  );
};

export default About;
