import RouteError from './RouteError';

export default function NotFound() {
  return <RouteError message='Page not found' />;
}
