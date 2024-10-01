import utils from "../utils.js";

class NotesList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  static get observedAttributes() {
    return ["margin", "padding"];
  }

  constructor() {
    super();

    this._margin = this.getAttribute("margin");
    this._padding = this.getAttribute("padding");

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        
        margin: ${this._margin}px;
        padding: ${this._padding}rem;

        border-radius: 8px;
        background-color: hsl(180, 24%, 35%);
      
        gap: 16px;
      }
    `;
  }

  set margin(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;

    this._margin = value;
  }

  get margin() {
    return this._margin;
  }

  set padding(value) {
    const newValue = Number(value);
    if (!utils.isValidInteger(newValue)) return;

    this._padding = value;
  }

  get padding() {
    return this._padding;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="list">
        <slot></slot>
      </div>
    `;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "margin":
        this.margin = newValue;
        break;
      case "padding":
        this.padding = newValue;
        break;
    }

    this.render();
  }
}

customElements.define("notes-list", NotesList);
