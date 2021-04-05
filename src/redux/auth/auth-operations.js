import authActions from './auth-actions';
import api from '../../service/phoneBook-api';
import { toast } from 'react-toastify';

const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const { data } = await api.signUp(credentials);

    api.token.set(data.token);
    dispatch(authActions.registerSuccess(data));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
    // if (error.response.status === 400) {
    //   toast.error('User creation error! Please try again!');
    // } else if (error.response.status === 500) {
    //   toast.error('Server error! Please try later!');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
    toast.error('Something went wrong! Please try again!');
  }
};

const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const { data } = await api.logIn(credentials);

    api.token.set(data.token);
    dispatch(authActions.loginSuccess(data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
    return toast.error('Invalid email or password! Try again!');
  }
};

const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await api.logOut();

    api.token.unset();
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
    toast.error('Something went wrong! Please wait and reload the page!');
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  api.token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await api.getCurrentUser();

    dispatch(authActions.getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
    toast.warn('Authorization timed out! Please authenticate again!');
  }
};

export default { register, logIn, logOut, getCurrentUser };
