import { createStore } from 'vuex'
import auth from './auth'
import cart from './cart'
import axios from 'axios'
import { ALL_CATEGORY } from '../enums/allCategory'

export default createStore({
  namespaced: true,
  state: {
    products: [],
    filteredProducts: [],
    filterActive: false
  },
  getters: {
    products: s => s.products,
    filteredProducts: s => s.filteredProducts,
    categories: s => [... new Set(s.products.map(product => product.category))],
    filterActive: s => s.filterActive,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      Object.freeze(products)
      if (Object.isFrozen(products)) {
        state.products = products
      }
    },
    RESET_FILTERED_PRODUCTS(state) {
      state.filterActive = false
      state.filteredProducts = state.products
    },
    SET_FILTERED_PRODUCTS(state, filterData) {
      state.filterActive = true
        
      state.filteredProducts = state.products.filter(product => {
        if (filterData.category === ALL_CATEGORY) {
          if (
            product.price >= filterData.minPrice &&
            product.price <= filterData.maxPrice 
          ) {
            return product
          }
        } else {
          if (
            product.category === filterData.category &&
            product.price >= filterData.minPrice &&
            product.price <= filterData.maxPrice 
          ) {
            return product
          }
        }
      })
    },
  },
  actions: {
    applyFilter({commit}, filterData) {
      commit('SET_FILTERED_PRODUCTS', filterData)
    },
    resetFilter({commit}) {
      commit('RESET_FILTERED_PRODUCTS')
    },
    async getProducts({commit}) {
      try {
        let url = 'https://fakestoreapi.com/products'
        const response = await axios.get(url)
        
        if (response.status === 200) {
          commit('SET_PRODUCTS', response.data)
        }
      } catch (error) {
        throw new Error(error)
      }
  },
  },
  modules: {
    auth, cart
  }
})
