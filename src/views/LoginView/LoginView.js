import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import s from '../RegisterView/RegisterView.module.css';

export default function LoginView() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const onLogin = useCallback(e => dispatch(authOperations.logIn(e)));

  const handleSubmit = e => {
    e.preventDefault();

    onLogin({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>LogIn</h1>
      <form onSubmit={handleSubmit} className={s.wrapper} autoComplete="off">
        <label className={s.field}>
          <span className={s.email}>Email</span>
          <input
            className={s.input}
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </label>

        <label className={s.field}>
          <span className={s.password}>Password</span>
          <input
            className={s.input}
            type="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={handleChange}
            autoComplete="off"
          />
        </label>

        <button className={s.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
