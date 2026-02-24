import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzHz720CvOk117e3UiBxnoFhgdGul1fUk",
  authDomain: "fir-auth-system-30447.firebaseapp.com",
  projectId: "fir-auth-system-30447",
  storageBucket: "fir-auth-system-30447.firebasestorage.app",
  messagingSenderId: "201243443869",
  appId: "1:201243443869:web:14cac70ef2a4790db3ca74",
  measurementId: "G-6SXJ124H1Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");
