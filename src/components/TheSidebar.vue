<template>
    <div class="sidebar">
        <div class="sidebar__body">
            <span class="sidebar__title">Фильтр</span>
            <div class="sidebar__settings settings-sidebar">
                <div class="settings-sidebar__categories">
                    <small>Категория</small>
                    <q-select outlined v-model="category" :options="categories" label="Выберите категорию" />
                </div>
                <div class="settings-sidebar__prices">
                    <div class="settings-sidebar__price-inputs">
                        <div class="settings-sidebar__price-input-body">
                            <small>Минимальная цена</small>
                            <q-input
                                v-model.number="minPrice"
                                type="number"
                                outlined
                                :max="maxPrice"
                                min="0"
                                error-message=""
                                :error="minPriceError"
                                @update:model-value="inputMinPrice"
                            />
                        </div>
                        <div class="settings-sidebar__price-input-body">
                            <small>Максимальная цена</small>
                            <q-input
                                v-model.number="maxPrice"
                                type="number"
                                outlined
                                :min="minPrice"
                                :error="maxPriceError"
                                @update:model-value="inputMaxPrice"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar__actions">
                <button :disabled="maxPriceError || minPriceError" class="btn sidebar__actions-btn-apply" @click="applyFilter">Применить</button>
                <button class="btn sidebar__actions-btn-reset" @click="resetFilter">Сбросить</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../store'
import {ALL_CATEGORY} from '../enums/allCategory'

let categories = computed(() => [ALL_CATEGORY, ...store.getters.categories])

let category = ref(ALL_CATEGORY)
let minPrice = ref(0)
let maxPrice = ref(1000)

let minPriceError = ref(false)
let maxPriceError = ref(false)

function inputMinPrice() {

    if (minPrice.value > maxPrice.value || minPrice.value < 0) {
        minPriceError.value = true
    } else if (minPrice.value < maxPrice.value) {
        minPriceError.value = false
    }
}

function inputMaxPrice() {
    if (maxPrice.value > minPrice.value) {
        maxPriceError.value = false
        minPriceError.value = false
    } else if (maxPrice.value < minPrice.value || minPrice.value < 0) {
        maxPriceError.value = true
    }
}

function applyFilter() {
    const filterData = {
        category: category.value,
        minPrice: minPrice.value,
        maxPrice:  maxPrice.value,
    }

    store.dispatch('applyFilter', filterData)
}

function resetFilter() {

    category.value = ALL_CATEGORY
    minPrice.value = 0
    maxPrice.value = 1000

    store.dispatch('resetFilter')
}
</script>

<style lang="scss">

.sidebar {
    &__title {
        font-size: 22px;
        text-align: center;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 80px;
    }

    &__settings {
    }

    &__actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    &__actions-btn-apply {
        width: 180px !important;
        background-color: #0080ff !important;
        color: white !important;

        &:hover {
            background-color: #0080ffd4 !important;
        }
    }

    &__actions-btn-reset {
        width: 180px !important;
    }
}

.settings-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__categories {
    }

    &__prices {
    }

    &__price-inputs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    &__price-input-body {
        width: 180px;
    }
}
</style>