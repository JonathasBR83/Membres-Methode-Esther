import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// IMPORTANT: Paste your Firebase project's configuration object here.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyB1LvPold0rXbNcxAEp2G-plBYJFe9M2Mc",
  authDomain: "esther-members.firebaseapp.com",
  projectId: "esther-members",
  storageBucket: "esther-members.appspot.com",
  messagingSenderId: "494159393312",
  appId: "1:494159393312:web:1f7d3025e53eff775ac245",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
