import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../features/authentication/AuthContext';
import Dashboard from '../features/dashboard/Dashboard';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';

export default function AppRoutes() {
  const { isAuthenticated } = useAuthentication();

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/dashboard' replace />} />
      <Route
        path='/dashboard'
        element={
          !isAuthenticated ? <Navigate to='/signin' replace /> : <Dashboard />
        }
      />
      <Route
        path='/signin'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignIn />}
      />
      <Route
        path='/signup'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignUp />}
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
