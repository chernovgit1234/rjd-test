
<template>
    <div class="cart-table__wrapper">
        <q-table
            class="cart-table__table"
            :rows="cartList"
            :columns="columns"
            row-key="title"
            hide-pagination="true"
            flat bordered
            :rows-per-page-options="[0]"
        >
            <template v-slot:body="props">
                <q-tr :props="props" class="">
                    <q-td key="number" :props="props">
                        {{ props.rowIndex + 1 }}
                    </q-td>
                    <q-td key="title" :props="props">   
                        <div class="cell-title">
                            <img
                                :src="props.row.image"
                                :alt="props.row.title"
                            />
                            <span>{{ props.row.title }}</span>
                            <q-tooltip>
                                {{ props.row.title }}
                            </q-tooltip>
                        </div>                 
                    </q-td>
                    <q-td key="count" :props="props"> 
                        <div class="cell-count">
                            <q-btn size="sm" round icon="remove" @click="store.dispatch('removeOneCount', props.row.title)"/>
                            <span>{{ props.row.count }}</span>
                            <q-btn size="sm" round icon="add" @click="store.dispatch('addToCart', props.row.title)"/>
                        </div>      
                        
                    </q-td>
                    <q-td key="price" :props="props">
                        <div class="cell-price">
                            <span>{{ props.row.price.toFixed(2)}} $</span>
                        </div>                    
                    </q-td>
                    <q-td key="total" :props="props"> 
                        <div class="cell-total">
                            <span>{{ props.row.total.toFixed(2)}} $</span>
                        </div>                       
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import store from '../store'

const cartList = computed(() => store.getters.cart)

const columns = ref([
  {
    name: 'number',
    label: '№',
    align: 'center',
  },
  {
    name: 'title',
    label: 'Наименование товара',
    align: 'left',
  },
  {
    name: 'count',
    label: 'Количество',
    align: 'left',
  },
  {
    name: 'price',
    label: 'Цена за ед.',
    align: 'left',
  },
  {
    name: 'total',
    label: 'Итого',
    align: 'left',
  },
])
</script>

<style lang="scss">
    .cart-table {
        &__wrapper {
            width: 100%;
        }

        &__table {
            height: 600px;
        }
    }

    .q-table__top,
    thead tr:first-child th {
        background-color: #ffffff
    }

    .q-tr {
        height: 80px;
    }

    thead tr th {
        position: sticky;
        z-index: 1;
    }

    .q-table__bottom {
        display: none !important;
    }

    thead tr:first-child th {
        top: 0;
    }

    .cell-title {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 30px;
        align-items: center;
        width: 600px;

        img {
            width: 40px;
            height: 40px;
        }

        span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 16px;
        }
    }

    .cell-count {
        width: 140px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 20px;
        align-items: center;
        justify-content: space-between;

        span {
            font-size: 16px;
        }
    }

    .cell-total {
        color: rgb(34, 0, 255);
        font-size: 16px;
        font-weight: bold;
        width: 100px;
    }
    .cell-price {
        font-size: 16px;
        font-weight: bold;
        width: 100px;
    }
</style>