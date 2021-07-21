import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    anecdotes: [
      {
        content: "Mitä hitammi tippu, sen parempa tule",
        votes: 2,
        id: "bana nana ban ban nan bannab nba bannanna na"
      },
      {
        content: "6-4-3 equals two",
        votes: 3,
        id: "nanaba nababn banab bananab na"
      }
    ],
    notification: "",
    isError: false,
    filter: ""
  },
  mutations: {
    addVote(state, anecdoteID) {
      const anecdoteToVote = state.anecdotes.find((anecdote) => {
        return anecdote.id === anecdoteID
      })
      
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      
      const updatedAnecdotes = state.anecdotes.map((anecdote) => {
        return (
          anecdote.id === votedAnecdote.id
            ? votedAnecdote
            : anecdote
        )
      })
      state.anecdotes = updatedAnecdotes
    },
    addAnecdote(state, payload) {
      const newAnecdote = {
        content: payload,
        votes: 0,
        id: `${Math.random() * 100600700} banananananas`
      }
      state.anecdotes = state.anecdotes.concat(newAnecdote)
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
    filterAnecdotes(state, filter) {
      state.filter = filter
    }
  },
  actions: {

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
