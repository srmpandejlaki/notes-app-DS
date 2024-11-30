class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["width"];
  }

  constructor() {
    super();

    this._width = this.getAttribute("width");

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  set width(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;
    this._width = value;
  }
  get width() {
    return this._width;
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        width: ${this._width}%;
        box-sizing: border-box;
      }

      div {
        background-color: #1f2024;
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
        color: white;
      }
    `;
  }
  _emptyContent() {
    this._shadowRoot.innerHTML = "";
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

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
    this.render();
  }
}
customElements.define("footer-bar", FooterBar);
