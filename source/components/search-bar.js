class searchBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  _submitNote = "submit";
  _searchNote = "search";

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");

    this.render();
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => this._onSubmit(event, this));
    this.addEventListener(this._submitNote, this._onSearchSubmit);
  }

  disconnectedCallback() {
    this._shadowRoot
      .querySelector("form")
      .removeEventListener("submit", (event) => this._onSubmit(event, this));
    this.removeEventListener(this._submitNote, this._onSearchSubmit);
  }

  _onSubmit(event, searchBar) {
    searchBar.dispatchEvent(new CustomEvent("submit"));

    event.preventDefault();
  }

  _onSearchSubmit() {
    const query = this._shadowRoot.querySelector("input#name");

    if (!query) return;

    this.dispatchEvent(
      new CustomEvent(this._searchNote, { detail: { query }, bubbles: true })
    );
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: inline;
      }
    
      .floating-form {
        background-color: #b8b8d1;
        padding: 12px;
        border-radius: 8px;
      }
 
      .search-form {
        display: flex;
      }
 
      .search-form .form-group {
        flex-grow: 1;
        position: relative;
      }
 
      .search-form .form-group input {
        display: block;
 
        width: 95%;
        height: 60px;
 
        padding: 14px 10px 0 10px;

        font-size: 1rem;
      }
 
      .search-form .form-group label {
        line-height: 60px;
        font-size: 0.8em;
        font-weight: 700;
        text-transform: uppercase;
        color: #5b5f97;
 
        position: absolute;
      }
        
      .glass {
        background: linear-gradient(135deg, #ababd3, #a7a7ca);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 10px;
      }
        
      .search-form .form-group input:focus-visible ~ label,
      .search-form .form-group input:valid ~ label {
        left: 10px;
        top: -16px;
 
        font-size: 0.8em;
      }
 
      .search-form button {
        border: 1px solid white;
        border-radius: 8px;
        padding-inline: 24px;
        background-color: #9292ce;
 
        text-transform: uppercase;
        font-size: 1rem;
        color: white;
 
        cursor: pointer;
 
        transition: 100ms linear;
      }
 
      .search-form button:hover {
        background-color: #5b5f97;
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="floating-form glass">
        <form id="searchForm" class="search-form">
          <div class="form-group">
            <input id="name" name="name" type="search" />
            <label for="name">Search Your Note</label>
          </div>
 
          <button>Search</button>
        </form>
      </div>
    `;
  }
}

customElements.define("search-bar", searchBar);
