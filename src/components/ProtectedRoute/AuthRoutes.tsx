import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../../utils/general.utils';
import { message } from 'antd';

interface AuthRoutesProps {}

export const AuthRoutes = (props: AuthRoutesProps) => {
  const { isExpired, isUndefined } = isTokenExpired();

  if (isUndefined) return <Navigate to="/login" />;

  if (isExpired) {
    message.error({
      content: 'Your session has expired. Please log in again.',
      key: 'session-expired',
    });

    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
