import { Component, type ErrorInfo, type ReactNode } from 'react';
import { resetDemoData } from '../utils/storage';

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unexpected application error', error, info.componentStack);
  }

  handleReset = () => {
    resetDemoData();
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="container page error-page" data-testid="error-state">
          <h1>Something went wrong</h1>
          <p className="muted">The page could not be displayed. Resetting the demo data usually fixes this.</p>
          <button type="button" className="btn btn-primary" onClick={this.handleReset}>
            Reset Demo Data
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
