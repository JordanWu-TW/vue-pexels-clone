export default {
  setUser(state, payload) {
    if (payload.idToken !== undefined) {
      state.token = payload.idToken;
    }
    if (payload.localId !== undefined) {
      state.id = payload.localId;
    }
    if (payload.firstName !== undefined) {
      state.firstName = payload.firstName;
    }
    if (payload.lastName !== undefined) {
      state.lastName = payload.lastName;
    }
  },
};
