import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import LoadSpinner from "./components/layouts/LoadSpinner.vue";

const app = createApp(App);

app.component("load-spinner", LoadSpinner);

app.use(router);
app.use(store);

app.mount("#app");
