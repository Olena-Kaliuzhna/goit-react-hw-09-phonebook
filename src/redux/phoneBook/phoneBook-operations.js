import actions from './phoneBook-actions';
import api from '../../service/phoneBook-api';
import { toast } from 'react-toastify';

const fetchContacts = () => async dispatch => {
  dispatch(actions.fetchContactsRequest());
  try {
    const { data } = await api.fetchContacts();
    dispatch(actions.fetchContactsSuccess(data));
  } catch (error) {
    dispatch(actions.fetchContactsError(error.message));
    if (error.response.status === 404) {
      toast.info("There is no such user's collection!");
    } else if (error.response.status === 500) {
      toast.error('Server error! Please try later.');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
    // toast.error('Something went wrong! Please try again!');
  }
};

const addContact = (name, number) => async dispatch => {
  const contact = { name, number };

  dispatch(actions.addContactRequest());
  try {
    const { data } = await api.addContact(contact);
    dispatch(actions.addContactSuccess(data));
  } catch (error) {
    dispatch(actions.addContactError(error.message));
    if (error.response.status === 400) {
      toast.error('Contact creation error!');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
    // toast.error('Something went wrong! Please try again!');
  }
};

const deleteContact = id => async dispatch => {
  dispatch(actions.deleteContactRequest());
  try {
    await api.deleteContact(id);
    dispatch(actions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(actions.deleteContactError(error.message));
    if (error.response.status === 404) {
      toast.info("There is no such user's collection!");
    } else if (error.response.status === 500) {
      toast.error('Server error! Please try later.');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  }
};

const editContact = (id, name, number) => async dispatch => {
  const contact = { name, number };

  dispatch(actions.editContactRequest());
  try {
    const { data } = await api.updateContact(id, contact);
    dispatch(actions.editContactSuccess(data));
  } catch (error) {
    dispatch(actions.editContactError(error.message));
    if (error.response.status === 400) {
      toast.error('Contact creation error!');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  }
};
export default { fetchContacts, addContact, deleteContact, editContact };
