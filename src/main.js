import { createApp } from "vue";
import { createPinia } from "pinia";
import VueCookies from 'vue-cookies';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiCelsiusLine, RiFahrenheitLine } from "oh-vue-icons/icons";

import "./assets/main.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
addIcons(RiCelsiusLine, RiFahrenheitLine);

app.use(pinia);
app.use(router);
app.use(VueCookies);
app.component('v-icon', OhVueIcon);

app.mount("#app");
