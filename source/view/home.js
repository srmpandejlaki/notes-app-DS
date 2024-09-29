import utils from "../utils.js";
import noteData from "../data/local/notesData.js";

const home = () => {
  const searchNote = document.querySelector("search-bar");

  const NoteContainerElement = document.querySelector("#notesData");
  const QueryWaitingNote = document.querySelector("note-waiting");
  const LoadingNote = document.querySelector("search-loading");
  const ListNote = NoteContainerElement.querySelector("notes-list");

  const showNotes = (query) => {
    showLoading();

    const result = noteData.searchNote(query);
    displayResult(result);

    showNoteList();
  };

  const onSearchHandler = (event) => {
    event.preventDefault();

    const { query } = event.detail;
    showNotes(query);
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("notes-item");
      noteItemElement.note = note;

      return clubItemElement;
    });

    utils.emptyElement(ListNote);
    ListNote.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(NoteContainerElement.children).forEach((element) => {
      utils.hideElement(element);
    });
    utils.showElement(ListNote);
  };

  const showLoading = () => {
    Array.from(NoteContainerElement.children).forEach((element) => {
      utils.hideElement(element);
    });
    utils.showElement(LoadingNote);
  };

  const showQueryWaiting = () => {
    Array.from(NoteContainerElement.children).forEach((element) => {
      utils.hideElement(element);
    });
    utils.showElement(QueryWaitingNote);
  };

  searchNote.addEventListener("search", onSearchHandler);
  showQueryWaiting();
};

export default home;
