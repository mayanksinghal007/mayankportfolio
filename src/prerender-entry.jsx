import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteProvider } from './context/SiteContext';
import { AppLayout } from './App';

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
          <AppLayout />
        </MemoryRouter>
      </SiteProvider>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}
