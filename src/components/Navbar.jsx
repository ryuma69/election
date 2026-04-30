import { useAppContext } from '../AppContext';

const Navbar = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useAppContext();

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">Civic Guide</div>
      <div className="nav-controls">
        <button 
          onClick={toggleLanguage} 
          className="icon-btn" 
          aria-label="Toggle Language"
        >
          {language === 'en' ? 'EN / ES' : 'ES / EN'}
        </button>
        <button 
          onClick={toggleTheme} 
          className="icon-btn" 
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
