<template>
  <div class="cart">
    <div class="cart__body">
      <div v-if="cartLength === 0" class="cart__no-data">
        <div class="cart__no-data-body">
          <h6>Корзина пуста</h6>
          <button @click="router.push('/')" class="btn cart__no-data-btn">Вернуться к покупкам</button>
        </div>
      </div>
      <div class="cart__main" v-else>
        <div class="cart__title">
          <h6>Товары в корзине</h6>
        </div>
        <div class="cart__table">
          <CartTable></CartTable>
        </div>
        <div class="cart__action">
          <div class="cart__result-price">
            <h6 v-if="cartLength > 0">
              Всего товаров 
              <span style="text-decoration: underline;">{{ cartLength }}</span>
              на сумму 
              <span style="color: rgb(114, 172, 28);">{{totalAmountCart}} $</span>
            </h6>
            <h6 v-else>В корзиине нет товаров</h6>
          </div>
          <button :disabled="cartLength === 0" class="btn" @click="makeOrder()">Оформить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, defineEmits } from 'vue';
import store from '../store'
import router from '../router'
import CartTable from '@/components/CartTable'

const emit = defineEmits(['makeOrder'])

const cartLength = computed(() => store.getters.cartLength)
const totalAmountCart = computed(() => store.getters.totalAmountCart)

function makeOrder() {
  emit('makeOrder')
}
</script>
<style lang="scss">
.cart {
  min-height: 100%;
  position: relative;

&__body {
  position: absolute;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  justify-content: space-between; 
  width: 100%;
  height: 100%;
}

&__main {
  height: 100%;
  padding: 0 300px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

&__title {

  h6 {
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
}

&__table {
  height: 600px;
  position: relative;
}

&__action {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

&__result-price {
  h6 {
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
}

&__action-btn {
  width: 350px;
}

&__no-data {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
}

&__no-data-body {
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  h6 {
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
}
}

</style>
