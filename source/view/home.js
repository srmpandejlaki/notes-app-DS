import utils from "../utils.js";
import noteData from "../data/local/notesData.js";
import { customValidation } from "../custom-validation.js";

const home = () => {
  const notes = noteData.getAll();

  const NoteContainerElement = document.querySelector("#notesData");
  const ListNote = NoteContainerElement.querySelector("notes-list");

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("notes-item");
      noteItemElement.note = note;

      return noteItemElement;
    });

    utils.emptyElement(ListNote);
    ListNote.append(...noteItemElements);
  };

  displayResult(notes);

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
};

export default home;
