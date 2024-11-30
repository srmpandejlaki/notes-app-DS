class NotesList extends HTMLElement {
  _emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();

    this.innerHTML += `
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("notes-list", NotesList);
