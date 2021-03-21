import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import ErrorPopup from '../ErrorPopup/ErrorPopup';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const contacts = useSelector(phoneBookSelectors.getAllContacts);

  const dispatch = useDispatch();
  const onAddContact = useCallback(
    (name, number) => dispatch(phoneBookOperations.addContact(name, number)),
    [dispatch],
  );

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (contacts.some(contact => contact.name === name)) {
      setErrorMessage('Этот контакт уже существует');

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      reset();
      return;
    }

    onAddContact(name, number);
    reset();
  };

  return (
    <div>
      <ErrorPopup message={errorMessage} />
      <form className={s.wrapper} onSubmit={handleSubmit} autoComplete="off">
        <label className={s.field}>
          <span className={s.name}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={handleChange}
            required
          />
        </label>
        <label className={s.field}>
          <span className={s.number}>Number</span>
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            placeholder="Enter number"
            onChange={handleChange}
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
