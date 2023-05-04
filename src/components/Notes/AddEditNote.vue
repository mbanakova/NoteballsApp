<template>
  <div class="form" :class="`form--${props.bgColor}`">
    <label v-if="label">{{ label }}</label>
    <textarea
      class="form__textarea"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="textareaRef"
      v-autofocus
      maxlength="100"
    ></textarea>
    <slot name="buttons"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vAutofocus } from '@/directives/vAutofocus.js'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'type smth'
  },
  label: {
    type: String
  }
})

const textareaRef = ref(null)

const focusTextArea = () => {
  textareaRef.value.focus()
}

defineExpose({ focusTextArea })
</script>

<style lang="scss" scoped>
.form {
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &--default {
    background-color: $light;
  }

  &--success {
    background-color: $success;
  }
}
.form__textarea {
  min-height: 60px;
  resize: vertical;
  padding: 10px;
  border-radius: 8px;
}
.form__button {
  align-self: flex-end;
  cursor: pointer;
}
</style>
