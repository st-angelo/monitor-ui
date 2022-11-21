import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../features/authentication/AuthContext';
import SignIn from '../features/authentication/SignIn';
import SignUp from '../features/authentication/SignUp';
import AccountSettings from '../features/general/AccountSettings';
import Home from '../features/general/Home';
import UserNotVerified from '../features/general/UserNotVerified';
import Wallet from '../features/general/Wallet';

export default function AppRoutes() {
  const { isAuthenticated, isVerified } = useAuthentication();
  console.log(isAuthenticated);
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route
        path='/home'
        element={
          !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : !isVerified ? (
            <Navigate to='/not-verified' replace />
          ) : (
            <Home />
          )
        }
      />
      <Route
        path='/wallet'
        element={
          !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : !isVerified ? (
            <Navigate to='/not-verified' replace />
          ) : (
            <Wallet />
          )
        }
      />
      <Route
        path='/account-settings'
        element={
          !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : !isVerified ? (
            <Navigate to='/not-verified' replace />
          ) : (
            <AccountSettings />
          )
        }
      />
      <Route
        path='/not-verified'
        element={
          isVerified ? (
            <Navigate to='/' replace />
          ) : !isAuthenticated ? (
            <Navigate to='/sign-in' replace />
          ) : (
            <UserNotVerified />
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
