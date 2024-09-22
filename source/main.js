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

  const generateID = generateId();
  const notesData = generateNotesData(generateID, title, body, date, false);
  story.push(notesData);

  document.dispatchEvent(new Event(RENDER_EVENT));
  document.getElementById("noteForm").reset();
  saveData();
}
