import React from 'react';
import { useAppContext } from '../AppContext';

const Hero = () => {
  const { t } = useAppContext();

  // Highlight specific word in title if needed
  const renderTitle = () => {
    const parts = t.heroTitle.split('Vote');
    if (parts.length > 1) {
      return <>{parts[0]}<span className="highlight">Vote</span>{parts[1]}</>;
    }
    const partsEs = t.heroTitle.split('Voto');
    if (partsEs.length > 1) {
      return <>{partsEs[0]}<span className="highlight">Voto</span>{partsEs[1]}</>;
    }
    return t.heroTitle;
  };

  return (
    <header className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{renderTitle()}</h1>
        <p className="hero-subtitle">{t.heroSub}</p>
        <a href="#timeline" className="btn-primary">{t.explore}</a>
      </div>
      <div className="hero-graphics">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </header>
  );
};

export default Hero;
