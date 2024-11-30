class headerBar extends HTMLElement {
  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.innerHTML += `
      <div class='header'>
        <h2 class='brand'>Notes. <span>App</span></h2>
      </div>
    `;
  }
}

customElements.define("header-bar", headerBar);
