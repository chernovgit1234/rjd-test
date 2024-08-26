export default {
    state: {
        onLoader: false,
        isLoggedUser: false,
        userСredentials: {email: 'usermail@gmail.com',  password: '1234' }
    },
    getters: {
        isLoggedUser: state => state.isLoggedUser,
        userСredentials: state => state.userСredentials,
        onLoader: state => state.onLoader
    },
    mutations: {
        AUTHORIZE_USER(state) {
            state.isLoggedUser = true
        },
        CHANGE_LOADER(state) {
            state.onLoader = !state.onLoader
        }
    },
    actions: {
        authorizeUser({commit}) {
            commit('AUTHORIZE_USER')
        },
        changeLoader({commit}) {
            commit('CHANGE_LOADER')
        },
    }
}