import Vue from 'vue'
import Vuex from 'vuex'
import anecdoteService from "../services/anecdoteService"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    anecdotes: [],
    notification: "",
    isError: false,
    filter: ""
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
      state.anecdotes = updatedAnecdotes
    },
    ADD_ANECDOTE(state, createdAnecdote) {
      state.anecdotes = state.anecdotes.concat(createdAnecdote)
    },
    setNotification(state, payload) {
      state.notification = payload.notification
      state.isError = payload.isError || false
      setTimeout(() => {
        state.notification = ""
        state.isError = false
      },
      payload.timeoutDuration)
    },
    dismissNotification(state) {
      state.notification = ""
      state.isError = false
    },
    FILTER_ANECDOTES(state, filter) {
      state.filter = filter
    },
    INITIALIZE_ANECDOTES(state, anecdotes) {
      state.anecdotes = anecdotes
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
    filteredSortedAnecdotes: (state, getters) => {
      return getters.sortedAnecdotes.filter((anecdote) => {
        return (
          anecdote.content.toLowerCase().includes(
            state.filter.toLowerCase()
          )
        )
      })
    }
  }
})
