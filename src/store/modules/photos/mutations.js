export default {
  setPhotos(state, payload) {
    state.photos = payload;
  },
  setSearchKeyword(state, payload) {
    state.searchKeyword = payload;
  },
  resetSearchKeyword(state) {
    state.searchKeyword = "";
  },
};
