import router from "@/router"

export default {
    state: {
        cart: []
    },
    getters: {
        cart: state => state.cart,
        cartLength: state => state.cart.reduce((accum, item) => accum + Number(item.count), 0),
        totalAmountCart: state => state.cart.reduce((accum, item) => accum + Number(item.total), 0).toFixed(2)
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            const product = payload.rootData.products.find(t => t.title === payload.titleProduct)
            const cartObject = state.cart.find(t => t.title === product.title)

            if (cartObject) {

                cartObject.count++
                cartObject.total += product.price
            } else {
                let cartObject = {
                    number: state.cart.length + 1,
                    title: product.title,
                    count: 1,
                    price: product.price,
                    total: product.price,
                    image: product.image
                }

                state.cart.push(cartObject)
            }
        },
        REMOVE_ONE_COUNT(state, payload) {
            const cartObject = state.cart.find(t => t.title === payload.title)

            if (cartObject && cartObject.count >= 2) {
                cartObject.count--
                cartObject.total -= cartObject.price
            } else {
                const cartObjectIndex = state.cart.findIndex(t => t.title === payload.title)
                state.cart.splice(cartObjectIndex, 1)
            }
        },
        CLEAR_CART(state) {
            state.cart = []
            router.push('/')
        }
    },
    actions: {
        addToCart({commit, rootState}, titleProduct) {
            commit('ADD_TO_CART', {titleProduct, rootData: rootState})
        },
        removeOneCount({commit, rootState}, title) {
            commit('REMOVE_ONE_COUNT', {title, rootData: rootState})
        },
        clearCart({commit}) {
            commit('CLEAR_CART')
        }
    }
}