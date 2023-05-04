<template>
  <AddEditNote
    ref="addEditNoteRef"
    v-model="noteContent"
    bgColor="default"
    placeholder="edit note"
    label="edit note"
  >
    <template #buttons
      ><button @click="$router.back()">Cancel</button>
      <button class="form__button" :disabled="!noteContent" @click="handleSaveClicked">
        Submit
      </button>
    </template>
  </AddEditNote>
</template>

<script setup>
import { ref } from 'vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useNotesStore } from '@/stores/notesStore.js'
import { useRoute, useRouter } from 'vue-router'

const store = useNotesStore()
const route = useRoute()
const router = useRouter()

const noteContent = ref('')
const noteId = route.params.id

noteContent.value = store.getNoteContent(noteId)

const handleSaveClicked = () => {
  store.updateNote(noteId, noteContent.value)

  router.push('/')
}
</script>

<style lang="scss" scoped></style>
