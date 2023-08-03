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
    SET_USER: (state, payload) => {
        state.user = payload;
    },
    CELAR_STATE(state) {
        Object.assign(state, getDefaultState())
    }
}

const getters = {

    User: state => {
        return state.user;
    },
    AttributeUser: (state) => (key) => {
        return state.user.data == null ? '' : state.user.data[key];
    },

}

const actions = {
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
