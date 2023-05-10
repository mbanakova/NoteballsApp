<template>
  <TheNav></TheNav>
  <div class="container">
    <RouterView> </RouterView>
  </div>
</template>

<script setup>
import TheNav from '@/components/TheNav.vue'
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.init()
})
</script>
