import $axios from '@/plugins/api'

const state = () => ({
    users: [],
    roles: [],
    permissions: [],
    role_permission: [],
    authenticated: []
})

const mutations = {
    ASSIGN_USER(state, payload) {
        state.users = payload
    },

}

const actions = {
    getUserLists({ commit }) {
        return new Promise((resolve) => {
            $axios.get(`/user-lists`)
                .then((response) => {
                    commit('ASSIGN_USER', response.data.data)
                    resolve(response.data)
                })
        })
    },

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}