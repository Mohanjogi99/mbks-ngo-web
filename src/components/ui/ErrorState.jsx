import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

/**
 * Standard Error Boundary Fallback UI
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            कुछ त्रुटि हुई / Something Went Wrong
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-md">
            क्षमा करें, एप्लिकेशन लोडिंग के दौरान एक तकनीकी समस्या आई है। कृपया पुनः प्रयास करें।
          </p>
          {this.state.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-left max-w-xl w-full overflow-auto max-h-48">
              <p className="text-xs font-bold text-red-800">Technical Detail: {this.state.error.toString()}</p>
              {this.state.errorInfo?.componentStack && (
                <pre className="text-[10px] text-red-600 mt-1 whitespace-pre-wrap font-mono">
                  {this.state.errorInfo.componentStack.slice(0, 300)}
                </pre>
              )}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button icon={RefreshCw} onClick={this.handleReload} variant="primary">
              पुनः लोड करें (Reload)
            </Button>
            <Button icon={Home} onClick={() => { this.handleReset(); window.location.href = '/'; }} variant="outline">
              मुख्य पृष्ठ (Home)
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Inline Error Alert Component
 */
export const ErrorAlert = ({ title = 'त्रुटि (Error)', message, onRetry }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 my-4">
      <AlertTriangle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
      <div className="flex-1 text-sm">
        <strong className="font-semibold">{title}: </strong>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-bold underline hover:no-underline text-red-700 shrink-0"
        >
          पुनः प्रयास करें
        </button>
      )}
    </div>
  );
};
