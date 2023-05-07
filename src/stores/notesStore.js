import { defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore"
import { db } from '@/js/firebase.js'

const notesCollectionRef = collection(db, "notes")

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  const getNotes = async () => {
    onSnapshot(notesCollectionRef, (querySnapshot) => {
      let array = []
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
        }
        array.push(note)
      });
      notes.value = array
    });
  }

  const addNote = async (content) => {
    let id = uuidv4()

    await setDoc(doc(notesCollectionRef, id), {
      content
    });
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

  return { notes, getNotes, addNote, deleteNote, getNoteContent, updateNote, totalNotesCount, totalCharsCount }
})