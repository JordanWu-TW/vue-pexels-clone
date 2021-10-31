import { createStore } from "vuex";
import authModule from "./modules/auth/index";
import photoModule from "./modules/photos/index";

const store = createStore({
  modules: {
    auth: authModule,
    photos: photoModule,
  },
});

export default store;
