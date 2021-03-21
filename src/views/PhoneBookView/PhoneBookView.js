import React, { useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import ContactForm from '../../components/ContactForm/ContactForm.js';
import Filter from '../../components/Filter/Filter.js';
import ContactList from '../../components/ContactList/ContactList.js';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import Loader from '../../components/Loader/Loader';
import s from './phoneBookView.module.css';
import anim from '../../components/animation.module.css';
import filterAnim from '../../components/Filter/Filter.module.css';

export default function phoneBookView() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(phoneBookOperations.fetchContacts());
  }, [dispatch]);

  const clearFilter = useCallback(
    () => dispatch(phoneBookActions.changeFilter('')),
    [dispatch],
  );

  const contacts = useSelector(phoneBookSelectors.getAllContacts);
  const isLoading = useSelector(phoneBookSelectors.getLoading);
  const error = useSelector(phoneBookSelectors.getError);

  return (
    <div className={s.container}>
      {error && <ErrorPopup message={error.message} />}

      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames={s}
        unmountOnExit
      >
        {<h1 className={s.title}>Phonebook</h1>}
      </CSSTransition>

      <ContactForm />

      <CSSTransition
        in={contacts.length > 1}
        classNames={filterAnim}
        timeout={250}
        unmountOnExit
        onExiting={() => clearFilter()}
      >
        <Filter />
      </CSSTransition>

      <CSSTransition
        in={contacts.length > 0}
        appear={true}
        timeout={250}
        classNames={anim}
        unmountOnExit
      >
        <div className={s.contactsWrapper}>
          <h2 className={s.title}>Contacts</h2>
          {isLoading && <Loader />}
          <ContactList />
        </div>
      </CSSTransition>
    </div>
  );
}
