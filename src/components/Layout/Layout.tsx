import { Outlet, useLocation } from 'react-router';
import classes from './layout.module.scss';
import { useMemo } from 'react';

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  const location = useLocation();

  const title = useMemo(() => {
    if (location.pathname === '/property-listings') return 'Property Listings';
    else return location.pathname;
  }, [location.pathname]);

  return (
    <div className={classes.container}>
      <header>{title}</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
