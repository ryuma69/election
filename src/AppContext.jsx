import React, { createContext, useState, useEffect, useContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'es' : 'en'));
  };

  // Translations
  const t = {
    en: {
      heroTitle: "Empowering Your Vote",
      heroSub: "Navigate the election process with clarity. Understand the timeline, know your rights, and make your voice heard.",
      explore: "Explore Timeline",
      timelineTitle: "The Election Journey",
      assistantTitle: "Civic Guide Assistant",
      assistantStatus: "Online and ready to help",
      botIntro: "Hi there! I'm your Civic Guide. I can help you understand the election process. What would you like to know?",
      checklistTitle: "Your Voting Checklist"
    },
    es: {
      heroTitle: "Empoderando Tu Voto",
      heroSub: "Navega el proceso electoral con claridad. Entiende el cronograma, conoce tus derechos y haz oír tu voz.",
      explore: "Explorar Cronograma",
      timelineTitle: "El Viaje Electoral",
      assistantTitle: "Asistente Guía Cívica",
      assistantStatus: "En línea y listo para ayudar",
      botIntro: "¡Hola! Soy tu Guía Cívica. Puedo ayudarte a entender el proceso electoral. ¿Qué te gustaría saber?",
      checklistTitle: "Tu Lista de Verificación"
    }
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, language, toggleLanguage, t: t[language] }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
