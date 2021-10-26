export default {
  userIsAuthenticated(state) {
    return !!state.token;
  },
  userFullName(state) {
    return `${state.firstName} ${state.lastName}`;
  },
};
