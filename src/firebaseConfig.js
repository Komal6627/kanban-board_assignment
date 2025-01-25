// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpcFoOnCkojDuT_BwsBaSU2DMnbgU5khc",
  authDomain: "kanban-board-application-a3141.firebaseapp.com",
  projectId: "kanban-board-application-a3141",
  storageBucket: "kanban-board-application-a3141.firebasestorage.app",
  messagingSenderId: "893782058608",
  appId: "1:893782058608:web:d8dd2ad0d77438ffe3b6b5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


