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
         background-color: #5b5f97;
      }

      div {
        height: 8vh;

        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        margin: 0;
        padding: 0;
      }

      .sign {
        text-align: center;
        font-size: 1rem;
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
