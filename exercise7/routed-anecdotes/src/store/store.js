import Vue from 'vue'
import Vuex from 'vuex'
import anecdoteService from "../services/anecdoteService"

Vue.use(Vuex)

let notificationTimeoutID = null

export default new Vuex.Store({
  state: {
    individualAnecdote: null,
    anecdotes: [],
    notification: "",
    isError: false,/* ,
    filter: "" */
  },
  mutations: {
    ADD_VOTE(state, votedAnecdote) {
      const updatedAnecdotes = state.anecdotes.map((anecdote) => {
        return (
          anecdote.id === votedAnecdote.id
            ? votedAnecdote
            : anecdote
        )
      })
      state.individualAnecdote = votedAnecdote
      state.anecdotes = updatedAnecdotes
    },
    ADD_ANECDOTE(state, createdAnecdote) {
      state.anecdotes = state.anecdotes.concat(createdAnecdote)
    },
    SET_NOTIFICATION(state, payload) {
      clearTimeout(notificationTimeoutID)
      state.notification = payload.notification
      state.isError = payload.isError || false
      notificationTimeoutID = setTimeout(
        () => {
          state.notification = ""
          state.isError = false
        },
        payload.timeoutSeconds * 1000
      )
    },
    DISMISS_NOTIFICATION(state) {
      state.notification = ""
      state.isError = false
    },
    /* FILTER_ANECDOTES(state, filter) {
      state.filter = filter
    }, */
    INITIALIZE_ANECDOTES(state, anecdotes) {
      state.anecdotes = anecdotes
    },
    GET_ANECDOTE_BY_ID(state, anecdote) {
      state.individualAnecdote = anecdote
    }
  },
  actions: {
    async initializeAnecdotes(context) {
      const anecdotes = await anecdoteService.getAnecdotes()
      context.commit(
        "INITIALIZE_ANECDOTES",
        anecdotes
      )
    },
    async addAnecdote(context, newAnecdote) {
      const anecdote = await anecdoteService.addAnecdote(newAnecdote)
      context.commit(
        "ADD_ANECDOTE",
        anecdote
      )
    },
    async addVote(context, anecdote) {
      const anecdoteToVote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const votedAnecdote = await anecdoteService.updateAnecdote(
        anecdoteToVote
      )
      context.commit(
        "ADD_VOTE",
        votedAnecdote
      )
    },
    async getAnecdoteByID(context, id) {
      const anecdote = await anecdoteService.getAnecdoteByID(id)
      context.commit(
        "GET_ANECDOTE_BY_ID",
        anecdote
      )
    }
  },
  modules: {

  },
  getters: {
    sortedAnecdotes: (state) => {
      return [...state.anecdotes].sort((a, b) => {
        return b.votes - a.votes
      })
    },
    // not implemented
    /* filteredSortedAnecdotes: (state, getters) => {
      return getters.sortedAnecdotes.filter((anecdote) => {
        return (
          anecdote.content.toLowerCase().includes(
            state.filter.toLowerCase()
          )
        )
      })
    } */
  }
})
