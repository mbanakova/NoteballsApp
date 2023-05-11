import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection, doc, onSnapshot, deleteDoc, updateDoc, query, orderBy, addDoc
} from "firebase/firestore"
import { db } from '@/js/firebase.js'
import { useAuthStore } from '@/stores/authStore'


let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])
  let notesLoaded = ref(false)

  const init = () => {
    const authStore = useAuthStore()
    notesCollectionRef = collection(db, 'users', authStore.userData.id, 'notes')
    notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc")) //, limit(2))
    getNotes()
  }

  const getNotes = async () => {
    notesLoaded.value = false

    getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let array = []
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        }
        array.push(note)
      });

      notes.value = array
      notesLoaded.value = true
    });
  }

  const clearNotes = () => {
    notes.value = []
    if (getNotesSnapshot) getNotesSnapshot()  //unsubscribe from any active listener
  }

  const addNote = async (content) => {
    let currentDate = new Date().getTime(),
      date = currentDate.toString()

    await addDoc(notesCollectionRef, {
      content,
      date
    });
  }

  const deleteNote = async (id) => {
    await deleteDoc(doc(notesCollectionRef, id));
    // notes.value = notes.value.filter(note => note.id !== id)
  }

  const getNoteContent = (id) => {
    return notes.value.filter(note => note.id === id)[0].content
  }

  const updateNote = async (id, content) => {
    const notesRef = doc(notesCollectionRef, id);
    await updateDoc(notesRef, { content });
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

  return { notes, notesLoaded, init, getNotes, clearNotes, addNote, deleteNote, getNoteContent, updateNote, totalNotesCount, totalCharsCount }
})