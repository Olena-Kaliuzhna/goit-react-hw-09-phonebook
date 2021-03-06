import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import actions from './phoneBook-actions';
const {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
  changeFilter,
  clearError,
} = actions;

const initialState = {
  contacts: [],
  filter: '',
  loading: false,
  error: null,
};
const items = createReducer(initialState.contacts, {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [editContactSuccess]: (state, { payload }) => [...state, payload],
});

const filter = createReducer(initialState.filter, {
  [changeFilter]: (_, { payload }) => payload,
});

const onError = (_, { payload }) => payload;

const loading = createReducer(initialState.loading, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,

  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,

  [deleteContactRequest]: () => true,
  [deleteContactSuccess]: () => false,
  [deleteContactError]: () => false,

  [editContactRequest]: () => true,
  [editContactSuccess]: () => false,
  [editContactError]: () => false,
});

const error = createReducer(initialState.error, {
  [fetchContactsError]: onError,
  [addContactError]: onError,
  [deleteContactError]: onError,
  [editContactError]: onError,
  [clearError]: () => null,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});
