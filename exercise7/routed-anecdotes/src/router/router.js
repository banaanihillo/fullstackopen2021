import Vue from "vue"
import VueRouter from "vue-router"
import AnecdoteList from "../views/AnecdoteList.vue"
import AddAnecdote from "../views/AddAnecdote.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "AnecdoteList",
    component: AnecdoteList
  },
  {
    path: "/add-anecdote",
    name: AddAnecdote,
    component: () => import("../views/AddAnecdote.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
