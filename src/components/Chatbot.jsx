import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppContext } from '../AppContext';
import { GoogleGenAI } from '@google/genai';

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

/**
 * Chatbot Component
 * Simulates an interactive assistant and integrates with Google Gemini API if a key is provided.
 * Demonstrates Google Services integration and accessibility (aria-live).
 * @returns {JSX.Element} The rendered Chatbot
 */
const Chatbot = () => {
  const { t, language } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const chatEndRef = useRef(null);

  // Initialize bot intro on language change
  useEffect(() => {
    setMessages([{ text: t.botIntro, sender: 'bot' }]);
  }, [language, t.botIntro]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleQuestion = useCallback(async (questionText, fallbackAnswer = null) => {
    setMessages(prev => [...prev, { text: questionText, sender: 'user' }]);
    setIsTyping(true);

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are an election assistant. Answer this question concisely in ${language}: ${questionText}`
        });
        setMessages(prev => [...prev, { text: response.text, sender: 'bot' }]);
      } catch (error) {
        console.error("Gemini API Error:", error);
        setMessages(prev => [...prev, { text: "Error connecting to AI. " + (fallbackAnswer || "Please try again."), sender: 'bot' }]);
      }
    } else {
      // Fallback if no API key
      setTimeout(() => {
        setMessages(prev => [...prev, { text: fallbackAnswer || "Please provide a Gemini API Key to enable custom AI responses.", sender: 'bot' }]);
      }, 1000);
    }
    setIsTyping(false);
  }, [apiKey, language]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    handleQuestion(customQuestion);
    setCustomQuestion('');
  };

  return (
    <section id="assistant" className="assistant-section">
      <div className="container">
        <div className="assistant-container glass-panel">
          <div className="assistant-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="avatar">🤖</div>
              <div>
                <h3 className="assistant-title">{t.assistantTitle}</h3>
                <p className="assistant-status">{t.assistantStatus}</p>
              </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <input 
                type="password" 
                placeholder="Google Gemini API Key (Optional)" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', width: '250px' }}
                aria-label="Google Gemini API Key"
              />
            </div>
          </div>
          
          <div className="chat-window" aria-live="polite">
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
                onClick={() => handleQuestion(item.q, item.a)}
                disabled={isTyping}
                aria-label={item.q}
              >
                {item.q}
              </button>
            ))}
          </div>

          <form onSubmit={handleCustomSubmit} style={{ display: 'flex', padding: '1rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.1)' }}>
            <input 
              type="text" 
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder={language === 'en' ? "Ask a custom question..." : "Haz una pregunta personalizada..."}
              style={{ flex: 1, padding: '0.8rem', borderRadius: '5px 0 0 5px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)' }}
              disabled={!apiKey || isTyping}
              aria-label="Custom Question Input"
            />
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ borderRadius: '0 5px 5px 0', padding: '0.8rem 1.5rem', animation: 'none', opacity: 1, cursor: (!apiKey || isTyping) ? 'not-allowed' : 'pointer' }}
              disabled={!apiKey || isTyping}
              aria-label="Send Question"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
