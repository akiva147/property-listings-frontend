import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PropertyListingsPage } from './components/PropertyListingsPage';
import { RootErrorBoundary } from './components/RootErrorBoundary';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} ErrorBoundary={RootErrorBoundary}>
        <Route index element={<Navigate to={'/property-listings'} />} />
        <Route path="/property-listings" element={<PropertyListingsPage />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
}

export default App;
