<template>
  <div class="home">
    <div class="home__body">
      <div class="home__sidebar">
        <TheSidebar></TheSidebar>
      </div>
      <div class="home__main-wrapper">
        <div v-if="!filteredProducts.length && filterActive" class="home__no-data">
          <span>Ничего не найдено</span>
        </div>
        <div v-else-if="renderedProducts.length" class="home__main">
          <div 
            v-for="(product, i) in renderedProducts"
            :key="i"
            >
            <TheCardProduct :product="product"></TheCardProduct>
          </div>
        </div>
        <div class="home__loader" v-else-if="!renderedProducts.length">
          <span class="loader"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import store from '../store'
import TheSidebar from '../components/TheSidebar.vue'
import TheCardProduct from '../components/TheCardProduct.vue'

onMounted(async () => {
  await store.dispatch('getProducts')
})

const filteredProducts = computed(() => store.getters.filteredProducts)
const products = computed(() => store.getters.products)
const filterActive = computed(() => store.getters.filterActive)

const renderedProducts = computed(() => {
  if (filterActive.value && filteredProducts.value.length) {
    return filteredProducts.value
  } else {
    return products.value
  }
})
</script>

<style lang="scss">
.home {
  min-height: 100%;
  display: flex;
  position: relative;

&__body {
  padding: 15px;
  display: grid;
  grid-template-columns: 440px auto;
  gap: 60px;
  position: absolute;
  width: 100%;
  height: 100%;
}

&__sidebar {  
  border: 2px solid var(--light-border-color); 
  padding: 10px;
}

&__main-wrapper {
  position: relative;
  overflow: auto;
}
&__main {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 40px;
  padding: 10px;
}

&__no-data {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;

  span {
    font-size: 20px;
    color: black;
  }
}

&__loader {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
}
}
</style>
