class FooterBar extends HTMLElement {
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
      }

      div {
        height: 8.5vh;
        background-color: #5b5f97;
        margin: 0;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .sign {
        text-align: center;
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
      <div>
        <p class='sign'>Mutii &copy; 2024</p>
      </div>
    `;
  }
}
customElements.define("footer-bar", FooterBar);
