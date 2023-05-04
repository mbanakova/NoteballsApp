import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([
    {
      id: 'id1',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, velit!'
    },
    {
      id: 'id2',
      content: 'Lorem ipsum do tur adifddfpisicing elit. Totam, velit!'
    },
    {
      id: 'id3',
      content: '111Lorem ipsum dolor sit amet consectetur adipi'
    }
  ])


  const addNote = (content) => {
    console.log('add note ' + content);

    let note = {
      id: uuidv4(),
      content
    }

    notes.value.unshift(note)
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  const getNoteContent = (id) => {
    return notes.value.filter(note => note.id === id)[0].content
  }

  const updateNote = (id, content) => {
    let index = notes.value.findIndex(note => note.id === id)

    notes.value[index].content = content
  }

  const totalNotesCount = () => {
    return notes.value.length
  }

  const totalCharsCount = () => {
    let count = 0

    notes.value.forEach(note => {
      count += note.content.length
    });

    return count
  }

  return { notes, addNote, deleteNote, getNoteContent, updateNote, totalNotesCount, totalCharsCount }
})