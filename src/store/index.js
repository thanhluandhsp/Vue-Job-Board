import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const state = {
  
    userLogedIn: false,
    thisUser: null,
    jobs: null
}

const getters = {

}

const mutations = {
    USER_LOGIN: function(state) {
        firebase.auth().onAuthStateChanged(function(user) {
            debugger;
            if (user) {
                store.state.userLogedIn = true
                store.state.thisUser = user

            } else {
                store.state.userLogedIn = false
                store.state.thisUser = null
            }
        });
    },
   
}

const actions = {
    USER_LOGIN({ commit }) {
        commit('USER_LOGIN')
    },
    GET_INDEED_JOBS({ commit }) {
        commit('GET_INDEED_JOBS')
    }
}

global.store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
  plugins: [createPersistedState()],

});

export default store;