export default {
  async uploadPhoto(context, payload) {
    const userId = context.rootGetters.userId;
    const url = `https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/photos/${payload.uploadId}.json`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        userId: userId,
        photoId: payload.uploadId,
        url: payload.imgUrl,
        title: payload.title,
        description: payload.description,
        createTime: payload.createTime,
      }),
    });
  },
  async loadAllPhotos(context) {
    const url =
      "https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/photos.json";
    const response = await fetch(url);
    const responseData = await response.json();
    const photos = [];
    for (const data in responseData) {
      const photo = {
        userId: responseData[data].userId,
        photoId: responseData[data].photoId,
        imgUrl: responseData[data].url,
        title: responseData[data].title,
        description: responseData[data].description,
        createTime: responseData[data].createTime,
      };
      photos.unshift(photo);
    }
    context.commit("setPhotos", photos);
  },
  setSearchKeyword(context, payload) {
    context.commit("setSearchKeyword", payload);
  },
  resetSearchKeyword(context) {
    context.commit("resetSearchKeyword");
  },
};
