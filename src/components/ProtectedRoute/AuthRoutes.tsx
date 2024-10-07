import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../../utils/general.utils';
import { message } from 'antd';

interface AuthRoutesProps {}

export const AuthRoutes = (props: AuthRoutesProps) => {
  const token = localStorage.getItem('token');

  const isExpired = isTokenExpired(token);

  if (!token) return <Navigate to="/signup" />;

  if (isExpired) {
    message.error({
      content: 'Your session has expired. Please log in again.',
      key: 'session-expired',
    });
    return <Navigate to="/signup" />;
  }

  return <Outlet />;
};
