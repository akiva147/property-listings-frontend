import { CounterPage } from '../pages/CounterPage';
import { LoginPage } from '../pages/LoginPage';
import { PropertyListingsPage } from '../pages/PropertyListingsPage';
import { SignupPage } from '../pages/SignupPage';

export type Route = { title: string; path: string; element: JSX.Element };

export type Routes = Record<string, Route>;

export const defaultRoute = '/property-listings';

export const authenticatedRoutes: Routes = {
  '/property-listings': {
    title: 'Property Listings',
    path: '/property-listings',
    element: <PropertyListingsPage />,
  },
  '/counter': { title: 'Counter', path: '/counter', element: <CounterPage /> },
};

export const publicRoutes: Routes = {
  '/login': { title: 'Login', path: '/login', element: <LoginPage /> },
  '/signup': { title: 'Signup', path: '/signup', element: <SignupPage /> },
};
