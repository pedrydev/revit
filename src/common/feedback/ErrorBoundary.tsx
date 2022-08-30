import { Component, ErrorInfo, PropsWithChildren } from 'react';

type ErrorBoundaryState = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  PropsWithChildren<unknown>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) return <h2>Error</h2>;

    return children;
  }
}
