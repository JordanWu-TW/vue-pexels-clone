<template>
  <index-hero></index-hero>
  <transition name="default" appear>
    <index-cta></index-cta>
  </transition>
</template>

<script>
import IndexHero from "../components/sections/IndexHero.vue";
import IndexCta from "../components/sections/IndexCta.vue";

export default {
  components: {
    "index-hero": IndexHero,
    "index-cta": IndexCta,
  },
};
</script>

<style scoped></style>
