import { Route, Routes } from 'react-router-dom';
import { PropertyListingsPage } from '../pages/PropertyListingsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const ProtectedRoutes = () => (
  <Routes>
    <ProtectedRoute>
      <Route path="/property-listings" element={<PropertyListingsPage />} />
    </ProtectedRoute>
  </Routes>
);
