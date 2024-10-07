import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/general.utils';
import { message } from 'antd';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  const isExpired = isTokenExpired(token);

  if (isExpired) {
    message.error('Your session has expired. Please log in again.');
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
};
