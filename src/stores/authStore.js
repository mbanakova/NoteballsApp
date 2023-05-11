import { defineStore } from 'pinia'
import { auth } from '@/js/firebase.js'
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { reactive } from 'vue';
import router from '@/router'
import { useNotesStore } from '@/stores/notesStore'

export const useAuthStore = defineStore('auth', () => {
  let userData = reactive({ id: '', email: '' })
  const notesStore = useNotesStore()

  const init = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData.id = user.uid;
        userData.email = user.email
        router.push('/')
        notesStore.init()

      } else {
        userData.id = ''
        userData.email = ''
        router.replace('/auth')
      }
    });
  }

  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
        // console.log(user + ' userCredential');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const loginUser = (credentials) => {
    // console.log('user logged in ' + credentials);

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user + ' userCredential');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      notesStore.clearNotes()
    }).catch((error) => {
      console.log(error.message);
    });
  }



  return { userData, registerUser, loginUser, logoutUser, init }
})
