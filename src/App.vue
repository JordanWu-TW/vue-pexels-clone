<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
  <the-footer></the-footer>
</template>

<script>
import NavBar from "./components/layouts/NavBar.vue";
import TheFooter from "./components/layouts/TheFooter.vue";

export default {
  components: {
    "nav-bar": NavBar,
    "the-footer": TheFooter,
  },
  created() {
    this.$store.dispatch("tryAutoLogin");
  },
};
</script>

<style>
html {
  font-size: 62.5%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
body {
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
small,
strong,
em {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
}

/* default transition */
.default-enter-from,
.default-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}
.default-enter-to,
.default-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.default-enter-active {
  transition: all 0.3s ease-out;
}
.default-leave-active {
  transition: all 0.3s ease-in;
}

/* max-width: 1200px */
@media (max-width: 75em) {
  html {
    font-size: 56.25%;
  }
}
/* max-width: 992px */
@media (max-width: 62em) {
  html {
    font-size: 50%;
  }
}
/* max-width: 800px */
@media (max-width: 50em) {
  html {
    font-size: 56.25%;
  }
}
/* max-width: 640px */
@media (max-width: 40em) {
  html {
    font-size: 50%;
  }
}
</style>
