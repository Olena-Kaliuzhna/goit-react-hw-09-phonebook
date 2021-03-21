import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import authSelectors from '../../redux/auth/auth-selectors.js';
import s from './UserMenu.module.css';
import defaultAvatar from './no-avatar.png';

export default function UserMenu() {
  const dispatch = useDispatch();

  const name = useSelector(authSelectors.getUsername);
  const avatar = defaultAvatar;

  const onLogout = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <img className={s.avatar} src={avatar} alt="" width="32" />
      <span className={s.name}>Welcome, {name}</span>
      <button className={s.button} type="button" onClick={onLogout}>
        LogOut
      </button>
    </div>
  );
}
