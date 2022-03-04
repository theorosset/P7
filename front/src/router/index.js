import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import index from "../views/index.vue";
import axios from "axios";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get(`http://localhost:3000/api/auth/verif`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => next())
          .catch(() => {
            localStorage.clear();
            next("/login");
          });
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
