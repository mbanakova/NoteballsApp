<template>
  <div class="card">
    <div class="card__content">
      {{ note.content }}
      <div class="card__content-length">
        <small class="card__date">Date {{ dateFormatted }} </small>
        <small class="card__length">&nbsp;{{ characterLength }}</small>
      </div>
    </div>
    <footer class="card__footer">
      <RouterLink :to="`/editNote/${note.id}`" class="card__footer-item">Edit</RouterLink>
      <a href="#" class="card__footer-item" @click.prevent="modals.deleteNote = true">Delete</a>
    </footer>
    <ModalDeleteNote
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    ></ModalDeleteNote>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
import { useDateFormat } from '@vueuse/core'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.note.date))
  return useDateFormat(date, 'DD.MM.YYYY HH:mm').value
})

const characterLength = computed(() => {
  let length = props.note.content.length
  let description = length > 1 ? 'characters' : 'character'

  return `${length} ${description}`
})

const modals = reactive({
  deleteNote: false
})
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow;
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
.card__date {
  color: $success;
}
.card__length {
  color: $accent;
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
