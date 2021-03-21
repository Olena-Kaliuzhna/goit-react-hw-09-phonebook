import React from 'react';
import s from './HomeView.module.css';
const HomeView = () => (
  <div className={s.container}>
    <h1 className={s.title}>
      Welcome to<span className={s.titleSpan}> Phonebook</span>
    </h1>
  </div>
);

export default HomeView;
