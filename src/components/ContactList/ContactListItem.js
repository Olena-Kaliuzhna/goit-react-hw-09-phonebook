import React, { useState, useCallback } from 'react';
import Modal from '../Modal/Modal';
import ContactEditor from '../ContactEditor/ContactEditor';
import PropTypes from 'prop-types';
import s from './Contact.module.css';

function ContactListItem({ name, number, onDelete, onEditClick }) {
  const [showModal, setShowModal] = useState(false);
  const [contactData, setContactData] = useState(null);

  const handleItemClick = () => {
    setContactData({ name, number, id: onEditClick });
  };

  const toggleModal = useCallback(() => {
    setShowModal(prevShowModal => !prevShowModal);
  }, []);

  return (
    <>
      <li className={s.contactItem} onClick={handleItemClick}>
        <div>
          {name}: {number}
        </div>
        <div>
          <button className={s.button} type="button" onClick={toggleModal}>
            Edit
          </button>
          <button className={s.button} type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactEditor onSave={toggleModal} data={contactData} />
        </Modal>
      )}
    </>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
  onEditClick: PropTypes.string,
};

export default ContactListItem;
