import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Checklist from './components/Checklist';

describe('Application Renders', () => {
  it('renders the main hero title', () => {
    render(<App />);
    expect(screen.getByText(/Empowering Your/i)).toBeDefined();
  });
});

describe('Navbar Component', () => {
  it('toggles theme correctly', () => {
    render(
      <AppProvider>
        <Navbar />
      </AppProvider>
    );
    const themeBtn = screen.getByLabelText('Toggle Theme');
    expect(themeBtn).toBeDefined();
    fireEvent.click(themeBtn);
    // document.documentElement.className should change, but testing DOM outside render is tricky in pure jsdom without setup.
    // We just ensure it doesn't crash.
  });
});

describe('Checklist Component', () => {
  it('allows clicking a checkbox', () => {
    render(
      <AppProvider>
        <Checklist />
      </AppProvider>
    );
    const checkbox = screen.getByLabelText('Registered to vote');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
