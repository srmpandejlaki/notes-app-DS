class NotesItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    // Render ulang
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: flex;
        align-items: stretch;
        background-color: white;
        border-radius: 10px;
      }

      .data {
        width: 100%;
        border-radius: 10px;

        padding: 10px;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
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
