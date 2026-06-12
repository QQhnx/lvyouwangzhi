import React, { Component, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Wrapper function component to inject navigate
const ErrorBoundaryWithNavigate: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
};

// Class component for error boundary
class ErrorBoundary extends Component<ErrorBoundaryProps & { navigate: (path: string) => void }, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps & { navigate: (path: string) => void }) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleBackToHome = () => {
    this.props.navigate('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">
            <div className="p-8 text-center">
              {/* Error Icon */}
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-800 mb-3 font-serif">
                页面出错了
              </h2>
              
              {/* Error Message */}
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  抱歉，页面加载时出现了问题。
                </p>
                {this.state.error && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-red-700 font-mono break-words">
                      {this.state.error.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Back to Home Button */}
              <button
                onClick={this.handleBackToHome}
                className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
              >
                返回首页
              </button>

              {/* Decorative elements */}
              <div className="mt-8 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryWithNavigate;