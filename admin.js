import { auth, db, storage } from "./firebase.js";
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const loginForm = document.getElementById('login-form');
const adminPanel = document.getElementById('admin-panel');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const newsText = document.getElementById('news-text');
const newsImage = document.getElementById('news-image');
const publishBtn = document.getElementById('publish-btn');
const adminNewsList = document.getElementById('admin-news-list');

async function loadAdminNews() {
    adminNewsList.innerHTML = '';
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(d => {
        const data = d.data();
        const item = document.createElement('div');
        item.classList.add('news-item');
        item.innerHTML = `
            <p class="date">${new Date(data.createdAt.toDate()).toLocaleDateString()}</p>
            <p>${data.text}</p>
            ${data.imageUrl ? `<img src="${data.imageUrl}" alt="Новость">` : ''}
            <button data-id="${d.id}">Удалить</button>
        `;
        adminNewsList.appendChild(item);
        item.querySelector('button').addEventListener('click', () => deleteNews(d.id));
    });
}

async function deleteNews(id) {
    await deleteDoc(doc(db, 'news', id));
    loadAdminNews();
}

loginBtn.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .catch(error => console.error(error));
});

publishBtn.addEventListener('click', async () => {
    let imageUrl = null;
    if (newsImage.files[0]) {
        const storageRef = ref(storage, `images/${Date.now()}`);
        await uploadBytes(storageRef, newsImage.files[0]);
        imageUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'news'), {
        text: newsText.value,
        imageUrl,
        createdAt: serverTimestamp()
    });
    newsText.value = '';
    newsImage.value = '';
    loadAdminNews();
});

logoutBtn.addEventListener('click', () => signOut(auth));

auth.onAuthStateChanged(user => {
    if (user) {
        loginForm.style.display = 'none';
        adminPanel.style.display = 'block';
        loadAdminNews();
    } else {
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
    }
});