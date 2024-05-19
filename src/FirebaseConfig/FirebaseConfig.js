// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC__3H8kybaeXumJQx-hDVWhLMQljHBlIE",
  authDomain: "urbanecart-3d101.firebaseapp.com",
  projectId: "urbanecart-3d101",
  storageBucket: "urbanecart-3d101.appspot.com",
  messagingSenderId: "678784449337",
  appId: "1:678784449337:web:0ed154a3a71cdf4ed146e8",
  measurementId: "G-CEHBJT7B44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth();
export{app,auth, analytics};