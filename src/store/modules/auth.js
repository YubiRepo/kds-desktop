import $axios from '@/plugins/api'

<<<<<<< HEAD

=======
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
const getDefaultState = () => {
    return {
        access_token: null,
        user: null
    }
}

const state = getDefaultState()

//mutations
const mutations = {
<<<<<<< HEAD
=======
    SET_TOKEN: (state, payload) => {
        state.access_token = payload;
    },
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
    SET_USER: (state, payload) => {
        state.user = payload;
    },
    CELAR_STATE(state) {
        Object.assign(state, getDefaultState())
    }
}

const getters = {
<<<<<<< HEAD
=======
    Authenticated: state => {
        return state.access_token != null && state.user != null;
    },
    AccessToken: state => {
        return state.access_token;
    },
    Token: state => {
        return state.access_token;
    },
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4

    User: state => {
        return state.user;
    },
    AttributeUser: (state) => (key) => {
        return state.user.data == null ? '' : state.user.data[key];
    },

}

const actions = {
<<<<<<< HEAD
    async submit({ commit }, payload)  {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/apporder/Api/login`, {
            method: 'POST',
            body : JSON.stringify(payload),
        })

        const data = await res.json()
        if(!data.status) {
           alert(data.message)
        } else {
            console.log('success',data)
            commit('SET_USER', data)
            return data
        }
    },
    

    logout({ commit }) {
        localStorage.removeItem('token')
=======
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
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
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
