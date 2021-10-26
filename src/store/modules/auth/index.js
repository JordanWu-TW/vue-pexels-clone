import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      token: null,
      id: null,
      firstName: null,
      lastName: null,
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
