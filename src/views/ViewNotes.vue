<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      ref="addEditNoteRef"
      placeholder="add a new note"
      label="Add note"
    >
      <template #buttons
        ><button class="form__button" @click="addNote(newNote)" :disabled="!newNote">Submit</button>
      </template>
    </AddEditNote>

    <NoteCard class="card" v-for="note in notesStore.notes" :key="note.id" :note="note"></NoteCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore'
import { useWatchCharacters } from '@/use/useWatchCharacters.js'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import NoteCard from '@/components/Notes/NoteCard.vue'

const notesStore = useNotesStore()
const newNote = ref('')
const addEditNoteRef = ref(null)

const addNote = (content) => {
  notesStore.addNote(content)

  newNote.value = ''
  addEditNoteRef.value.focusTextArea()
}

useWatchCharacters(newNote)
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
