import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

class LoaderSpin extends Component {
  state = {};
  render() {
    return (
      <div className={s.loader}>
        <Loader type="Circles" color="#099110" height={80} width={80} />
      </div>
    );
  }
}

export default LoaderSpin;
