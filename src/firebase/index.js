import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY
const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'kidedu-940f6.firebaseapp.com',
  projectId: 'kidedu-940f6',
  storageBucket: 'kidedu-940f6.appspot.com',
  messagingSenderId: '346661849247',
  appId: APP_ID,
  measurementId: 'G-KZVST7D56W'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth()

//auth handle
export const user = ref(null)

onAuthStateChanged(auth, (userLogged) => {
  if (userLogged) {
    user.value = userLogged
  } else {
    user.value = null
  }
})
