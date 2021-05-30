import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { requireAuth: false },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { requireAuth: false },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/popularlist",
    name: "PopularList",
    component: () => import("../views/PopularList.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/friends",
    name: "Friends",
    component: () => import("../views/Friends.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/yourlist",
    name: "YourList",
    component: () => import("../views/YourList.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/addfriend",
    name: "AddFriend",
    component: () => import("../views/AddFriend.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/addtomylist",
    name: "AddToList",
    component: () => import("../views/AddToList.vue"),
    meta: { requireAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && firebase.auth().currentUser) {
    next();
  } else if (to.meta.requireAuth && !firebase.auth().currentUser) {
    next("/");
  } else if (!to.meta.requireAuth && firebase.auth().currentUser) {
    next("/home");
  } else {
    next();
  }
});

export default router;
