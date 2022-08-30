import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

import Spinner from '@/common/feedback/Spinner';
import NotFound from './NotFound';
import RouteErrorBoundary from './RouteErrorBoundary';
import type RouteConfig from './RouteConfig';

type NamedRouteObject = RouteObject & {
  name?: string;
};

const routeObjects: NamedRouteObject[] = [];

function parseConfigs(configs: Record<string, unknown>, isLayout: boolean) {
  const keys: string[] = [];
  const configKeys = Object.keys(routeConfigs);
  configKeys.forEach((path) => {
    if (isLayout && path.includes('Layout')) keys.push(path);
    else if (!isLayout && !path.includes('Layout')) keys.push(path);
  });
  keys.sort((a, b) => a.split('/').length - b.split('/').length); // To add parents first

  keys.forEach((path) => {
    // eslint-disable-next-line security/detect-object-injection
    const config = routeConfigs[path] as RouteConfig;
    if (config.parent) {
      const parent = routeObjects.filter((r) => r.name === config.parent)[0];
      if (parent.children) {
        parent.children.push(config);
      } else {
        parent.children = [config];
      }
    } else {
      routeObjects.push({
        children: [],
        element: config.element,
        index: config.index,
        name: config.name,
        path: config.path,
      });
    }
  });
}

const routeConfigs = import.meta.glob('../modules/**/*.route.tsx', {
  eager: true,
  import: 'default',
});

parseConfigs(routeConfigs, true);
parseConfigs(routeConfigs, false);

routeObjects.push({
  element: <NotFound />,
  path: '/*',
});

export default function Routes() {
  const routes = useRoutes(routeObjects);

  return (
    <ErrorBoundary FallbackComponent={RouteErrorBoundary}>
      <Suspense fallback={<Spinner variant='page' />}>{routes}</Suspense>
    </ErrorBoundary>
  );
}
