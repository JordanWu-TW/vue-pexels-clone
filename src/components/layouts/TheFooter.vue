<template>
  <footer>
    <div class="footer-nav">
      <div class="footer-nav-left">
        <ul>
          <li>
            <router-link to="#">Free Stock Photos</router-link>
          </li>
          <li>
            <router-link to="#">Free Videos</router-link>
          </li>
          <li>
            <router-link to="#">Collections</router-link>
          </li>
          <li>
            <router-link to="#">Challenges</router-link>
          </li>
          <li>
            <router-link to="#">Leaderboard</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-nav-right">
        <button>Sign Up</button>
      </div>
    </div>
    <div class="footer-main">
      <div class="footer-main-col-1">
        <h3>Pexels</h3>
        <ul>
          <li>
            <router-link to="#">About</router-link>
          </li>
          <li>
            <router-link to="#">Blog</router-link>
          </li>
          <li>
            <router-link to="#">FAQ</router-link>
          </li>
          <li>
            <router-link to="#">Become a hero</router-link>
          </li>
          <li>
            <router-link to="#">Partner with Pexels</router-link>
          </li>
          <li>
            <router-link to="#">Image &amp; Video API</router-link>
          </li>
          <li>
            <div class="social-media-container">
              <router-link to="#">
                <img
                  src="../../assets/img/facebook.png"
                  alt="Facebook icon"
                  class="social-media-icon"
                />
              </router-link>
              <router-link to="#">
                <img
                  src="../../assets/img/twitter.png"
                  alt="Twitter icon"
                  class="social-media-icon"
                />
              </router-link>
              <router-link to="#">
                <img
                  src="../../assets/img/instagram.png"
                  alt="Instagram icon"
                  class="social-media-icon"
                />
              </router-link>
              <router-link to="#">
                <img
                  src="../../assets/img/pinterest.png"
                  alt="Pinterest icon"
                  class="social-media-icon"
                />
              </router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer-main-col-2">
        <h3>Apps &amp; Plugins</h3>
        <ul>
          <li>
            <router-link to="#">Pexels for iOS</router-link>
          </li>
          <li>
            <router-link to="#">Pexels for Android</router-link>
          </li>
          <li>
            <router-link to="#">Other plugins &amp; apps</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-main-col-3">
        <h3>Free Stock Photos</h3>
        <ul>
          <li>
            <router-link to="#">Popular searches</router-link>
          </li>
          <li>
            <router-link to="#">Black and white photography</router-link>
          </li>
          <li>
            <router-link to="#">Happy birthday images</router-link>
          </li>
          <li>
            <router-link to="#">Free business videos</router-link>
          </li>
          <li>
            <router-link to="#">Happy new year images</router-link>
          </li>
          <li>
            <router-link to="#">Cool wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Best HD wallpapers</router-link>
          </li>
        </ul>
      </div>
      <div class="footer-main-col-4">
        <h3>Wallpapers</h3>
        <ul>
          <li>
            <router-link to="#">Galaxy wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Lock screen wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Iphone wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">4k wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Samsung wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Love wallpaper</router-link>
          </li>
          <li>
            <router-link to="#">Mobile wallpaper</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-footer">
      <div class="footer-footer-left">
        <router-link to="#">
          <img src="../../assets/img/Pexels-Logo.jpeg" alt="" />
          <p>
            Pexels
            <span
              >— Beautiful free photos contributed by our talented
              community.</span
            >
          </p>
        </router-link>
      </div>
      <div class="footer-footer-right">
        <ul>
          <li>
            <router-link to="#">Terms of Use</router-link>
          </li>
          <li>
            <router-link to="#">Privacy Policy</router-link>
          </li>
          <li>
            <router-link to="#">License</router-link>
          </li>
          <li>
            <router-link to="#">Imprint</router-link>
          </li>
          <li>
            <router-link to="#">
              <button>
                <img
                  src="../../assets/img/en-US-9ac49f52fbe3cc86ef500da8d7dfac4468c0e98419808425a9cdc1af7714cee1.png"
                  alt="American flag"
                />
                <span>English</span>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  background-color: #071b4d;
  font-size: 1.6rem;
}
.footer-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 4.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}
.footer-nav-left ul {
  display: flex;
  gap: 3rem;
  list-style: none;
  margin-right: 4rem;
  align-items: center;
}
.footer-nav-right button {
  background-color: #fff;
  color: #1a1a1a;
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 3px;
  border: none;
  white-space: nowrap;
}
.footer-nav-right button:hover {
  background-color: #f5f5f5;
}
.footer-nav-left a:link,
.footer-nav-left a:visited,
.footer-nav-left a:hover,
.footer-nav-left a:active {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}
.footer-main h3 {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.footer-main a:link,
.footer-main a:visited {
  color: #fff;
  opacity: 0.6;
  text-decoration: none;
}
.footer-main a:hover,
.footer-main a:active {
  opacity: 1;
}
.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr 1.25fr;
  padding: 3.5rem 4.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}
.footer-main div {
  margin-bottom: 0.6rem;
}
.footer-main div ul {
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1rem;
}
.social-media-container {
  margin-top: 0.8rem;
  display: flex;
  gap: 5rem;
}
.social-media-icon {
  width: 1.6rem;
  height: 1.6rem;
  filter: invert(100%);
}
.footer-footer {
  padding: 1.4rem 4.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-footer-right a:link,
.footer-footer-right a:visited {
  color: #fff;
  opacity: 0.6;
  text-decoration: none;
  font-weight: 500;
}
.footer-footer-right a:hover,
.footer-footer-right a:active {
  opacity: 1;
}
.footer-footer-right ul {
  list-style: none;
  display: flex;
  gap: 3.2rem;
  align-items: center;
}
.footer-footer-right button {
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  padding: 0.84rem;
  background: none;
  color: #fff;
  gap: 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
}
.footer-footer-right button:hover span {
  opacity: 1;
}
.footer-footer-right button img {
  height: 2rem;
}
.footer-footer-right button span {
  opacity: 0.6;
}
.footer-footer-left img {
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 3px;
}
.footer-footer-left a:link,
.footer-footer-left a:visited,
.footer-footer-left a:hover,
.footer-footer-left a:active {
  text-decoration: none;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
}
.footer-footer-left a:link span {
  opacity: 0.6;
  font-weight: 400;
}
.footer-footer-left a:link {
  max-width: 38rem;
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  align-items: center;
}
/* max-width: 800px */
@media (max-width: 50em) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    row-gap: 3.5rem;
  }
  .footer-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .footer-nav {
    overflow: scroll;
  }
  .footer-footer-right {
    width: 100%;
    overflow: scroll;
  }
}
</style>
