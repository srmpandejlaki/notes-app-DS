import utils from "../utils/utils.js";
import noteData from "../data/local/notesData.js";
import { customValidation } from "../utils/custom-validation.js";

const home = () => {
  const record = noteData.getAll();
  console.log(record);

  const NoteContainer = document.querySelector("#notesData");
  const ListNote = NoteContainer.querySelector("notes-list");

  const displayResult = (record) => {
    const recordItems = record.map((note) => {
      const recordItem = document.createElement("notes-item");
      recordItem.note = note;

      return recordItem;
    });
    utils.emptyElement(ListNote);
    ListNote.append(...recordItems);
  };
  displayResult(record);

  // custom validation
  const form = document.querySelector("form");
  const titleInput = form.elements["title"];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  titleInput.addEventListener("change", customValidation);
  titleInput.addEventListener("invalid", customValidation);

  titleInput.addEventListener("blur", (event) => {
    // Validate the field
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId = event.target.getAttribute("aria-describedby");
    const connectedValidationEl = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });
  
  const formNote = document.querySelector("#noteForm");
  formNote.addEventListener("submit", (event) => {
    event.preventDefault();

    const newNote = addNote();

    const recordItem = document.createElement("notes-item");
    recordItem.note = newNote;
    ListNote.append(recordItem);
    formNote.reset();
  });

  // tambah note baru
  function addNote() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("description").value;

    const newNote = {
      id: generateUUID(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };
    return newNote;
  }

  // generate UUID
  function generateUUID() {
    return (
      "notes-" +
      Math.floor(Math.random() * 10000) +
      "-" +
      Math.floor(Math.random() * 10000) +
      "-" +
      Math.floor(Math.random() * 10000) +
      "-" +
      Math.floor(Math.random() * 10000)
    );
  }
};

export default home;
