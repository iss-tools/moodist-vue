import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";
import "./styles/main.scss";
import "uno.css";
import App from "./App.vue";
import i18n from "./locales";

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

app.use(pinia);
app.use(i18n);
app.use(head);
app.mount("#app");
