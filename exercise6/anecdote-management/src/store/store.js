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
    ]
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
    }
  }
})
