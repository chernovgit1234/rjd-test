<template>
    <div class="card">
        <div class="card__top">
            <a class="card__image">
                <img :src="props.product.image" :alt="props.product.title"/>
            </a>
        </div>
        <div class="card__bottom">
            <div class="card__title">{{props.product.title}}</div>
            <div class="card__price">{{props.product.price}} $</div>
            <button class="btn card__add-btn" @click="store.dispatch('addToCart', props.product.title)">Добавить в корзину</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import store from '../store'

const props = defineProps({
    product: Object
})

</script>

<style lang="scss">
.card {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    transition: 0.2s;
    position: relative;
    width: 350px;
    height: 420px;
    border: 2px solid var(--light-border-color);
    overflow: hidden;

    &:hover {
        border: 2px solid #00000046;
    }
    
&__top {
    flex: 0 0 250px;
    position: relative;
    overflow: hidden;
}

&__image {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: 0.2s;
    }
}

&__bottom {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    padding: 10px;
    justify-content: space-between;
}

&__title {
    height: 50px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 60px;
}

&__price {
    font-size: 18px;
    font-weight: bold;
    color: rgb(120, 228, 120);
}
}

</style>