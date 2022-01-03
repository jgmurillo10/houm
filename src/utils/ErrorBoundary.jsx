import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <p>Something went wrong. </p><a href='/'>Go to the homepage.</a>
        </div>
      </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
