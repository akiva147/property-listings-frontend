import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import { AuthRoutes } from './components/ProtectedRoute/AuthRoutes';
import {
  authenticatedRoutes,
  defaultRoute,
  publicRoutes,
} from './constants/routes.const';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={defaultRoute} />} />
        <Route element={<AuthRoutes />}>
          {Object.values(authenticatedRoutes).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        {Object.values(publicRoutes).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
