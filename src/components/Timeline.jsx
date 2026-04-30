import { useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';

const electionSteps = {
  en: [
    { title: "Voter Registration", date: "Phase 1", description: "Ensure you are eligible and registered to vote.", icon: "📝" },
    { title: "Candidate Nominations", date: "Phase 2", description: "Candidates file their nomination papers.", icon: "👥" },
    { title: "Campaign Period", date: "Phase 3", description: "Candidates share their manifestos.", icon: "📢" },
    { title: "Polling Day", date: "Phase 4", description: "Voters visit designated polling stations to cast their ballots.", icon: "🗳️" },
    { title: "Counting & Results", date: "Phase 5", description: "Votes are counted and winners declared.", icon: "📊" }
  ],
  es: [
    { title: "Registro de Votantes", date: "Fase 1", description: "Asegúrese de ser elegible y estar registrado para votar.", icon: "📝" },
    { title: "Nominación de Candidatos", date: "Fase 2", description: "Los candidatos presentan sus documentos de nominación.", icon: "👥" },
    { title: "Período de Campaña", date: "Fase 3", description: "Los candidatos comparten sus manifiestos.", icon: "📢" },
    { title: "Día de Elecciones", date: "Fase 4", description: "Los votantes visitan las casillas para emitir su voto.", icon: "🗳️" },
    { title: "Conteo y Resultados", date: "Fase 5", description: "Los votos son contados y se declaran ganadores.", icon: "📊" }
  ]
};

const Timeline = () => {
  const { t, language } = useAppContext();
  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    stepsRef.current.forEach(step => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        <h2 className="section-title">{t.timelineTitle}</h2>
        <div className="timeline">
          {electionSteps[language].map((step, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';
            return (
              <div 
                key={index}
                ref={el => stepsRef.current[index] = el}
                className={`timeline-step ${position}`}
              >
                <div className="step-content glass-panel">
                  <span className="step-number">0{index + 1}</span>
                  <span className="step-date">{step.date}</span>
                  <h3>{step.icon} {step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
