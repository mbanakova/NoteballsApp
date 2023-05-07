<template>
  <TheNav></TheNav>
  <div class="container">
    <RouterView> </RouterView>
  </div>
</template>

<script setup>
import TheNav from '@/components/TheNav.vue'
import { useNotesStore } from '@/stores/notesStore'
import { onMounted } from 'vue'

const storeNotes = useNotesStore()

onMounted(() => {
  storeNotes.getNotes()
})
</script>
