import { Outlet, useLocation } from 'react-router';
import classes from './layout.module.scss';
import { useMemo } from 'react';
import { pathameToTitle } from '../../utils/general.utils';

export interface LayoutProps {}

export const Layout = (props: LayoutProps) => {
  const location = useLocation();

  const title = useMemo(
    () => pathameToTitle(location.pathname),
    [location.pathname],
  );

  return (
    <div className={classes.container}>
      <header>{title}</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
