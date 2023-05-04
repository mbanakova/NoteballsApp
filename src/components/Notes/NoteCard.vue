<template>
  <div class="card">
    <div class="card__content">
      {{ note.content }}
      <div class="card__content-length">
        <small>{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card__footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card__footer-item">Edit</RouterLink>
      <a href="#" class="card__footer-item" @click.prevent="notesStore.deleteNote(note.id)"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notesStore'

const notesStore = useNotesStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'

  return `${length} ${description}`
})
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  background-color: $white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card__content {
  padding-bottom: 20px;
  border-bottom: 1px solid $border;
}

.card__content-length {
  text-align: right;
  color: $border;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__footer-item {
  text-align: center;
  text-decoration: none;
  width: 50%;
}
</style>
