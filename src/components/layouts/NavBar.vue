<template>
  <header
    id="nav-bar"
    v-if="!isLoginModalVisible"
    :class="{ solidColor: changeNavStyle }"
  >
    <div class="logo-container">
      <router-link to="/" class="logo-icon">
        <img
          src="../../assets/logo/Pexels-Logo.jpeg"
          alt="Picture of logo"
          title="Free Stock Photos"
          @click="closeMobileNav"
        />
      </router-link>
      <router-link to="/" class="logo-text nav-link">Develop</router-link>
      <div class="search-bar-container" v-if="changeNavStyle">
        <input
          type="text"
          placeholder="Search for free photos"
          @input="setSearchKeyword"
          @keyup.enter="
            toExplorer();
            closeMobileNav();
          "
          :value="searchKeyword"
        />
        <button
          class="search-bar-btn"
          @click="
            toExplorer();
            closeMobileNav();
          "
        >
          <ion-icon name="search-outline" class="search-bar-icon"></ion-icon>
        </button>
      </div>
    </div>
    <nav>
      <ul class="nav-desktop">
        <li>
          <router-link to="/explorer" class="nav-link">Explore</router-link>
        </li>
        <li>
          <router-link to="#" class="nav-link">License</router-link>
        </li>
        <li>
          <router-link to="#" class="nav-link">Partners</router-link>
        </li>
        <li v-if="userIsAuthenticated" class="notificationIconContainer">
          <button>
            <ion-icon
              name="notifications-outline"
              class="notifications-outline"
            ></ion-icon>
          </button>
        </li>
        <li
          v-if="userIsAuthenticated"
          class="userPanelContainer"
          @mouseenter="showSubmenu"
          @mouseleave="hideSubmenu"
        >
          <div>
            <img src="../../assets/logo/user.png" alt="" />
          </div>
          <div>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          <div
            class="userPanelContainer-submenu"
            :class="{ on: isSubmenuVisible }"
          >
            <div class="greetings-container-desktop" v-if="userIsAuthenticated">
              <h1>{{ userFullName }}</h1>
            </div>
            <ul>
              <li>
                <router-link to="#">Your Profile</router-link>
              </li>
              <li>
                <router-link to="#">Your Collections</router-link>
              </li>
              <li>
                <router-link to="#">Settings</router-link>
              </li>
              <li>
                <router-link to="#">Change Language</router-link>
              </li>
              <li>
                <router-link to="#" @click="logout">Logout</router-link>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="userIsAuthenticated">
          <router-link to="/upload" class="nav-cta nav-link"
            >Upload</router-link
          >
        </li>
        <li v-else>
          <router-link
            to=""
            class="nav-cta nav-link"
            @click="showLoginModal(true)"
            >Login</router-link
          >
        </li>
      </ul>
      <div class="mobile-userPanelContainer">
        <div class="mobile-ham-container" v-if="userIsAuthenticated">
          <ion-icon
            name="notifications-outline"
            class="mobile-notification-icon"
          ></ion-icon>
        </div>
        <div class="mobile-ham-container" @click="toggleMobileNav">
          <ion-icon
            name="reorder-three-outline"
            class="mobile-ham-icon"
          ></ion-icon>
        </div>
      </div>
      <div class="mobile-nav-container" :class="{ on: isMobileNavVisible }">
        <div class="greetings-container-mob" v-if="userIsAuthenticated">
          <img src="../../assets/logo/user.png" alt="" />
          <h1>{{ userFullName }}</h1>
        </div>
        <ul>
          <li>
            <router-link class="mobile-nav-link" to="/" @click="closeMobileNav"
              >Home</router-link
            >
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <router-link
              class="mobile-nav-link"
              to="/explorer"
              @click="closeMobileNav"
              >Explore Photos</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link" to="#"
              >Popular Searches</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link" to="#"
              >Free Videos</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link" to="#">Challenges</router-link>
          </li>
          <li>
            <router-link class="mobile-nav-link" to="#"
              >Leaderboard</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link" to="#"
              >Pexels Blog</router-link
            >
          </li>
        </ul>
        <hr />
        <ul v-if="!userIsAuthenticated">
          <li>
            <router-link
              class="mobile-nav-link style-thin"
              to=""
              @click="
                toggleMobileNav();
                showLoginModal(true);
              "
              >Login</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Join</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Change Language</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >License</router-link
            >
          </li>
        </ul>
        <ul v-else>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Your Profile</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Change Language</router-link
            >
          </li>
          <li>
            <router-link
              class="mobile-nav-link style-thin"
              to="/upload"
              @click="toggleMobileNav"
              >Upload</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >License</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link
              class="mobile-nav-link style-thin"
              to="#"
              @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Apps And Ps Plugin</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >FAQ</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >About us</router-link
            >
          </li>
          <li>
            <router-link class="mobile-nav-link style-thin" to="#"
              >Imprint &amp; Terms</router-link
            >
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <router-link to="#" class="">
              <img
                src="../../assets/logo/facebook.png"
                alt="Logo of Facebook"
              />
            </router-link>
          </li>
          <li>
            <router-link to="#" class="">
              <img src="../../assets/logo/twitter.png" alt="Logo of Twitter" />
            </router-link>
          </li>
          <li>
            <router-link to="#" class="">
              <img
                src="../../assets/logo/instagram.png"
                alt="Logo of Instagram"
              />
            </router-link>
          </li>
          <li>
            <router-link to="#" class="">
              <img
                src="../../assets/logo/pinterest.png"
                alt="Logo of Pinterest"
              />
            </router-link>
          </li>
          <li>
            <router-link to="#" class="">
              <img src="../../assets/logo/youtube.png" alt="Logo of Youtube" />
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <transition name="default">
    <login-modal
      v-if="isLoginModalVisible"
      @showLoginModal="showLoginModal"
    ></login-modal>
  </transition>
