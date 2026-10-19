import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteProvider } from './context/SiteContext';
import { AppLayout } from './App';

// Synchronous page imports for SSR so prerender never suspends and outputs full static HTML
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Portfolio } from './pages/Portfolio';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';
import { AdsPage } from './pages/AdsPage';
import { Admin } from './pages/Admin';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { RoasCalculator } from './pages/tools/RoasCalculator';
import { AiPromptGenerator } from './pages/tools/AiPromptGenerator';
import { ReelHookGenerator } from './pages/tools/ReelHookGenerator';
import { CityLanding } from './pages/locations/CityLanding';
import { Glossary } from './pages/Glossary';
import { PressHub } from './pages/PressHub';

const ssrPages = {
  Home,
  About,
  Services,
  ServiceDetail,
  Portfolio,
  Process,
  Contact,
  AdsPage,
  Admin,
  Legal,
  NotFound,
  Blog,
  BlogPost,
  RoasCalculator,
  AiPromptGenerator,
  ReelHookGenerator,
  CityLanding,
  Glossary,
  PressHub,
};

/**
 * Server-side prerendering entry
 * Renders the application to static HTML and extracts Helmet metadata
 */
export async function render(url) {
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <SiteProvider>
        <MemoryRouter initialEntries={[url]}>
          <AppLayout pagesOverride={ssrPages} />
        </MemoryRouter>
      </SiteProvider>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
