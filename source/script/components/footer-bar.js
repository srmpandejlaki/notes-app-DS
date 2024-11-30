class FooterBar extends HTMLElement {
  _emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this.innerHTML += `
      <div class='footer'>
        <p class='sign'>Mutii &copy; 2024</p>
      </div>
    `;
  }
}
customElements.define("footer-bar", FooterBar);
