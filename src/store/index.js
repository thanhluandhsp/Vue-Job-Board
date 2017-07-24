import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase'

Vue.use(Vuex)

const state = {
    indeedURLBase: 'http://localhost/barodajobs/getjobs.php',
    userLogedIn: false,
    thisUser: null,
    jobs: null
}

const getters = {

}

const mutations = {
    USER_LOGIN: function(state) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                store.state.userLogedIn = true

            } else {
                store.state.userLogedIn = false
            }
        });
    },
    GET_INDEED_JOBS: function(state) {
        this.$http.get(state.indeedURLBase).then(response => {
            state.jobs = response.data.results;
        }, response => {

        });
    }
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
    actions
});

export default store;