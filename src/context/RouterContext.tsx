import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface LocationState {
  pathname: string;
  search: string;
  key: number;
}

interface NavigateOptions {
  replace?: boolean;
}

interface RouterValue {
  location: LocationState;
  navigate: (to: string, options?: NavigateOptions) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

function readLocation(key: number): LocationState {
  return { pathname: window.location.pathname, search: window.location.search, key };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState>(() => readLocation(0));

  useEffect(() => {
    const onPopState = () => setLocation((current) => readLocation(current.key + 1));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string, options: NavigateOptions = {}) => {
    const url = new URL(to, window.location.origin);
    const changesPage = url.pathname !== window.location.pathname;
    if (options.replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
    setLocation((current) => readLocation(current.key + 1));
    if (changesPage) window.scrollTo(0, 0);
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used inside RouterProvider');
  return context;
}

export function useLocation(): LocationState {
  return useRouter().location;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function useSearchParams(): [URLSearchParams, (next: URLSearchParams) => void] {
  const { location, navigate } = useRouter();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const setParams = useCallback(
    (next: URLSearchParams) => {
      const query = next.toString();
      navigate(`${location.pathname}${query ? `?${query}` : ''}`, { replace: true });
    },
    [location.pathname, navigate],
  );
  return [params, setParams];
}

/** Matches a path pattern such as "/products/:productId" against a pathname. */
export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i += 1) {
    const part = patternParts[i];
    if (part.startsWith(':')) {
      params[part.slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (part !== pathParts[i]) {
      return null;
    }
  }
  return params;
}
