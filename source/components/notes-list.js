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
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        margin: 1rem;
        padding: 1rem;

        width: ${this._width}vw;
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
