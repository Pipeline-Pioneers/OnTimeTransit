// filepath: c:\Users\mamas\OneDrive\Desktop\Github\OnTimeTransit\frontend\src\components\ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <h1>Something went wrong.</h1>
          <p>We're sorry for the inconvenience. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;