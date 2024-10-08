import { useLocation, useNavigate } from 'react-router';
import {
  authenticatedRoutes,
  publicRoutes,
} from '../../constants/routes.const';
import classes from './nav-bar.module.scss';
import { Button } from 'antd';
import { isTokenExpired } from '../../utils/general.utils';
import { useMemo } from 'react';

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isExpired, isUndefined } = isTokenExpired();

  const navButtons = useMemo(() => {
    if ((isExpired || isUndefined) && !publicRoutes[location.pathname])
      return <span>{'Login'}</span>;
    const pages =
      isExpired || isUndefined
        ? [publicRoutes[location.pathname]]
        : Object.values(authenticatedRoutes);
    if (pages.length === 1) return <span>{pages[0].title}</span>;
    return pages.map(({ path, title }) => {
      const isCurrentPath = path === location.pathname;
      return (
        <Button
          key={path + title}
          variant="link"
          type="link"
          onClick={isCurrentPath ? undefined : () => navigate(path)}
        >
          {isCurrentPath ? <strong>{title}</strong> : title}
        </Button>
      );
    });
  }, [location.pathname, isExpired, isUndefined, navigate]);

  const signout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={classes.container}>
      <section className={classes.pages}>{navButtons}</section>
      {Array.isArray(navButtons) && (
        <Button variant="link" type="link" onClick={() => signout()}>
          Signout
        </Button>
      )}
    </header>
  );
};
