import utils from "../utils/utils.js";
import noteDataAPI from "../data/remote/notesData-API.js";
import { customValidation } from "../utils/custom-validation.js";
import NotesApi from "../data/remote/notesData-API.js";

const loadingRender = document.createElement("loading-respon");
const noteContainer = document.querySelector("#notesData");
const Notes = noteContainer.querySelector("notes-list");

const displayResult = (record) => {
  const recordItems = record.map((note) => {
    const recordItem = document.createElement("notes-item");
    recordItem.note = note;

    return recordItem;
  });
  utils.emptyElement(Notes);
  Notes.append(...recordItems);
};

const home = () => {
  // tampil data archive dan unArchive ketika di klik
  const allList = document.getElementById("btnAll");
  allList.addEventListener("click", (ev) => {
    ev.preventDefault();
    archiveList.classList.remove("active");
    allList.classList.add("active");

    renderUnArchive();
  });

  const archiveList = document.getElementById("btnArchive");
  archiveList.addEventListener("click", (ev) => {
    ev.preventDefault();
    allList.classList.remove("active");
    archiveList.classList.add("active");

    renderArchive();
  });

  // fungsi validasi data
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
  formNote.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newNote = addNote();
    await NotesApi.addNote(newNote);

    renderUnArchive();
    allList.classList.add("active");
    archiveList.classList.remove("active");
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

// render data
const renderUnArchive = async () => {
  utils.emptyElement(Notes);
  Notes.append(loadingRender);
  try {
    const record = await noteDataAPI.getNotesUnArchived();
    await utils.sleep();
    displayResult(record);

    const btnUnArchive = document.querySelectorAll(".btnUnArchive");
    btnUnArchive.forEach((btn) => {
      btn.remove();
    });
  } catch (err) {
    console.log("maaf data tidak bisa ditampilkan", err);
  }
};

const renderArchive = async () => {
  utils.emptyElement(Notes);
  Notes.append(loadingRender);
  try {
    const record = await noteDataAPI.getNotesArchived();
    await utils.sleep();
    displayResult(record);

    const btnArchive = document.querySelectorAll(".btnArchive");
    btnArchive.forEach((btn) => {
      btn.remove();
    });
  } catch (err) {
    console.log("maaf data yang arsip tidak bisa ditampilkan", err);
  }
};

export { home, renderArchive, renderUnArchive, displayResult };
