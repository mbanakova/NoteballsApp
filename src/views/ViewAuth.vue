<template>
  <div class="card">
    <ul class="auth-tabs">
      <li class="auth-tab" :class="{ 'is-active': !register }">
        <a @click.prevent="register = false">Login</a>
      </li>
      <li class="auth-tab" :class="{ 'is-active': register }">
        <a @click.prevent="register = true">Register</a>
      </li>
    </ul>

    <form @submit.prevent="onSubmit" class="auth-form">
      <div class="card-content">
        <div class="field">
          <label class="label">Email</label>
          <input
            class="input"
            type="email"
            v-model="credentials.email"
            placeholder="john.doe@henderson.ru"
          />
        </div>
        <div class="field">
          <label class="label">Password</label>
          <input
            class="input"
            type="password"
            v-model="credentials.password"
            placeholder="enter password"
          />
        </div>
      </div>
      <div class="auth-form__buttons">
        <button class="button">{{ buttonLabel }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const register = ref(false)

const buttonLabel = computed(() => {
  return register.value ? 'Register' : 'Login'
})

const credentials = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('damn you! Enter email+password!!!!')
  } else {
    if (register.value) {
      console.log('register user with these credentials ' + credentials)
    } else {
      console.log('login user with these credentials ' + credentials)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
}

.auth-form__buttons {
  align-self: flex-end;
  display: flex;
  gap: 10px;
}
.auth-tabs {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
}

.auth-tab {
  padding: 5px 10px;
  background-color: $border;
  border-radius: 6px 6px 0 0;
  color: $white;
  cursor: pointer;
  &.is-active {
    background-color: $light;
  }
}

.auth-form {
  box-shadow: $shadow;
  padding: 20px;
  border-radius: 4px;
}

.label {
  color: $accent;
  padding-left: 5px;
}

.input {
  width: 100%;
  padding: 5px 10px;
  border: 1px solid $border;
  outline: none;

  &:focus {
    border-color: $pale;
  }
}
</style>
