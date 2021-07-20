import deepFreeze from "deep-freeze"
import ava from "ava"
import store from "../src/store/store.js"

ava("Does nothing", (test) => {
  const initialState = {
    positive: 0,
    neutral: 0,
    negative: 0
  }
  deepFreeze(initialState)
  store.commit("doNothing")

  test.deepEqual(
    store.state,
    initialState,
    "Nothing was done"
  )
})

ava("Incremention works", (test) => {
  const initialState = {
    positive: 2,
    neutral: 1,
    negative: 0
  }
  deepFreeze(store.state)
  store.replaceState(initialState)

  store.commit(
    "increment",
    "positive"
  )

  test.deepEqual(
    store.state,
    {
      positive: 3,
      neutral: 1,
      negative: 0
    },
    "Positive feedback is incremented successfully"
  )
})
