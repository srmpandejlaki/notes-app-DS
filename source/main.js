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
  // const date

  const generateID = generateId("notes");
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

// buat objek note
function generateNotesData(id, title, body, createdAt, archived) {
  return { id, title, body, createdAt, archived };
}

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
