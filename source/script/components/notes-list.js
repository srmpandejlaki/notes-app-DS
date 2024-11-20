import utils from "../utils.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["width", "borderGlass"];
  }

  constructor() {
    super();

    this._width = this.getAttribute("width");
    this._borderGlass = this.getAttribute("borderGlass");

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

  set borderGlass(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;
    this._borderGlass = value;
  }
  get borderGlass() {
    return this._borderGlass;
  }

  _updateStyle() {
    this._style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }

      :host {
        width: 100%;
        height: 100%;
      }

      .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        padding: 1.5rem;
        max-width: ${this._width}vw;

        border-radius: 8px;
        gap: 16px;
      }

      .glass {
        background: linear-gradient(135deg, #ababd3, #a7a7ca);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: ${this._borderGlass}px solid rgba(255, 255, 255, 0.45);
        border-radius: 10px;
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
      <div class="list glass">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "width":
        this.width = newValue;
        break;
      case "borderGlass":
        this.borderGlass = newValue;
        break;
    }
    this.render();
  }
}

customElements.define("notes-list", NotesList);
