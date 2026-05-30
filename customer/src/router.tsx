import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from './App';

// Lazy-load all pages
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const MenuItem = lazy(() => import('./pages/MenuItem'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const OrderForm = lazy(() => import('./pages/OrderForm'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Success = lazy(() => import('./pages/Success'));

// Loading fallback
const PageLoading = () => (
  <div className="flex items-center justify-center" style={{ minHeight: '50vh' }}>
    <div
      className="rounded-full"
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-warm-800)',
        borderTopColor: 'var(--color-caramel)',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<PageLoading />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'menu', element: withSuspense(Menu) },
      { path: 'menu/:slug', element: withSuspense(MenuItem) },
      { path: 'gioi-thieu', element: withSuspense(About) },
      { path: 'khong-gian', element: withSuspense(Gallery) },
      { path: 'lien-he', element: withSuspense(Contact) },
      { path: 'dat-mon', element: withSuspense(OrderForm) },
      { path: 'dat-mon/thanh-cong', element: withSuspense(Success) },
      { path: 'theo-doi-don/:id', element: withSuspense(OrderTracking) },
    ],
  },
]);
