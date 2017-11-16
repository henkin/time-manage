import Vuex from 'vuex'
import axios from 'axios'

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
      async addGoal ({commit}, payload) {
        try {
          commit('addGoal', payload)
          let addGoalResult = await axios.post(`/api/goals`, payload)
          console.log(addGoalResult.data)
        } catch (err) {
          console.error(err)
        }
        // await axios('/goals/')
        // console.log(addGoalResult)
        // setTimeout(() => {
        //   console.log('action: addGoal', payload)
        //   commit('addGoal', payload)
        // }, 1000)
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
