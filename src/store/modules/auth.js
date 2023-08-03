import $axios from '@/plugins/api'

const getDefaultState = () => {
    return {
        access_token: null,
        user: null
    }
}

const state = getDefaultState()

//mutations
const mutations = {
    SET_TOKEN: (state, payload) => {
        state.access_token = payload;
    },
    SET_USER: (state, payload) => {
        state.user = payload;
    },
    CELAR_STATE(state) {
        Object.assign(state, getDefaultState())
    }
}

const getters = {
    Authenticated: state => {
        return state.access_token != null && state.user != null;
    },
    AccessToken: state => {
        return state.access_token;
    },
    Token: state => {
        return state.access_token;
    },

    User: state => {
        return state.user;
    },
    AttributeUser: (state) => (key) => {
        return state.user.data == null ? '' : state.user.data[key];
    },

}

const actions = {
    submit({ commit }, payload) {
        return new Promise((resolve) => {
            $axios.post('/checker/auth/login', payload)
                .then(response => {
                    if (response.data.status == 'success') {
                        console.log(response.data)
                        commit('SET_TOKEN', response.data.token)
                        commit('SET_USER', response.data.user)
                    } else {
                        alert('Login Failed')
                    }
                    resolve(response.data)

                })
                .catch(error => {
                    if (error.response.status == 422) {
                        alert('Login Failed')
                    }
                })
        })
    },

    logout({ commit }) {
        localStorage.removeItem('token')
        commit('SET_TOKEN')
        commit('CELAR_STATE')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
