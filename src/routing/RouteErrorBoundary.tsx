import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import RouteError from './RouteError';

export default function RouteErrorBoundary({ resetErrorBoundary }: FallbackProps) {
  const location = useLocation();

  useEffect(() => {
    resetErrorBoundary();
  }, [location.pathname, resetErrorBoundary]);

  return <RouteError message='Error while loading page' />;
}
