import Vue from 'vue'
import Vuex from './vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        num: 0
    },
    getters: {
        getNum(state) {
            return state.num
        }
    },
    mutations: {
        incre(state, payload) {
            state.num += payload
        },
        decre(state, payload) {
            state.num -= payload
        }
    },
    actions: {
        asyncincre({ commit }, payload) {
            setTimeout(function() {
                console.log(this, "this");
                commit('incre', payload)
            }, 1000)
        }
    }
})
export { store }