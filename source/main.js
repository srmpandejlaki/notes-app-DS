import "./components/index.js";

document.addEventListener("DOMContentLoaded", function () {
  const submitNotes = document.getElementById("noteForm");
  submitNotes.addEventListener("submit", function (event) {
    event.preventDefault();
    addNote();
  });
  if (isstorageExist()) {
    loadDataFromStorage();
  }
});

let story = [];
const RENDER_EVENT = "render-note";

// tambah note baru
function addNote() {
  const title = document.getElementById("title").value;
  const body = document.getElementById("description").value;

  const generateID = generateId("notes");
  const date = generateDate();
  const notesData = generateNotesData(generateID, title, body, date, false);
  story.push(notesData);

  document.dispatchEvent(new Event(RENDER_EVENT));
  document.getElementById("noteForm").reset();
  saveData();
}

// buat id
function generateId(prefix, length = 5) {
  const number = Math.floor(10000 + Math.random() * 90000);
  const word = "abcdefghijklmnopqrstuvwxyz";
  let suffix = "";

  for (let i = 0; i < length; i++) {
    suffix += word.charAt(Math.floor(Math.random() * word.length));
  }

  return `${prefix}-${number}-${suffix}`;
}

// generate createdAt
function generateDate() {
  const today = new Date();
  const isoString = today.toISOString();
  return isoString;
}

// buat objek note
function generateNotesData(id, title, body, createdAt, archived) {
  return { id, title, body, createdAt, archived };
}

// buat notes

// simpan data
document.addEventListener(RENDER_EVENT, function () {
  const saveNotes = document.getElementById("note");
  saveNotes.innerHTML = "";
});

function saveData() {
  if (isstorageExist()) {
    const parsed = JSON.stringify(story);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "note-tersimpan";
const STORAGE_KEY = "NOTES_APP";

function isstorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const noteStory of data) {
      story.push(noteStory);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}
