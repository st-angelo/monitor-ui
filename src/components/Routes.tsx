import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../features/authentication/AuthContext';
import Home from '../features/general/Home';
import SignIn from '../features/authentication/SignIn';
import SignUp from '../features/authentication/SignUp';
import Wallet from '../features/general/Wallet';
import AccountSettings from '../features/general/AccountSettings';

export default function AppRoutes() {
  const { isAuthenticated } = useAuthentication();

  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route
        path='/home'
        element={
          !isAuthenticated ? <Navigate to='/sign-in' replace /> : <Home />
        }
      />
      <Route
        path='/wallet'
        element={
          !isAuthenticated ? <Navigate to='/sign-in' replace /> : <Wallet />
        }
      />
      <Route
        path='/account-settings'
        element={
          !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : (
            <AccountSettings />
          )
        }
      />
      <Route
        path='/sign-in'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignIn />}
      />
      <Route
        path='/sign-up'
        element={isAuthenticated ? <Navigate to='/' replace /> : <SignUp />}
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
