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

  render() {
    this.innerHTML += `
      <div class='data'>
        <div>
          <h3>${this._note.title}</h3>
        </div>
        <div>
          <p>${this._note.body}</p>
        </div>
      </div>
    `;
  }
}
customElements.define("notes-item", NotesItem);
