import { watch } from 'vue'

export function useWatchCharacters(valueToWatch, maxChars = 100) {
  watch(valueToWatch, (newvalue) => {
    if (newvalue.length === maxChars) {
      alert(`only ${maxChars} chars allowed gosh damnit!`)
    }
  })
}