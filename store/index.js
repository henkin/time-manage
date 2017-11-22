import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      goals: []// async () => axios.get(`/api/goals`)
    },
    mutations: {
      addGoal (state, payload) {
        console.log('store.addGoal: ' + payload.name)
        state.goals.push(payload.name)
      },
      loadGoals (state, goals) {
        state.goals = goals
      }
    },
    getters: {
      goals (state) { return state.goals }
    },
    actions: {
      async addGoal ({commit}, payload) {
        try {
          commit('addGoal', payload)
          let addGoalResult = await axios.post(`/api/goals`, payload)
          console.log(addGoalResult.data)
        } catch (err) {
          console.error('BAD state.addGoal')
        }
      },

      async loadGoals ({commit}) {
        try {
          let goals = await axios.get(`/api/goals`)
          // let addGoalResult = await axios.post(`/api/goals`, goals)
          console.log('loadGoals', goals.data)
          commit('loadGoals', goals.data)
        } catch (err) {
          commit('loadGoals', {})
          console.warn('failed: state.loadGoals')
        }
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
