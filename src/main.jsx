import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Providers
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Router Configuration
import { router } from './router/router';

// Root Application Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </HelmetProvider>
  </StrictMode>
);
