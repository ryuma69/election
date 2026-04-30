import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

const checklistItems = {
  en: [
    { id: 'c1', label: "Registered to vote" },
    { id: 'c2', label: "Found polling location" },
    { id: 'c3', label: "Researched candidates" },
    { id: 'c4', label: "Prepared ID for polling day" }
  ],
  es: [
    { id: 'c1', label: "Registrado para votar" },
    { id: 'c2', label: "Ubicación de casilla encontrada" },
    { id: 'c3', label: "Candidatos investigados" },
    { id: 'c4', label: "Identificación preparada para el día" }
  ]
};

const Checklist = () => {
  const { t, language } = useAppContext();
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progress = Math.round(
    (Object.values(checkedItems).filter(Boolean).length / checklistItems.en.length) * 100
  );

  return (
    <section id="checklist" className="checklist-section">
      <div className="container">
        <h2 className="section-title">{t.checklistTitle}</h2>
        <div className="checklist-container glass-panel">
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="progress-text">{progress}%</span>
          </div>

          <div className="checklist-items">
            {checklistItems[language].map(item => (
              <label key={item.id} className="checklist-item">
                <input 
                  type="checkbox" 
                  checked={!!checkedItems[item.id]} 
                  onChange={() => toggleCheck(item.id)}
                  aria-label={item.label}
                />
                <span className="custom-checkbox"></span>
                {item.label}
              </label>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checklist;
