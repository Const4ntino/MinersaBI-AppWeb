// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoOrar7OZZ8wmQL20_EHWtIP_FpXzMMJE",
  authDomain: "login-minersa.firebaseapp.com",
  projectId: "login-minersa",
  storageBucket: "login-minersa.firebasestorage.app",
  messagingSenderId: "619053340446",
  appId: "1:619053340446:web:6633099a2a0039a4851b0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;