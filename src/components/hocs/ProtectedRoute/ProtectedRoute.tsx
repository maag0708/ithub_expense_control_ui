import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isTokenExpired } from '../../../utils/jwt';
import {
  getLocalStorage,
  removeLocalStorage,
} from '../../../utils/localStorage';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
  children,
}) => {
  const user = getLocalStorage('user');

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  const isExpired = isTokenExpired(user.token);

  if (isExpired) {
    removeLocalStorage('user');

    return <Navigate to={redirectPath} replace />;
  }

  return children ? <> children </> : <Outlet />;
};

export default ProtectedRoute;
