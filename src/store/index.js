import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
    indeedURL: '',
    userLogedIn: false,
    thisUser: []
}

const getters = {

}

const mutations = {
    
}

const actions = {
    userLogedIn({ context }, payload) {

    }
}

export default new Vuex.Store({
    store,
    getters,
    mutations,
    actions
})