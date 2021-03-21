import React, { useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import ContactListItem from './ContactListItem';
import s from './Contact.module.css';
import anim from '../animation.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const onDeleteContact = useCallback(
    id => dispatch(phoneBookOperations.deleteContact(id)),
    [dispatch],
  );
  const contacts = useSelector(phoneBookSelectors.getFilteredContacts);

  return (
    <TransitionGroup component="ul" className={s.wrapper}>
      {contacts.map(({ id, name, number }) => {
        return (
          <CSSTransition timeout={250} classNames={anim} key={id}>
            <ContactListItem
              appear={true}
              name={name}
              number={number}
              unmountOnExit
              onDelete={() => onDeleteContact(id)}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
