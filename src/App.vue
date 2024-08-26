
<template >
  <div class="app">
    <div class="header" v-if="isLoggedUser">
      <the-header>header</the-header>
    </div> 
    <div class="view">
      <router-view @makeOrder="makeOrder()"/>
    </div> 
    <div class="app__popup">
      <q-dialog class="app__popup-body" v-model="showPopup" persistent>
        <TheOrder></TheOrder>
    </q-dialog>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheOrder from '@/components/TheOrder.vue'
import { onMounted, computed, ref } from 'vue';
import store from './store'
import router from './router'

onMounted(() => {
  checkAuthorization()
})

let showPopup = ref(false)
const isLoggedUser = computed(() => store.getters.isLoggedUser)

function makeOrder() {
  showPopup.value = true
}
function checkAuthorization() {
  if(isLoggedUser.value){
    router.push('/');
  } else{
    router.push('/authorization');
  }
}

</script>

<style lang="scss">
.app {
  height: 100%;
}

.header { 
  height: 80px;
}

.view {
  height: calc(100vh - 80px) !important;
}

</style>
