import { useState, useEffect, ReactNode } from 'react';

interface Route {
  path: string;
  component: ReactNode;
}

interface RouterProps {
  routes: Route[];
  defaultPath?: string;
}

export function Router({ routes, defaultPath = '/' }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || defaultPath);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || defaultPath);
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [defaultPath]);

  const currentRoute = routes.find(route => {
    if (route.path === currentPath) return true;
    // Handle dynamic routes like /service/:id
    const pathParts = route.path.split('/');
    const currentParts = currentPath.split('/');
    if (pathParts.length !== currentParts.length) return false;
    return pathParts.every((part, i) => part.startsWith(':') || part === currentParts[i]);
  });

  return <>{currentRoute ? currentRoute.component : routes.find(r => r.path === defaultPath)?.component}</>;
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function useParams(routePath: string): Record<string, string> {
  const currentPath = window.location.hash.slice(1);
  const pathParts = routePath.split('/');
  const currentParts = currentPath.split('/');
  const params: Record<string, string> = {};

  pathParts.forEach((part, i) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1);
      params[paramName] = currentParts[i];
    }
  });

  return params;
}
