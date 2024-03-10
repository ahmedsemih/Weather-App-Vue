import {
  RiCelsiusLine,
  RiFahrenheitLine,
  HiLocationMarker,
  IoSearch,
  MdRefresh,
  FaBookmark,
  FaRegularBookmark,
  PrSpinner,
  BiSunriseFill,
  BiSunsetFill,
  RiCompassDiscoverLine,
  MdRemoveredeyeRound,
  GiFog,
  WiDayCloudyWindy,
  WiDayFog,
  BiJournalBookmarkFill,
} from "oh-vue-icons/icons";
import { createApp } from "vue";
import { createPinia } from "pinia";
import VueCookies from "vue-cookies";
import { VueQueryPlugin } from "vue-query";
import * as VueCarousel from "vue3-carousel";
import { OhVueIcon, addIcons } from "oh-vue-icons";

import "./assets/main.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
addIcons(
  RiCelsiusLine,
  RiFahrenheitLine,
  HiLocationMarker,
  IoSearch,
  MdRefresh,
  FaBookmark,
  FaRegularBookmark,
  PrSpinner,
  BiSunriseFill,
  BiSunsetFill,
  RiCompassDiscoverLine,
  MdRemoveredeyeRound,
  GiFog,
  WiDayCloudyWindy,
  WiDayFog,
  BiJournalBookmarkFill
);

app.use(pinia);
app.use(router);
app.use(VueCookies);
app.use(VueCarousel);
app.use(VueQueryPlugin);
app.component("v-icon", OhVueIcon);

app.mount("#app");
