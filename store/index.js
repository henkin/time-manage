import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      goals: []
    },
    mutations: {
      increment (state) {
        state.counter++
      },
      addGoal (state, payload) {
        console.log('store.addGoal: ' + payload.name)
        state.goals.push(payload.name)
      }
    },
    actions: {
      addGoal ({commit}, payload) {
        setTimeout(() => {
          console.log('action: addGoal', payload)
          commit('addGoal', payload)
        }, 1000)
      }
    }
    // actions: {
    //   addGoal ({commit}) {
    //     commit('addGoal', )
    //   }
    // }
  })
}

export default createStore
