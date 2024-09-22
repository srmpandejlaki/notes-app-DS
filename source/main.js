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
