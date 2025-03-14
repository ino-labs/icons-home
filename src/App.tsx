import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import IconPage from './pages/IconPage';
import About from './pages/About';
import { DarkModeProvider } from './contexts/DarkModeContext';

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/icon/:name" element={<IconPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
