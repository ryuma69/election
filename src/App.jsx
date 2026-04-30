import React from 'react';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Checklist />
        <Chatbot />
      </main>
      <footer>
        <p>Built for Hack2Skill PromptWars 🚀</p>
      </footer>
    </AppProvider>
  );
}

export default App;
