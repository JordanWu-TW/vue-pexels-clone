export default {
  userIsAuthenticated(state) {
    return !!state.token;
  },
  userFullName(state) {
    if (state.lastName === null) {
      return state.firstName;
    }
    return `${state.firstName} ${state.lastName}`;
  },
  userId(state) {
    return state.id;
  },
};
