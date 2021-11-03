let timer;
const API_KEY = "AIzaSyCfPSzzBRdwd3Ds5sToM7LBWWmyB9VGEXk";

export default {
  async createAccount(context, payload) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "Error in createAccount"
      );
      throw error;
    }
    await context.dispatch("createUser", {
      ...payload,
      localId: responseData.localId,
    });
    context.commit("setUser", {
      idToken: responseData.idToken,
      localId: responseData.localId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    context.dispatch("setLocalStorageAndTimer", {
      idToken: responseData.idToken,
      localId: responseData.localId,
      expirationDate: expirationDate,
      expiresIn: expiresIn,
    });
  },
  async createUser(context, payload) {
    const url = `https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/users/${payload.localId}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: payload.localId,
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    });
    if (!response.ok) {
      const error = new Error("Error in createUser");
      throw error;
    }
  },
  async getUser(context, payload) {
    const url = `https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/users/${payload}.json`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  },
  async login(context, payload) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.error.message || "Error in login");
      throw error;
    }
    context.commit("setUser", {
      idToken: responseData.idToken,
      localId: responseData.localId,
    });
    context.dispatch("setUserName", responseData.localId);
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    context.dispatch("setLocalStorageAndTimer", {
      idToken: responseData.idToken,
      localId: responseData.localId,
      expirationDate: expirationDate,
      expiresIn: expiresIn,
    });
  },
  async setUserName(context, payload) {
    const url = `https://vue-http-01-ece99-default-rtdb.asia-southeast1.firebasedatabase.app/users/${payload}.json`;
    const response = await fetch(url);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error("Error in setUserName");
      throw error;
    }
    context.commit("setUser", {
      firstName: responseData.firstName,
      lastName: responseData.lastName,
    });
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("setUser", {
      idToken: null,
      localId: null,
      firstName: null,
      lastName: null,
    });
  },
  tryAutoLogin(context) {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("logout");
    }, expiresIn);
    if (token && id) {
      context.commit("setUser", {
        idToken: token,
        localId: id,
      });
      context.dispatch("setUserName", id);
    }
  },
  setLocalStorageAndTimer(context, payload) {
    localStorage.setItem("token", payload.idToken);
    localStorage.setItem("id", payload.localId);
    localStorage.setItem("tokenExpiration", payload.expirationDate);
    timer = setTimeout(() => {
      context.dispatch("logout");
    }, payload.expiresIn);
  },
};
