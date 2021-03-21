import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Loader from './components/Loader/Loader';
import authOperations from './redux/auth/auth-operations';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('./views/HomeView/HomeView.js' /*webpackChunkName: 'home-page' */),
);
const Register = lazy(() =>
  import(
    './views/RegisterView/RegisterView.js' /*webpackChunkName: 'register' */
  ),
);
const Login = lazy(() =>
  import('./views/LoginView/LoginView.js' /*webpackChunkName: 'Login' */),
);

const PhoneBook = lazy(() =>
  import(
    './views/PhoneBookView/PhoneBookView.js' /*webpackChunkName: 'phone-book' */
  ),
);

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/" exact>
            <HomePage />
          </PublicRoute>
          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <Register />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo="/login">
            <PhoneBook />
          </PrivateRoute>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </>
  );
}
