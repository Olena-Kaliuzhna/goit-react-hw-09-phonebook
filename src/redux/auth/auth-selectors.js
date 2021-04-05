const getIsAuthenticated = state => state.auth.isAuthenticated;

const getUsername = state => state.auth.user.name;
const getError = state => state.contacts.error;
const getToken = state => !!state.auth.token;
export default {
  getIsAuthenticated,
  getUsername,
  getError,
  getToken,
};
