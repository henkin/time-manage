import Vuex from 'vuex'
import axios from 'axios'
import socketClient from '../socket/client'
import uuidv4 from 'uuid/v4'

import { update } from '../lib/updater'
const isBrowser = typeof window !== 'undefined'
const url = isBrowser ? `/api/ideas` : `http://localhost:3000/api/ideas`

const createStore = () => {
  return new Vuex.Store({
    state: {
      ideas: []
    },
    mutations: {
      addIdea (state, payload) {
        console.log('store.addIdea: ' + payload.name)
        state.ideas.push(payload)
      },
      // updateIdea (state, updated) {
      //   let found = state.ideas.find(g => g.submitted === updated.submitted)
      //   console.log('found: ', found, 'updated', updated)
      //   Object.assign(found, {}, updated)
      // },
      loadIdeas (state, ideas) {
        state.ideas = ideas
      },
      updateArray (state, updates) {
        console.info('store.updateArray', JSON.stringify(updates, null, 2))
        update(state.ideas, updates)
      }
    },
    getters: {
      ideas (state) { return state.ideas }
    },
    actions: {
      nuxtServerInit ({ dispatch, commit }, { req }) {
        // if (req.session && req.session.authUser) {
        //   commit('SET_USER', req.session.authUser)
        // }
        return dispatch('loadIdeas')
      },
      async addIdea ({commit}, name) {
        try {
          // let submittedDate = new Date()
          let idea = { name: name, id: uuidv4() }
          commit('addIdea', idea)
          let addIdeaResult = await axios.post(url, idea)
          return addIdeaResult;
          // let combined = { ...addIdeaResult.data, submitted: submittedDate }
          // console.info('combined', combined)
          // commit('updateIdea', combined)
        } catch (err) {
          console.error('BAD state.addIdea')
        }
      },
      async loadIdeas ({ dispatch, commit }) {
        try {
          let ideas = await axios.get(url)
          console.log('loadIdeas', ideas.data.length)
          commit('loadIdeas', ideas.data)
        } catch (err) {
          commit('loadIdeas', {})
          console.warn('failed: state.loadIdeas', err)
        }
      },
      async init ({ dispatch, commit }, io) {
        socketClient.init(io)
        socketClient.subscribe(io, 'ideas', x => commit('updateArray', x))
      }
    }
  })
}

export default createStore
