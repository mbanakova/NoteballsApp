<template>
  <div class="stats">
    <table>
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>number of notes</td>
          <td>{{ store.totalNotesCount() }}</td>
        </tr>
        <tr>
          <td>number of chars for all notes</td>
          <td>{{ store.totalCharsCount() }}</td>
        </tr>
      </tbody>
    </table>

    <input type="text" placeholder="do you like noteballs?" v-autofocus v-model="loveNoteBalls" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notesStore.js'
import { vAutofocus } from '@/directives/vAutofocus.js'
import { useWatchCharacters } from '@/use/useWatchCharacters.js'

const store = useNotesStore()

const loveNoteBalls = ref('')
useWatchCharacters(loveNoteBalls, 50)
</script>

<style lang="scss" scoped></style>
