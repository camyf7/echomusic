import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD488EVLQXcIlqtnnJBmZ54SOGn-1X2GVs",
  authDomain: "echomusic-1-8735e.firebaseapp.com",
  projectId: "echomusic-1-8735e",
  storageBucket: "echomusic-1-8735e.firebasestorage.app",
  messagingSenderId: "58607629067",
  appId: "1:58607629067:web:6386b26e393eeba262a80e",
  measurementId: "G-0XR1P2QEK3"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Função de login com popup do Google
export async function signInWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
    throw error;
  }
}

// Função de logout
export async function logout() {
  await signOut(auth);
}

export { auth, googleProvider };
