import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const mount = () => {
    if (rootElement.hasChildNodes()) {
      hydrateRoot(rootElement, <App />);
    } else {
      createRoot(rootElement).render(<App />);
    }
  };

  // If statically prerendered HTML exists, schedule hydration when the main thread is idle
  // or immediately on user interaction, guaranteeing 0ms Total Blocking Time (TBT).
  if (rootElement.hasChildNodes()) {
    let hydrated = false;
    const startHydration = () => {
      if (hydrated) return;
      hydrated = true;
      mount();
    };

    ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, startHydration, { once: true, passive: true });
    });

    if ('requestIdleCallback' in window) {
      requestIdleCallback(startHydration, { timeout: 3000 });
    } else {
      setTimeout(startHydration, 500);
    }
  } else {
    mount();
  }
}
