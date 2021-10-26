<template>
  <div class="container">
    <div class="section-cta">
      <div class="section-cta-left">
        <h1>Join the Pexels community</h1>
        <p>Take your photography to the next level. Get it seen by millions.</p>
        <button class="cta-btn">
          <img
            src="../../assets/logo/facebook-app-logo.png"
            alt="Picture of Facebook logo"
          />
          <span>Join with Facebook</span>
        </button>
        <p>OR</p>
        <form action="" @submit.prevent="createAccount">
          <div class="form-input-container-name-inner">
            <input
              type="text"
              class="form-firstname"
              placeholder="First name"
              v-model="userObj.firstName"
            />
            <input
              type="text"
              class="form-lastname"
              placeholder="Last name (optional)"
              v-model="userObj.lastName"
            />
            <small
              class="formValidationMsg formValidationMsg-firstName"
              v-if="firstNameIsError"
              >{{ formValidation.firstName }}</small
            >
          </div>
          <div class="form-input-container">
            <input
              type="email"
              name="email"
              class="form-email"
              placeholder="Email"
              v-model="userObj.email"
            />
            <small class="formValidationMsg" v-if="emailIsError">{{
              formValidation.email
            }}</small>
          </div>
          <div class="form-input-container">
            <input
              type="password"
              name="password"
              class="form-password"
              placeholder="Password"
              autocomplete="on"
              v-model="userObj.password"
              title="6 characters minimum"
            />
            <small class="formValidationMsg" v-if="passwordIsError">{{
              formValidation.password
            }}</small>
          </div>
          <button class="cta-btn-create">{{ ctaButtonDisplayText }}</button>
        </form>
        <small
          >By joining, you agree to our Terms of Service and Privacy
          Policy</small
        >
      </div>
      <div class="section-cta-right">
        <div class="featured-in-container">
          <div class="featured-in-imgs">
            <img
              src="../../assets/index/featured-in/forbes.png"
              alt="Picture of Forbes brand"
            />
            <img
              src="../../assets/index/featured-in/usa-today.png"
              alt="Picture of USA TODAY brand"
            />
            <img
              src="../../assets/index/featured-in/business-insider.png"
              alt="Picture of Business Insider brand"
            />
            <img
              src="../../assets/index/featured-in/the-new-york-times.png"
              alt="Picture of The New York Times brand"
            />
          </div>
        </div>
        <iframe src="https://www.youtube.com/embed/h9QPhI7UDjo" allowfullscreen>
        </iframe>
        <div class="happy-customer-container">
          <div class="happy-customers">
            <img
              src="../../assets/index/customers/customer-1.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/customer-2.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/customer-3.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/customer-4.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/customer-5.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/customer-6.jpg"
              alt="Picture of happy customer"
            />
            <img
              src="../../assets/index/customers/ben.jpg"
              alt="Picture of happy customer"
            />
          </div>
          <p><span>250,000+</span> content creators on site!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      userObj: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      },
      formValidation: {
        initialFormValidation: false,
        firstName: null,
        email: null,
        password: null,
      },
    };
  },
  computed: {
    firstNameIsError() {
      return !!this.formValidation.firstName;
    },
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
        return "Create New Account";
      }
    },
  },
  methods: {
    async createAccount() {
      this.resetFormValidation();
      this.initialFormValidation();
      try {
        if (this.formValidation.initialFormValidation) {
          this.isLoading = true;
          await this.$store.dispatch("createAccount", this.userObj);
          this.isLoading = false;
        }
      } catch (err) {
        if (err.message === "INVALID_EMAIL") {
          this.formValidation.email = "*Invalid email";
        }
        if (err.message === "EMAIL_EXISTS") {
          this.formValidation.email =
            "*Email has already registered, please try again";
        }
        if (err.message.includes("WEAK_PASSWORD")) {
          this.formValidation.password =
            "*Password should be at least 6 characters";
        }
        this.isLoading = false;
      }
    },
    resetFormValidation() {
      this.formValidation.firstName = null;
      this.formValidation.email = null;
      this.formValidation.initialFormValidation = false;
      this.formValidation.password = null;
    },
    initialFormValidation() {
      if (
        this.userObj.firstName === null ||
        this.userObj.firstName.trim === ""
      ) {
        this.formValidation.firstName = "*First name must not be empty";
        return;
      }
      if (this.userObj.email === null || this.userObj.email.trim === "") {
        this.formValidation.email = "*Email must not be empty";
        return;
      }
      if (this.userObj.password === null || this.userObj.password.trim === "") {
        this.formValidation.password = "*Password must not be empty";
        return;
      }
      this.formValidation.initialFormValidation = true;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 140rem;
  margin: 0 auto;
}
.section-cta {
  display: grid;
  grid-template-columns: 4fr 6fr;
}
.section-cta-left {
  padding: 6rem 5.5rem 6rem 5.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.section-cta-left h1 {
  font-size: 4.3rem;
  letter-spacing: -2px;
  line-height: 1.3;
  font-weight: 700;
}
.section-cta-left p:nth-child(2) {
  font-size: 2.15rem;
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: -1px;
  line-height: 1.4;
  margin: 0 0 1.4rem 0;
}
.cta-btn {
  border: none;
  background-color: #4267b2;
  padding: 1.4rem 0;
  color: #fff;
  font-weight: 700;
  font-size: 1.6rem;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  margin: 0 0 1.4rem 0;
}
.cta-btn:hover {
  background-color: #5074be;
}
.cta-btn img {
  filter: invert(100%);
  width: 2.7rem;
  height: 2.7rem;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}
.section-cta-left p:nth-child(4) {
  font-size: 1.6rem;
  color: #9e9e9e;
  letter-spacing: -0.5px;
  margin: 0 0 1.4rem 0;
}
form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  row-gap: 3rem;
}
input {
  font-size: 1.6rem;
  color: #495057;
  background-color: #f1f1f1;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  border: 2px solid transparent;
}
input::placeholder {
  color: #a9a9a9;
}
input:focus {
  background-color: #fff;
  border: 2px solid #05a081;
}
.form-input-container-name-inner {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.form-input-container-name-inner input {
  flex: 1 1 auto;
}
.form-input-container-name-inner input:first-child {
  margin-right: 1rem;
}
.form-input-container {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
}
.form-password {
  letter-spacing: 2px;
}
.form-password::placeholder {
  letter-spacing: normal;
}
.cta-btn-create {
  border: none;
  background-color: #05a081;
  padding: 1rem;
  color: #fff;
  font-size: 1.6rem;
  border-radius: 3px;
  cursor: pointer;
  grid-column: 1 / -1;
  margin: 0 0 1.4rem 0;
}
.cta-btn-create:hover {
  background-color: #06b995;
}
small {
  color: #9e9e9e;
  font-size: 1.2rem;
}
.section-cta-right {
  padding: 6rem 5.5rem 6rem 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
iframe {
  border: none;
  border-radius: 5px;
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
  width: 100%;
  height: 70%;
}
.happy-customers {
  display: flex;
}
.happy-customers img {
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-right: -1.6rem;
}
.happy-customer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.8rem;
}
.happy-customer-container p {
  font-weight: 500;
  color: #495057;
  font-size: 1.8rem;
}
.happy-customer-container p span {
  font-weight: 700;
  color: #05a081;
}
.featured-in-imgs {
  display: flex;
  justify-content: space-around;
}
.featured-in-imgs img {
  height: 3.2rem;
  opacity: 0.75;
  transition: all 0.2s;
}
.featured-in-imgs img:hover {
  transform: scale(1.05);
}
.formValidationMsg {
  align-self: flex-start;
  color: red;
  padding: 0.5rem 0 0 1rem;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: -1.2rem;
}
/* max-width: 1248px */
@media (max-width: 78em) {
  .form-input-container-name-inner {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .form-input-container-name-inner input:first-child {
    margin-right: 0;
    order: 1;
  }
  .form-input-container-name-inner input:nth-child(2) {
    order: 3;
  }
  .formValidationMsg-firstName {
    order: 2;
    margin-top: -3rem;
  }
  .featured-in-imgs img {
    height: 3rem;
  }
}
/* max-width: 992px */
@media (max-width: 62em) {
  .featured-in-imgs img {
    height: 2.8rem;
  }
}
/* max-width: 800px */
@media (max-width: 50em) {
  .section-cta {
    grid-template-columns: 100%;
  }
  .section-cta-left {
    padding: 6rem 18rem 6rem;
  }
  .section-cta-right {
    gap: 3rem;
  }
  iframe {
    height: 50rem;
  }
}
/* max-width: 640px */
@media (max-width: 40em) {
  .section-cta-left {
    padding: 6rem 15rem 6rem;
  }
}
/* max-width: 544px */
@media (max-width: 34em) {
  .section-cta-left {
    padding: 6rem 12rem 6rem;
  }
  iframe {
    height: 32rem;
  }
}
/* max-width: 448px */
@media (max-width: 28em) {
  .section-cta-left {
    padding: 6rem 6rem 6rem;
  }
  iframe {
    height: 26rem;
  }
  .happy-customers img {
    width: 4.8rem;
    height: 4.8rem;
  }
  .featured-in-imgs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    gap: 3rem;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  .section-cta-left {
    padding: 6rem 4rem 6rem;
  }
  .section-cta-right {
    padding: 6rem 4rem 6rem;
  }
}
</style>
