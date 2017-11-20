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
      setGoals (state, goals) {
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
          console.error(err)
        }
      },

      async loadGoals ({commit}) {
        try {
          let goals = await axios.get(`/api/goals`)
          console.log(goals)
          commit('setGoals', goals)
        } catch (err) {
          console.error(err)
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
