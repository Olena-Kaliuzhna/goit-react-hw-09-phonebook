import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import authSelectors from '../../redux/auth/auth-selectors';
import { CSSTransition } from 'react-transition-group';
import s from './ErrorPopup.module.css';
import anim from '../animation.module.css';

export default function ErrorPopup({ message }) {
  const error = useSelector(phoneBookSelectors.getError);
  const authError = useSelector(authSelectors.getError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error || authError) {
      setTimeout(() => {
        dispatch(phoneBookActions.clearError());
      }, 3000);
    }
  }, [dispatch]);

  return (
    <CSSTransition in={!!message} timeout={250} classNames={anim} unmountOnExit>
      <div className={s.popup}>
        <p>{message}</p>
      </div>
    </CSSTransition>
  );
}
