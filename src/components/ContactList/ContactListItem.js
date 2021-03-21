import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.css';

function ContactListItem({ name, number, onDelete }) {
  return (
    <li className={s.contactItem}>
      <span>
        {name}: {number}
      </span>
      <button className={s.button} type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ContactListItem;
