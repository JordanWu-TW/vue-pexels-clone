<template>
  <div class="container" @click.self="showLoginModal(false)">
    <nav>
      <router-link to="/" class="nav-logo-link" @click="showLoginModal(false)">
        <img src="../../assets/img/Pexels-Logo.jpeg" alt="Picture of logo" />
      </router-link>
      <div>
        <p>New to Pexels?</p>
        <router-link to="#" class="nav-join-link">
          <button>Join</button>
        </router-link>
      </div>
    </nav>
    <div class="sign-in-container">
      <h1>Welcome Back To Pexels</h1>
      <button class="social-media-login-btn facebook-login-btn">
        <img
          src="../../assets/img/facebook-app-logo.png"
          alt="Picture of Facebook logo"
        />
        <span>Login with Facebook</span>
      </button>
      <button class="social-media-login-btn apple-login-btn">
        <img
          src="../../assets/img/apple-black-logo.png"
          alt="Picture of Apple logo"
        />
        <span>Login with Apple</span>
      </button>
      <p>OR</p>
      <form action="" @submit.prevent="login">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            v-model="inputObj.email"
          />
          <small class="formValidationMsg" v-if="emailIsError">{{
            formValidation.email
          }}</small>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="on"
            v-model="inputObj.password"
          />
          <small class="formValidationMsg" v-if="passwordIsError">{{
            formValidation.password
          }}</small>
        </div>
        <button class="login-btn">{{ ctaButtonDisplayText }}</button>
      </form>
      <small>Forgot your password?</small>
    </div>
    <footer>
      <ul>
        <li>
          <router-link to="#">About Pexels</router-link>
        </li>
        <li>
          <router-link to="#">Videos</router-link>
        </li>
        <li>
          <router-link to="#">Collections</router-link>
        </li>
        <li>
          <router-link to="#">Challenges</router-link>
        </li>
        <li>
          <router-link to="#">Imprint</router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  emits: ["showLoginModal"],
  data() {
    return {
      isLoading: false,
      inputObj: {
        email: null,
        password: null,
      },
      formValidation: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    emailIsError() {
      return !!this.formValidation.email;
    },
    passwordIsError() {
      return !!this.formValidation.password;
    },
    ctaButtonDisplayText() {
      if (this.isLoading) {
        return "Loading...";
      } else {
        return "Login";
      }
    },
  },
  methods: {
    showLoginModal(bool) {
      this.$emit("showLoginModal", bool);
    },
    async login() {
      this.resetFormValidation();
      try {
        this.initialFormValidation();
        this.isLoading = true;
        await this.$store.dispatch("login", {
          email: this.inputObj.email,
          password: this.inputObj.password,
        });
        this.isLoading = false;
        this.showLoginModal(false);
      } catch (err) {
        if (err.message === "EMAIL_EMPTY") {
          this.formValidation.email = "*Email must not be empty";
        }
        if (err.message === "PASSWORD_EMPTY") {
          this.formValidation.password = "*Password must not be empty";
        }
        if (err.message === "EMAIL_NOT_FOUND") {
          this.formValidation.email = "*Email not found, please try again";
        }
        if (err.message === "INVALID_PASSWORD") {
          this.formValidation.password =
            "*Incorrect password, please try again";
        }
        this.isLoading = false;
      }
    },
    resetFormValidation() {
      this.formValidation.email = null;
      this.formValidation.password = null;
    },
    initialFormValidation() {
      if (this.inputObj.email === null || this.inputObj.email.trim() === "") {
        const error = new Error("EMAIL_EMPTY");
        throw error;
      }
      if (
        this.inputObj.password === null ||
        this.inputObj.password.trim() === ""
      ) {
        const error = new Error("PASSWORD_EMPTY");
        throw error;
      }
    },
  },
  created() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.$emit("showLoginModal", false);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.container {
  @include fullScreenSize;
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.6));
  position: fixed;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem;
  .nav-logo-link:link {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    border-radius: 3px;
    overflow: hidden;
    img {
      @include fullSize;
    }
  }
  div {
    @include flexCenter;
    gap: 1rem;
    p {
      color: $color-white;
    }
    button {
      border: 1px solid rgba(26, 26, 26, 0.15);
      background-color: $color-white;
      font-size: 1.6rem;
      font-weight: 700;
      color: $color-text-dark;
      padding: 1.2rem 2.1rem;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}

.sign-in-container {
  position: relative;
  align-self: center;
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  padding: 3.5rem 2rem;
  border-radius: 0.6rem;
  width: 48.5rem;
  gap: 1.5rem;
  h1 {
    align-self: center;
    font-size: 3.4rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  p {
    align-self: center;
    font-size: 1.2rem;
    color: #000;
    font-weight: 600;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    div {
      display: flex;
      flex-direction: column;
    }
    input {
      font-size: 1.6rem;
      color: $color-text-dark;
      border: 1px solid #d3d3d3;
      padding: 1.3rem 1.5rem;
      border-radius: 3px;
      &:focus {
        border-color: $color-primary;
      }
      &::placeholder {
        color: #a9a9a9;
      }
      &[type="password"] {
        letter-spacing: 2px;
      }
      &[type="password"]::placeholder {
        letter-spacing: normal;
      }
    }
    .login-btn {
      border: none;
      background-color: $color-primary;
      padding: 1.4rem 2.1rem;
      color: $color-white;
      font-size: 1.6rem;
      border-radius: 3px;
      cursor: pointer;
      font-weight: 700;
      margin-top: 0.8rem;
      &:hover {
        background-color: $color-primary-hover;
      }
    }
  }
  .formValidationMsg {
    align-self: flex-start;
    color: $color-red;
    padding: 0 0 0 1rem;
    font-weight: 500;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  small {
    align-self: center;
    color: #5e5e5e;
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: 1.5rem;
  }
}

.social-media-login-btn {
  border: none;
  padding: 1.4rem 0;
  color: $color-white;
  font-weight: 700;
  font-size: 1.6rem;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  img {
    filter: invert(100%);
    width: 2.7rem;
    height: 2.7rem;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
}
.facebook-login-btn {
  background-color: #4267b2;
  &:hover {
    background-color: #5074be;
  }
}
.apple-login-btn {
  background-color: #000;
  margin-bottom: 1.2rem;
  &:hover {
    background-color: #2e2e2e;
  }
}

footer {
  align-self: center;
  padding: 1.4rem;
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 300;
    margin-bottom: 0.2rem;
  }
}
footer ul li a:link,
footer ul li a:visited,
footer ul li a:hover,
footer ul li a:active {
  text-decoration: none;
  color: $color-white;
  white-space: nowrap;
}

/* max-width: 384px */
@media (max-width: 24em) {
  .sign-in-container {
    width: 38.5rem;
  }
  .sign-in-container h1 {
    text-align: center;
  }
}
</style>
