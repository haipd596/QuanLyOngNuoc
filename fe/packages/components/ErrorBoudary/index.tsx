/* eslint-disable react/destructuring-assignment */
import React from 'react';

export class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state: any;

  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div style={{ padding: 16, background: 'rgba(0, 0, 0, 0.8)', height: '100vh' }}>
          <h1 style={{ color: 'red' }}>Something went wrong. :(</h1>
          <div style={{ whiteSpace: 'pre-wrap', color: 'white', fontSize: 16 }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </div>
        </div>
      );
    }
    // Normally, just render children
    return (this.props as any).children;
  }
}
