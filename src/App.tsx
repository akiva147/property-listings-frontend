import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import { LoginPage } from './pages/LoginPage';
import { PropertyListingsPage } from './pages/PropertyListingsPage';
import { AuthRoutes } from './components/ProtectedRoute/AuthRoutes';
import { SignupPage } from './pages/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={'/property-listings'} />} />
        <Route element={<AuthRoutes />}>
          <Route path="/property-listings" element={<PropertyListingsPage />} />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
      </Route>
    </Routes>
  );
}

export default App;
