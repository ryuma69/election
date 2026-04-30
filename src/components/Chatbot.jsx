import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../AppContext';

const qaData = {
  en: [
    { id: 'q1', q: "What ID do I need to vote?", a: "You typically need a government-issued photo ID. Check your specific local election commission guidelines." },
    { id: 'q2', q: "How do I find my polling station?", a: "You can find your polling booth location by visiting your national or state Election Commission website." },
    { id: 'q3', q: "Can I vote online?", a: "Currently, most major national elections require in-person voting or mail-in ballots. Fully online voting is rare." },
    { id: 'q4', q: "What if I miss the registration deadline?", a: "If you miss the deadline, you generally will not be able to vote in the upcoming election." }
  ],
  es: [
    { id: 'q1', q: "¿Qué ID necesito para votar?", a: "Normalmente necesitas una identificación con foto emitida por el gobierno. Revisa las normas de tu comisión electoral local." },
    { id: 'q2', q: "¿Cómo encuentro mi casilla?", a: "Puedes encontrar tu casilla visitando el sitio web de la Comisión Electoral nacional o estatal." },
    { id: 'q3', q: "¿Puedo votar en línea?", a: "Actualmente, la mayoría requiere voto presencial o por correo. El voto por internet es muy raro." },
    { id: 'q4', q: "¿Qué pasa si se me pasa la fecha límite de registro?", a: "Si se pasa la fecha, generalmente no podrás votar en las próximas elecciones." }
  ]
};

const Chatbot = () => {
  const { t, language } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize bot intro on language change
  useEffect(() => {
    setMessages([{ text: t.botIntro, sender: 'bot' }]);
  }, [language, t.botIntro]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestion = (item) => {
    setMessages(prev => [...prev, { text: item.q, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: item.a, sender: 'bot' }]);
    }, 1500);
  };

  return (
    <section id="assistant" className="assistant-section">
      <div className="container">
        <div className="assistant-container glass-panel">
          <div className="assistant-header">
            <div className="avatar">🤖</div>
            <div>
              <h3 className="assistant-title">{t.assistantTitle}</h3>
              <p className="assistant-status">{t.assistantStatus}</p>
            </div>
          </div>
          
          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}-message`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="quick-questions">
            {qaData[language].map(item => (
              <button 
                key={item.id} 
                className="question-btn"
                onClick={() => handleQuestion(item)}
                disabled={isTyping}
                aria-label={item.q}
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
