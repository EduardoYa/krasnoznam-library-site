import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpEXbSY2PVE2bPxK3qNC5F7pbsWM8xwOc",
    authDomain: "kranoznamlibrary.firebaseapp.com",
    projectId: "kranoznamlibrary",
    storageBucket: "kranoznamlibrary.firebasestorage.app",
    messagingSenderId: "76387789939",
    appId: "1:76387789939:web:313568db0289aee8c60e06",
    measurementId: "G-138XVVESVY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };