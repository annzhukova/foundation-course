import { logout, onAuthChange } from './auth.js';
import { readEntries } from './firestore.js';

const logoutBtn = document.querySelector("#logout");
const messageDiv = document.getElementById("message");
const addEntryBtn = document.getElementById("addEntryBtn");

logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})

addEntryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "entry-editor.html?mode=new"
});

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }

    const results = await readEntries(user.uid);
    console.log(results);

    updateEntriesList(results);
})

function updateEntriesList(entries) {
    const noEntriesMsg = document.getElementById("noEntriesMsg");
    const entriesList = document.getElementById("entriesList");
    entriesList.innerHTML = "";
    if (entries.length === 0 || !entries) {
        noEntriesMsg.style.display = "block";
        return;
    }
    entries.forEach(entry => {
        const li = document.createElement("li");
        li.dataset.id = entry.id;

        li.innerHTML = `
            <div class="entry-title">${entry.title}</div>
            <div class="entry-date">${entry.created ? new Date(entry.created.seconds * 1000).toLocaleDateString() : "-"}</div>
            <div class="entry-actions">
            <button class="editEntryBtn">Edit</button>
            <button class="deleteEntryBtn">Delete</button>
            </div>`;

        const viewEntry = li.querySelector(".entry-title");
        const editEntryBtn = li.querySelector(".editEntryBtn");
        const deleteEntryBtn = li.querySelector(".deleteEntryBtn");

        viewEntry.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "entry-editor.html?mode=view&id=" + entry.id;
        });

        editEntryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "entry-editor.html?mode=edit&id=" + entry.id;
        });

        deleteEntryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "entry-editor.html?mode=delete"
        });
        entriesList.appendChild(li);
    });
}