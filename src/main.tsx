import { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#0a0a0a', minHeight: '100vh' }}>
          <h1 style={{ color: '#f97316' }}>Something went wrong</h1>
          <pre style={{ color: '#ef4444', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
            {(this.state.error as Error).message}
          </pre>
          <p style={{ color: '#9ca3af', marginTop: '1rem' }}>
            If this mentions missing Supabase env vars, add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_KEY</code> to your <code>.env</code> file.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
