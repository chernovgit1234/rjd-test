<template>
    <div class="order">
        <div class="order__body">
            <div class="order__title">
                <h6>Заказ {{ new Date().getTime() }}</h6>
            </div>
            <div class="order__text-succes">
                <h6>Ваш заказ успешно оформлен!</h6>
            </div>
            <div class="order__header">
                <q-btn @click="store.dispatch('clearCart')" color="primary" v-close-popup >Закрыть</q-btn>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '../store'
</script>

<style lang="scss"> 
.order {
    width: 500px;
    height: 400px;
    background-color: #fff;

&__body {
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}

&__title {
    h6 {
        font-size: 18px;
    }
}

&__text-succes {
    h6 {
        font-size: 24px;
        color: green;
    }
}
}

</style>