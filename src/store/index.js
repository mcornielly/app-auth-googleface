import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    setUser(state, payload){
      if(payload === null){
        state.user = ''
      }else{
        state.user = payload
      }
    }
  },
  actions: {
    async newUser({commit}, user){

      try {
        const doc = await db.collection('users').doc(user.uid).get()
  
        if(doc.exists){
          commit('setUser', doc.data())
        }else{
          const newUser =  {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photo: user.photoURL
          }
          //Save DB
          await db.collection('users').doc(user.uid).set(
            newUser
          )

          console.log('Usuario registrado en DB')
          commit('setUser', userSocial)
        }
        
      } catch (error) {
        
      }

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
