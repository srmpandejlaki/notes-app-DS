class headerBar extends HTMLElement {
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
         background-color: #1f2024;
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

        .brand {
          color: rgb(253, 253, 253);

        .brand span {
          color: lightgrey;
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
            <h2 class='brand'>Notes. <span>App</span></h2>
          </div>
        `;
  }
}

customElements.define("header-bar", headerBar);
