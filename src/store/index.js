import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{}
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    }
  },
  actions: {
    newUser({commit}, user){
      const userSocial =  {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        photo: user.photoURL
      }
      commit('setUser', userSocial)
    },
    logout({commit}){
      auth.signOut();
      commit('setUser', null)
      router.push({name: 'Login'})
    }
  },
  modules: {
  }
})
