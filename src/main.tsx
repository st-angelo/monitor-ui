import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { AuthProvider } from './features/authentication/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
