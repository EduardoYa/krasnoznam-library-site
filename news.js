import { db } from "firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadNews() {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement('div');
        item.classList.add('news-item');
        item.innerHTML = `
            <p class="date">${new Date(data.createdAt.toDate()).toLocaleDateString()}</p>
            <p>${data.text}</p>
            ${data.imageUrl ? `<img src="${data.imageUrl}" alt="Новость">` : ''}
        `;
        newsList.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadNews);
