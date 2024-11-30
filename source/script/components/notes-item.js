import NotesApi from "../data/remote/notesData-API";
import { renderArchive, renderUnArchive } from "../view/home";

class NotesItem extends HTMLElement {
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  set note(value) {
    this._note = value;
    this.render();
  }
  get note() {
    return this._note;
  }

  buttonFunction() {
    const allList = document.getElementById("btnAll");
    const archiveList = document.getElementById("btnArchive");

    const btnArchive = this.querySelector(".btnArchive");
    if (this._archive) {
      btnArchive.removeEventListener("click", this._archive);
    }
    this._archive = async (event) => {
      event.preventDefault();

      const id = this._note.id;
      await NotesApi.archiveNote(id);

      renderArchive();
      allList.classList.remove("active");
      archiveList.classList.add("active");
    };
    btnArchive.addEventListener("click", this._archive);

    const btnUnArchive = this.querySelector(".btnUnArchive");
    if (this.unArchive) {
      btnUnArchive.removeEventListener("click", this._unArchive);
    }
    this._unArchive = async (event) => {
      event.preventDefault();

      const id = this._note.id;
      await NotesApi.non_archiveNote(id);

      renderUnArchive();
      allList.classList.add("active");
      archiveList.classList.remove("active");
    };
    btnUnArchive.addEventListener("click", this._unArchive);

    const btnDelete = this.querySelector(".btnDelete");
    if (this._delete) {
      btnDelete.removeEventListener("click", this._delete);
    }
    this._delete = async (event) => {
      event.preventDefault();

      const id = this._note.id;
      await NotesApi.deleteNote(id);

      if (this._note.archived) {
        renderArchive();
        allList.classList.remove("active");
        archiveList.classList.add("active");
      } else {
        renderUnArchive();
        allList.classList.add("active");
        archiveList.classList.remove("active");
      }
    };
    btnDelete.addEventListener("click", this._delete);
  }

  render() {
    this.innerHTML += `
      <div class='data'>
        <div>
          <h3>${this._note.title}</h3>
        </div>
        <div>
          <p>${this._note.body}</p>
        </div>
        <div class="grupBtn">
        <button class="btnArchive"> Archive </button>
        <button class="btnUnArchive"> Unarchive </button>
        <button class="btnDelete"> Delete </button>
        </div>
      </div>
    `;
    this.buttonFunction();
  }
}
customElements.define("notes-item", NotesItem);
