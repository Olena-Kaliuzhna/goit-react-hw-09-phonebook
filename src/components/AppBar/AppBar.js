import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import authSelectors from '../../redux/auth/auth-selectors';
import s from './AppBar.module.css';

export default function AppBar() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  return (
    <header className={s.appBar}>
      <div className={s.wrapper}>
        <Navigation />
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
}
