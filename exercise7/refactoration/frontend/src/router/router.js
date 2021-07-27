import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/users/:id",
    name: "User",
    component: () => import("../views/User.vue"),
    props: true
  },
  {
    path: "/blogs/:id",
    name: "Blog",
    component: () => import("../views/Blog.vue")
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import("../views/Blogs.vue")
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