</template>

<script>
import LoginModal from "./LoginModal.vue";
let timer;

export default {
  components: {
    "login-modal": LoginModal,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isSubmenuVisible: false,
      scrollPosition: null,
      isMobileNavVisible: false,
    };
  },
  methods: {
    showLoginModal(bool) {
      this.isLoginModalVisible = bool;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
      this.isSubmenuVisible = false;
      this.isMobileNavVisible = false;
    },
    showSubmenu() {
      this.isSubmenuVisible = true;
      clearTimeout(timer);
    },
    hideSubmenu() {
      timer = setTimeout(() => {
        this.isSubmenuVisible = false;
      }, 500);
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    toggleMobileNav() {
      this.isMobileNavVisible = !this.isMobileNavVisible;
    },
    closeMobileNav() {
      this.isMobileNavVisible = false;
    },
    setSearchKeyword(event) {
      this.$store.dispatch("photos/setSearchKeyword", event.target.value);
    },
    toExplorer() {
      this.$router.push("/explorer");
    },
  },
  computed: {
    userIsAuthenticated() {
      return this.$store.getters.userIsAuthenticated;
    },
    userFullName() {
      return this.$store.getters.userFullName;
    },
    changeNavStyle() {
      return this.isMobileNavVisible || this.scrollPosition > 100;
    },
    searchKeyword() {
      return this.$store.getters["photos/getSearchKeyword"];
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  height: 6.6rem;
  padding: 0.8rem 1.6rem;
  position: fixed;
  width: 100%;
  z-index: 2;
}
header.solidColor {
  background-color: #232a34;
}
nav ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 3.8rem;
}
.nav-link:link,
.nav-link:visited {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  transition: all 0.1s ease-out;
}
.nav-link:hover,
.nav-link:active {
  opacity: 0.75;
  transform: translateY(-0.1rem);
}
div .logo-text {
  font-size: 1.9rem;
  font-weight: 500;
}
.nav-cta {
  font-weight: 700;
  padding: 1.2rem 3rem;
  background-color: #05a081;
  border-radius: 4px;
  transition: all 0.2s ease-out;
}
div img {
  width: 4rem;
  height: 4rem;
  border-radius: 8px;
  margin-top: 0.4rem;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  max-width: 89rem;
  margin-right: 3rem;
}
.notificationIconContainer button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
}
.notifications-outline {
  color: #fff;
  width: 100%;
  height: 100%;
  transition: all 0.1s ease-out;
}
.userPanelContainer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.1s ease-out;
  cursor: pointer;
}
.userPanelContainer:hover {
  transform: translateY(-0.1rem);
}
.notificationIconContainer:hover {
  opacity: 0.75;
  transform: translateY(-0.1rem);
}
.userPanelContainer div img {
  filter: invert(100%);
  width: 2rem;
  height: 2rem;
}
.userPanelContainer div:nth-child(2) {
  color: #fff;
  display: flex;
  align-items: center;
}
.userPanelContainer-submenu {
  display: none;
  background-color: #fff;
  position: absolute;
  top: 4.5rem;
  right: 0;
  width: 20rem;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 3px 3px 5px 0.5px rgba(0, 0, 0, 0.1);
}
.userPanelContainer-submenu::after {
  content: "";
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  background-color: #fff;
  z-index: -1;
  position: absolute;
  top: -0.2rem;
  right: 0.8rem;
  transform: rotate(-45deg);
}
.userPanelContainer-submenu ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}
.userPanelContainer-submenu a:link,
.userPanelContainer-submenu a:visited {
  text-decoration: none;
  color: #5e5e5e;
  font-weight: 600;
  font-size: 1.6rem;
}
.userPanelContainer-submenu a:hover,
.userPanelContainer-submenu a:active {
  color: #000;
}
.search-bar-container {
  display: flex;
  position: relative;
  align-items: center;
  margin-left: 1rem;
  flex: 1 1 auto;
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
input {
  border-radius: 5px;
  width: 100%;
  padding: 1.4rem 6.5rem 1.4rem 1.4rem;
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
.mobile-userPanelContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.mobile-ham-container {
  display: none;
  width: 4.8rem;
  height: 4.8rem;
  cursor: pointer;
}
.mobile-ham-container:hover {
  opacity: 0.7;
}
.mobile-ham-icon {
  width: 100%;
  height: 100%;
  color: #fff;
  opacity: 0.9;
}
.mobile-notification-icon {
  width: 65%;
  height: 65%;
  color: #fff;
  opacity: 0.85;
}
.mobile-nav-container {
  display: none;
  color: white;
  position: absolute;
  top: 6.6rem;
  left: 0;
  background-color: #232a34;
  width: 100%;
  height: 100vh;
  padding: 4.5rem 1.5rem;
  overflow: scroll;
}
.mobile-nav-container ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
}
.mobile-nav-container ul:last-child {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
  margin-bottom: 5rem;
}
.mobile-nav-container ul:last-child a:link {
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
}
.mobile-nav-container ul:last-child a:link img {
  width: 100%;
  height: 100%;
  filter: invert(100%);
  opacity: 0.9;
}

.mobile-nav-container hr {
  margin: 2.5rem 0;
  height: 1px;
  opacity: 0.3;
}
.mobile-nav-link:link,
.mobile-nav-link:visited {
  position: relative;
  color: #fff;
  opacity: 0.7;
  text-decoration: none;
  font-size: 2.3rem;
  font-weight: 400;
}
.mobile-nav-link:hover,
.mobile-nav-link:active {
  opacity: 1;
}
.mobile-nav-link:hover:after {
  content: "";
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  top: -0.1rem;
  left: -4rem;
}
.mobile-nav-link:link.style-thin {
  font-size: 2.1rem;
  font-weight: 300;
}
.on {
  display: block;
}
.greetings-container-desktop {
  margin-bottom: 1.5rem;
}
.greetings-container-desktop h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #5e5e5e;
  letter-spacing: -0.5px;
}
.greetings-container-mob {
  margin-bottom: 3.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  opacity: 0.7;
}
.greetings-container-mob img {
  filter: invert(100%);
  width: 5.2rem;
  height: 5.2rem;
}
.greetings-container-mob h1 {
  font-size: 3.6rem;
  letter-spacing: -1.5px;
}
/* max-width: 800px */
@media (max-width: 50em) {
  .nav-desktop,
  .logo-text.nav-link {
    display: none;
  }
  .mobile-ham-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-container {
    margin-right: 1.5rem;
  }
}
</style>
