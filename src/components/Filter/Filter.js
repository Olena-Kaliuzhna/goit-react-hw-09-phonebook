import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import phoneBookActions from '../../redux/phoneBook/phoneBook-actions';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import s from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const onChangeFilter = useCallback(event =>
    dispatch(phoneBookActions.changeFilter(event.currentTarget.value)),
  );

  const value = useSelector(phoneBookSelectors.getFilter);

  return (
    <div className={s.wrapper}>
      <label className={s.field}>
        <span className={s.label}>Find contacts by name</span>
        <input
          className={s.input}
          type="text"
          name="filter"
          value={value}
          placeholder="Enter to find"
          onChange={onChangeFilter}
        />
      </label>
    </div>
  );
}
