<template>
  <section class="section-hero">
    <div class="hero-img">
      <div class="hero-content">
        <h1>
          The best free stock photos, royalty free images &amp; videos shared by
          creators.
        </h1>
        <div class="search-bar-container">
          <input
            type="text"
            placeholder="Search for free photos and videos"
            @input="setSearchKeyword"
            @keyup.enter="toExplorer"
            :value="searchKeyword"
          />
          <button class="search-bar-btn" @click="toExplorer">
            <ion-icon name="search-outline" class="search-bar-icon"></ion-icon>
          </button>
        </div>
        <div class="search-bar-suggested">
          <span class="suggested-title">Suggested:</span>
          <router-link to="#" class="suggested-item">green leaf</router-link>
          <router-link to="#" class="suggested-item">sky</router-link>
          <router-link to="#" class="suggested-item">food</router-link>
          <router-link to="#" class="suggested-item">landscape 8k</router-link>
          <router-link to="#" class="suggested-item">green</router-link>
          <router-link to="#" class="suggested-item">forest</router-link>
          <router-link to="#" class="suggested-item">more</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    setSearchKeyword(event) {
      this.$store.dispatch("photos/setSearchKeyword", event.target.value);
    },
    toExplorer() {
      this.$router.push("/explorer");
    },
  },
  computed: {
    searchKeyword() {
      return this.$store.getters["photos/getSearchKeyword"];
    },
  },
};
</script>

<style scoped>
.section-hero {
  height: 50rem;
  color: #fff;
}
.hero-img {
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("../../assets/img/pexels-photo-8388979.jpeg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65rem;
}
.hero-content h1 {
  font-size: 3.35rem;
  margin-bottom: 1.2rem;
  line-height: 1.5;
  font-weight: 700;
}
input {
  border-radius: 9px;
  width: 100%;
  padding: 1.8rem 8rem 1.8rem 1.8rem;
  font-size: 1.7rem;
  color: #505050;
  background-color: #f8f8f8;
  border: none;
}
input::placeholder {
  font-size: 1.7rem;
  color: #808080;
}
input:focus {
  background-color: #fff;
}
.search-bar-suggested {
  font-size: 1.4rem;
}
.suggested-title {
  display: inline-block;
  margin-right: 0.8rem;
}
.suggested-item:link,
.suggested-item:visited {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  opacity: 0.7;
  margin-right: 0.5rem;
}
.suggested-item:hover,
.suggested-item:active {
  color: #fff;
  opacity: 0.9;
}
.suggested-item:link::after {
  content: ",";
}
.suggested-item:link:last-child::after {
  content: none;
}
.search-bar-container {
  display: flex;
  margin-bottom: 0.9rem;
  position: relative;
  align-items: center;
}
.search-bar-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.search-bar-icon {
  width: 2rem;
  height: 2rem;
  color: #495057;
}
ion-icon {
  --ionicon-stroke-width: 46px;
}
/* max-width: 544px */
@media (max-width: 34em) {
  .hero-content {
    width: 45rem;
  }
}
/* max-width: 384px */
@media (max-width: 24em) {
  .hero-content {
    width: 38rem;
  }
}
</style>
