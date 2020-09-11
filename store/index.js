import Vuex from 'vuex'
import state from './state'
import player from './player'

const createStore = () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: state(),
    modules: {
      player,
    },
  })
}
export default createStore
