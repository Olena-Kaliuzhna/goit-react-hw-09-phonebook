import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
// import ErrorPopup from '../ErrorPopup/ErrorPopup';
import PropTypes from 'prop-types';
import s from '../ContactForm/ContactForm.module.css';

export default function ContactEditor({ onSave, data }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [errorMessage, setErrorMessage] = useState(null);

  // const contacts = useSelector(phoneBookSelectors.getAllContacts);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setNumber(data.number);
    }

    return;
  }, [data]);

  const onEditContact = useCallback(
    (id, name, number) =>
      dispatch(phoneBookOperations.editContact(id, name, number)),
    [dispatch],
  );

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

    onEditContact(data.id, name, number);
    onSave();
  };

  return (
    <>
      <form className={s.wrapper} onSubmit={handleSubmit} autoComplete="off">
        <label className={s.field}>
          <span className={s.name}>Name</span>
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            placeholder="Edit name"
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
            placeholder="Edit number"
            onChange={handleChange}
            required
          />
        </label>
        <button className={s.button} type="submit">
          Edit contact
        </button>
      </form>
    </>
  );
}
ContactEditor.propTypes = {
  onSave: PropTypes.func,
  data: PropTypes.object,
};
