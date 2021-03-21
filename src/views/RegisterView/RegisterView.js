import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import s from './RegisterView.module.css';

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const onRegister = useCallback(e => dispatch(authOperations.register(e)), [
    dispatch,
  ]);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

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

  const handleSubmit = e => {
    e.preventDefault();

    onRegister({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Registration</h1>
      <form onSubmit={handleSubmit} className={s.wrapper} autoComplete="off">
        <label className={s.field}>
          <span className={s.name}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={handleChange}
          />
        </label>

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
            autoComplete="off"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </label>

        <button className={s.button} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
}
