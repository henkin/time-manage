import Vuex from 'vuex'
import axios from 'axios'
import socketClient from '../socket/client'
import uuidv4 from 'uuid/v4'

import { update } from '../lib/updater'
const isBrowser = typeof window !== 'undefined'
const url = isBrowser ? `/api/goals` : `http://localhost:3000/api/goals`

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
      // updateGoal (state, updated) {
      //   let found = state.goals.find(g => g.submitted === updated.submitted)
      //   console.log('found: ', found, 'updated', updated)
      //   Object.assign(found, {}, updated)
      // },
      loadGoals (state, goals) {
        state.goals = goals
      },
      updateArray (state, updates) {
        console.info('store.updateArray', JSON.stringify(updates, null, 2))
        update(state.goals, updates)
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
      async addGoal ({commit}, name) {
        try {
          // let submittedDate = new Date()
          let goal = { name: name, id: uuidv4() }
          commit('addGoal', goal)
          let addGoalResult = await axios.post(url, goal)
          return addGoalResult;
          // let combined = { ...addGoalResult.data, submitted: submittedDate }
          // console.info('combined', combined)
          // commit('updateGoal', combined)
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
      },
      async init ({ dispatch, commit }, io) {
        socketClient.init(io)
        socketClient.subscribe(io, 'goals', x => commit('updateArray', x))
      }
    }
  })
}

export default createStore
