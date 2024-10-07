import { Route, Routes } from 'react-router-dom';
import { PropertyListingsPage } from '../pages/PropertyListingsPage';
import { AuthRoutes } from '../components/ProtectedRoute/AuthRoutes';

export const ProtectedRoutes = () => (
  <Routes>
    <AuthRoutes>
      <Route path="/property-listings" element={<PropertyListingsPage />} />
    </AuthRoutes>
  </Routes>
);
