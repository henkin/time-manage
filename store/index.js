import Vuex from 'vuex'
import axios from 'axios'
const url = (this['window']) ? `/api/goals` : `http://localhost:3000/api/goals`

const createStore = () => {
  return new Vuex.Store({
    state: {
      goals: []
    },
    mutations: {
      addGoal (state, payload) {
        console.log('store.addGoal: ' + payload.name)
        state.goals.push(payload)
      },
      loadGoals (state, goals) {
        state.goals = goals
      }
    },
    getters: {
      goals (state) { return state.goals }
    },
    actions: {
      nuxtServerInit ({ dispatch, commit }, { req }) {
        // if (req.session && req.session.authUser) {
        //   commit('SET_USER', req.session.authUser)
        // }
        return dispatch('loadGoals')
      },
      async addGoal ({commit}, payload) {
        try {
          commit('addGoal', payload)
          let addGoalResult = await axios.post(url, payload)
          console.log(addGoalResult.data)
        } catch (err) {
          console.error('BAD state.addGoal')
        }
      },
      async loadGoals ({ dispatch, commit }) {
        try {
          let goals = await axios.get(url)
          console.log('loadGoals', goals.data.length)
          commit('loadGoals', goals.data)
        } catch (err) {
          commit('loadGoals', {})
          console.warn('failed: state.loadGoals', err)
        }
      }
    }
  })
}

export default createStore
