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
          width: 100%;

          color: white;

          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
        }

        div {
          height: 15%;
        }

        .brand {
          margin: 0;
          color: rgb(253, 253, 253);
          padding: 2.5vh 5vh;
        }

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
