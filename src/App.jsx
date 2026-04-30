import { Suspense, lazy } from 'react';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './index.css';

const Timeline = lazy(() => import('./components/Timeline'));
const Checklist = lazy(() => import('./components/Checklist'));
const Chatbot = lazy(() => import('./components/Chatbot'));

/**
 * Main Application Component
 * Wraps the app in AppProvider and uses React.lazy for efficient component loading.
 * @returns {JSX.Element} The rendered App
 */

function App() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
          <Timeline />
          <Checklist />
          <Chatbot />
        </Suspense>
      </main>
      <footer>
        <p>Built for Hack2Skill PromptWars 🚀</p>
      </footer>
    </AppProvider>
  );
}

export default App;
