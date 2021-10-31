export default {
  async uploadPhoto(context, payload) {
    const userId = context.rootGetters.userId;
    const url = `https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/photos/${payload.uploadId}.json`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        userId: userId,
        url: payload.imgUrl,
        title: payload.title,
        description: payload.description,
      }),
    });
  },
};
