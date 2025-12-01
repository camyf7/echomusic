import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut 
} from "firebase/auth";

// 🔥 SUA CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SUA_DOMAIN",
  projectId: "SEU_PROJECT",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER",
  appId: "SEU_APP",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Autenticação
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ===============================
// 🔵 Função personalizada (OBRIGATÓRIA) 
// ===============================
// Essa função é a que o seu front tenta importar.
// Sem ela, dá erro.
export async function signInWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Erro ao logar com Google:", error);
    throw error;
  }
}

// Exports principais
export { auth, googleProvider, signOut };