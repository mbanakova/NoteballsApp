<template>
  <div class="modal is-active">
    <div class="modal__background"></div>
    <div class="modal__card" ref="modalCardRef">
      <header class="modal__card-head">
        <p class="modal__card-title">Delete note?</p>
        <button class="delete" aria-label="close" @click="closeModal">x</button>
      </header>
      <section class="modal__card-body">Are you sure you want to delete note?</section>
      <footer class="modal__card-footer">
        <button class="button" @click="closeModal">Cancel</button>
        <button class="button is-success" @click="store.deleteNote(noteId)">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotesStore } from '@/stores/notesStore.js'

const store = useNotesStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

const modalCardRef = ref(null)

onClickOutside(modalCardRef, closeModal)

const handleKeyboard = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard)
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.modal__background {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}

.modal__card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $white;
  padding: 20px;
  border-radius: 8px;
}

.modal__card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.modal__card-title {
  margin: 0;
}

.modal__card-body {
  margin-bottom: 20px;
}

.modal__card-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.button {
  background-color: $pale;

  &.is-success {
    background-color: $error;
  }
}
</style>
