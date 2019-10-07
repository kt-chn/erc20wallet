import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import App from "./app.vue";
import Top from "./top.vue";
import Generate from "./generate.vue";

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
Vue.use(KeenUI);

import "./style.css";

const router = new VueRouter({
    mode: "history",
    base: env.ROOT_BASE,
    routes: [{ path: "/", component: Top }, { path: "/generate", component: Generate }]
});

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});