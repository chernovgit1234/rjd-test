<template>
    <header class="headerz">
        <div class="headerz__body">
            <div class="headerz__logo">
                <img @click="router.push('/')" src="../assets/logo.svg" alt="logo">
            </div>
            <div class="headerz__btn-cart">
                <q-btn @click="router.push('./cart')" color="black" round icon="shopping_cart">
                    <q-badge rounded color="red" floating>{{ cartLength }}</q-badge>
                </q-btn>
            </div>    
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import router from '../router'
import store from '../store'

let cartLength = computed(() => store.getters.cartLength)

</script>

<style lang="scss">
.headerz {
    background-color: #eceff17f;
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 5px 15px;
    border-bottom: 2px solid var(--light-border-color);
    -webkit-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
    -moz-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
    box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;

    &__body {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    &__logo {

        img {
            cursor: pointer;
            width: 50px;
            height: 50px;
        }
    }

    &__btn-cart {
    }
}

</style>