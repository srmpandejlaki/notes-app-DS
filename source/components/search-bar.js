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
        display: inline-block;
        width: 100%;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
    
      .floating-form {
        background-color: #b8b8d1;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        width: 100%;
      }
 
      .search-form {
        display: flex;
        gap: 1rem;
      }
 
      .form-group {
        flex: 1;
      }
 
      .search-form .form-group input {
        display: block;
        width: 100%;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        flex: 1;
      }
 
      .search-form .form-group input::placeholder {
        font-size: 1rem;
      }      
        
      .glass {
        background: linear-gradient(135deg, #ababd3, #a7a7ca);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 10px;
      }
 
      .search-form button {
        border: 1px solid white;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        background-color: #9292ce;
        font-size: 1rem;
        color: white;
 
        cursor: pointer;
 
        transition: 100ms linear;
      }
 
      .search-form button:hover {
        background-color: #5b5f97;
      }

      @media screen and (max-width: 320px) {
      .search-form {
        flex-direction: column;
      }
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
            <input id="name" name="name" type="text" placeholder="Search Note"/>
          </div>
 
          <button type="submit">Search</button>
        </form>
      </div>
    `;
  }
}

customElements.define("search-bar", searchBar);
