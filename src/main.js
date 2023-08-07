import "./assets/css/main.css";
import "./axios";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Pagination from "v-pagination-3";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faHouse,
    faTag,
    faXmark,
    faBars,
    faStore,
    faShop,
    faUserShield,
    faUser,
    faDollarSign,
    faListCheck,
    faPercent,
    faReceipt,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faHouse,
    faTag,
    faXmark,
    faBars,
    faStore,
    faShop,
    faUserShield,
    faUser,
    faDollarSign,
    faListCheck,
    faPercent,
    faReceipt,
    faArrowRightFromBracket
);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Toast);
app.component("pagination", Pagination);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
