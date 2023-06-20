
const state = () => {
    return {
        sales_order: {},
    };
}

const mutations = {
    SET_SALES_ORDER(state, payload) {
        state.sales_order = payload;
    },

    CLEAR_STATE(state) {
        state.sales_order = {};
    }

}

const getters = {
    SalesOrder(state) {
        return state.sales_order;

    },
}


export default {
    namespaced: true,
    state,
    mutations,
    getters
}

