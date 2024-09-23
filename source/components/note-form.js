class noteForm extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          width: 100%;
        }

        button {
          background-color: hsl(180, 24%, 35%);
          color: white;
          border-radius: 8px;
        }

        button:hover {
          background-color: hsl(180, 32%, 30%);
        }

        form {
          width: 90%;
          height: 30vh;
          padding: 10px;

          background-color: hsl(180, 24%, 35%);
          gap: 5px;
          border-radius: 8px;
          border: 1px solid rgb(70, 70, 70);
  
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .input-title,
        .input-desc {
          height: 25%;
          display: flex;
          flex-direction: column;
        }

        label,
        .notesData h2,
        .notesData p,
        .notesData h3 {
          color: white;
          margin-bottom: 5px;
        }

        input {
          padding: 8px;
        }

        textarea {
          resize: none;
          padding: 16px 7px;
        }

        .save-btn {
          width: 5rem;
          height: 15%;
          align-items: center;
          border: 2px solid white;

          align-self: end;
        }

        `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
          <form>
          <div class="input-title">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div class="input-desc">
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <button class="save-btn" type="submit">Save Note</button>
        </form>
        `;
  }
}

customElements.define("note-form", noteForm);
