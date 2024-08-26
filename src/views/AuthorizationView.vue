<template>
  <div class="auth">
    <div class="auth__form-body">
      <span class="auth__form-title">Форма авторизации</span>
      <form action="#" method="post" @submit.prevent="onSubmit()" class="form-auth">
        <div class="form-auth__inputs">
          <div class="form-auth__email-input">
            <span class="form-auth__label"><small>Aдрес электронной почты</small><span style="color: red">*</span></span>
            <q-input 
              v-model="state.email" 
              outlined  
              :label="state.email ? '' : 'Введите адрес электронной почты'" 
              :error-message="emailTextError"
              :error="!!emailTextError"
              class="form-auth__input"
            >
              <template v-slot:before>
                <q-icon name="mail" color="grey-5"/>
              </template>
            </q-input>
          </div>
          <div class="form-auth__email-input">
            <span class="form-auth__label"><small>Пароль</small><span style="color: red">*</span></span>
            <q-input 
              v-model="state.password" 
              outlined  
              :label="state.password ? '' : 'Введите пароль'" 
              :type="isPwd ? 'password' : 'text'" 
              class="form-auth__input"
              :error-message="passwordTextError"
              :error="!!passwordTextError"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:before>
                <q-icon name="password" color="grey-5"/>
              </template>
            </q-input>
          </div>
        </div>
        <div class="form-auth__action">
          <button class="btn form-auth__action-btn" type="submit">Войти</button>
        </div>
      </form>
      <div v-if="onLoader" class="loader-body">
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import store from '../store'
import router from '../router'
import useValidate from '@vuelidate/core'
import { required, email, helpers, sameAs } from "@vuelidate/validators";

let passwordTextError = ref('')
let emailTextError = ref('')
let isPwd = ref(true)

const state = reactive({
  email: '',
  password: ''
})

const userСredentials = computed(() => store.getters.userСredentials)
const onLoader = computed(() => store.getters.onLoader)
const rules = computed(() => {
  return {
    email: { 
      required: helpers.withMessage('Поле не может быть пустым', required),
      email: helpers.withMessage('Почта введена на корректно', email),
      sameAs : helpers.withMessage('Почта не совпадает', sameAs(userСredentials.value.email))
    },
    password: { 
      required: helpers.withMessage('Поле не может быть пустым', required),
      sameAs : helpers.withMessage('Пароль не совпадает', sameAs(userСredentials.value.password))
    },
  }
})

const v$ = useValidate(rules, state)

function clearTextError() {
  v$.value.$reset()

  emailTextError.value = ''
  passwordTextError.value = ''
}

function validate() {
  v$.value.$validate()

  if (v$.value.email.$error) emailTextError.value = v$.value.email.$errors[0].$message
  if (v$.value.password.$error) passwordTextError.value = v$.value.password.$errors[0].$message
}

function checkErrors() {
  return passwordTextError.value || emailTextError.value ? true : false
}

function onSubmit() {
  
  clearTextError()

  validate()
  if (checkErrors()) return 

  store.dispatch('changeLoader')

  setTimeout(() => {
    store.dispatch('authorizeUser')
    store.dispatch('changeLoader')

    router.push('/')
  }, 500);
}
</script>

<style lang="scss">
.loader-body {
  position: absolute;
  inset: 0;
  background-color: #ffffff85;
  z-index: 100;
  display: grid;
  place-items: center;
}

.auth {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: grid;
  place-items: center;

  &__form-body {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 700px;
    border: 2px solid var(--light-border-color); 
    border-radius: 12px;
    padding: 20px 60px;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    z-index: 15;
  }

  &__form-title {
    color: black;
    text-align: center;
    font-size: 22px;
    margin-bottom: 50px;
  }
}

.form-auth {
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 50px;
  }

  &__password-input, &__email-input {
    
    
  }

  &__label {
    margin-left: 37px;

    small {
      margin-right: 7px;
    }
  }

  &__input {
    .q-field__native {
      font-size: 16px;
      margin-bottom: 8px !important;
    }
  }

  &__action {
    display: flex;
    justify-content: center;
  }

  &__action-btn {
    width: 200px;
    height: 40px;
    background-color: #0080ff !important;
    color: white !important;

    &:hover {
      background-color: #0080ffd4 !important;
    }
  }
}
</style>
