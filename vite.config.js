import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: {
      resolveDependencies(filename, deps) {
        // Only preload critical chunks for the homepage!
        // Never preload admin-bundle, markdown-parser, or confetti on the homepage.
        return deps.filter((dep) => {
          const lower = dep.toLowerCase();
          return !lower.includes('admin') && !lower.includes('markdown') && !lower.includes('confetti');
        });
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-icons';
          }
          if (id.includes('node_modules/marked')) {
            return 'markdown-parser';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'confetti';
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/react-helmet-async')
          ) {
            return 'react-vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
