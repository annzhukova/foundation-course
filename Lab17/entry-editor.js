import { onAuthChange } from "./auth.js";
import { createNewEntryInFirestore, readEntry, updateEntryInFirestore } from "./firestore.js";

const entryTitle = document.getElementById("entryTitle");
const entryContent = document.getElementById("entryContent");
const entryTags = document.getElementById("entryTags");
const entryVisibility = document.getElementById("entryVisibility");
const archiveArea = document.getElementById("archiveArea");
const saveEntryBtn = document.getElementById("saveEntryBtn");
const cancelEntryBtn = document.getElementById("cancelEntryBtn");

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");
const entryId = urlParams.get("id");

let currentUser = null;

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    currentUser = user;
    switch (mode) {
        case 'new':
            {
                //Form elements should be enabled
                disableFormFields(false);
                saveEntryBtn.textContent = "save Entry";
                break;
            }
        case 'view':
            {
                //Form elements should be disabled
                disableFormFields(true);
                saveEntryBtn.textContent = "Edit Entry";
                displayData();
                break;
            }
        case 'edit':
            {
                //Form elements should be enabled
                disableFormFields(false);
                saveEntryBtn.textContent = "Update Entry";
                displayData();
                break;
            }
        default:
            {
                console.error("unknown mode: " + mode);
                window.location.href = "app.html";
            }
    }


});

function disableFormFields(disable) {
    entryTitle.disabled = disable;
    entryContent.disabled = disable;
    entryTags.disabled = disable;
    entryVisibility.disabled = disable;
    archiveArea.disabled = disable;
}

saveEntryBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (mode === 'new') {
        //submit data to firebase
        createNewEntry();
    }
    else if (mode === 'view') {
        //Switch the page from view to edit
        window.location.href = "entry-editor.html?mode=edit&id=" + entryId;
    }
    else if (mode === 'edit') {
        //push the updated data to firebase
        updateExistingEntry();
    }
})

function createNewEntry() {
    //we need to collect the data from fields
    const newEntryData = prepareNewEntryData();
    console.log(newEntryData);
    //push to firestore
    const status = createNewEntryInFirestore(newEntryData);
    if (status) {
        window.location.href = "app.html";
    }
}

function collectFormData() {
    const title = entryTitle.value.trim();
    const content = entryContent.value.trim();
    const tags = entryTags.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const visibility = entryVisibility.value;
    const isArchived = archiveArea.ariaChecked;

    return { title, content, tags, visibility, isArchived };
}

function prepareNewEntryData() {
    const formFields = collectFormData();
    const timestamp = new Date();
    return {
        ...formFields,
        created: timestamp,
        updated: timestamp,
        userId: currentUser.uid,
    }
}

async function displayData() {
    // Get the data from Firestore
    readEntry(entryId).then(data => {
        //show the data in the form
        if (data) {
            displayDataInForm(data);
        } else {
            console.error("Entry was not found!");
            window.location.href = "app.html";
        }
    });

}

function displayDataInForm(data) {
    entryTitle.value = data.title;
    entryContent.value = data.content;
    entryTags.value = (data.tags && Array.isArray(data.tags)) ? data.tags.join(', ') : "";
    entryVisibility.value = data.visibility;
    //archiveArea = data.isArchived;
}

async function updateExistingEntry() {
    const updatedEntryData = prepareUpdatedEntryData();
    //push to firestore
    const status = await updateEntryInFirestore(entryId, updatedEntryData);
    if (status) {
        window.location.href = "app.html";
    }
}

function prepareUpdatedEntryData() {
    const formFields = collectFormData();
    const timestamp = new Date();
    return {
        ...formFields,
        updated: timestamp,
    }
}