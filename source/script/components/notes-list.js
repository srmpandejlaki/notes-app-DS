import utils from "../utils/utils.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["minmax", "width", "gap"];
  }

  constructor() {
    super();

    this._width = this.getAttribute("width");
    this._minmax = this.getAttribute("minmax");
    this._gap = this.getAttribute("gap");

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }
 
  set minmax(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;
    this._minmax = value;
  }
  get minmax() {
    return this._minmax;
  }

  set width(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;
    this._width = value;
  }
  get width() {
    return this._width;
  }
  
  set gap(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;
    this._gap = value;
  }
  get gap() {
    return this._gap;
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
        grid-template-columns: repeat(auto-fill, minmax(${this._minmax}px, 1fr));
        padding: 1.5rem 0;
        max-width: ${this._width}vw;
        gap: ${this._gap}px;
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
      case "minmax":
        this.minmax = newValue;
        break;
      case "width":
        this.width = newValue;
        break;
      case "gap":
        this.gap = newValue;
        break;
    }
    this.render();
  }
}

customElements.define("notes-list", NotesList);
