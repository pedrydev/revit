import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Layout from '@/app/Layout';
import NotFound from './NotFound';
import type RouteConfig from './RouteConfig';
import RouteError from './RouteError';

type NamedRouteObject = RouteObject & {
  name?: string;
};

const routeObjects: NamedRouteObject[] = [];

function parseConfigs(configs: Record<string, unknown>, isLayout: boolean) {
  const keys: string[] = [];
  const configKeys = Object.keys(configs);
  configKeys.forEach((path) => {
    if (isLayout && path.includes('Layout')) keys.push(path);
    else if (!isLayout && !path.includes('Layout')) keys.push(path);
  });
  keys.sort((a, b) => a.split('/').length - b.split('/').length); // To add parents first

  keys.forEach((path) => {
    // eslint-disable-next-line security/detect-object-injection
    const config: RouteConfig = {
      // eslint-disable-next-line security/detect-object-injection
      ...(configs[path] as RouteConfig),
      errorElement: <RouteError />,
    };
    if (config.parent) {
      const parent = routeObjects.filter((r) => r.name === config.parent)[0];
      if (parent.children) {
        parent.children.push(config);
      } else {
        parent.children = [config];
      }
    } else {
      // @ts-ignore
      routeObjects.push({
        ...config,
        children: [],
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routeObjects,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
