import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import { PublicRoutes } from './routes/PublicRoutes';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<RootErrorBoundary />}>
        <Route index element={<Navigate to={'/property-listings'} />} />
        <Route path="/*" element={<PublicRoutes />} />

        <Route path="/*" element={<ProtectedRoutes />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
