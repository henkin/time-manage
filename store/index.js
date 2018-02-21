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
      ideas: [],
      authUser: null
    },
    mutations: {
      addIdea (state, payload) {
        console.log('store.addIdea: ' + payload.name)
        state.ideas.unshift(payload)
      },
      loadIdeas (state, ideas) {
        state.ideas = ideas
      },
      updateArray (state, updates) {
        console.info('store.updateArray', JSON.stringify(updates, null, 2))
        update(state.ideas, updates)
      },
      SET_USER: function (state, user) {
        state.authUser = user
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
        //console.log('nuxtServerInit. Session: ', req.session)
        if (req.user) {
          commit('SET_USER', req.user)
        }

        return dispatch('loadIdeas')
      },

      async addIdea ({commit}, name) {
        try {
          let idea = { name: name, id: uuidv4() }
          commit('addIdea', idea)
          let addIdeaResult = await axios.post(url, idea)
          return addIdeaResult;
        } catch (err) {
          console.error('BAD state.addIdea', err)
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
      },

      async login ({ commit }, { username, password }) {
        try {
          const { data } = await axios.post('/api/login', { username, password })
          commit('SET_USER', data)
        } catch (error) {
          if (error.response && error.response.status === 401) {
            throw new Error('Bad credentials')
          }
          throw error
        }
      },

      async logout ({ commit }) {
        await axios.post('/api/logout')
        commit('SET_USER', null)
      }
    }
  })
}

export default createStore
