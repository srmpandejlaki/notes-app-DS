import NotesApi from '../data/remote/notesData-API';
import { displayResult } from '../view/home';

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
    
      .search-form {
        display: flex;
        gap: 1rem;
        padding-top: 1rem;
      }
 
      .form-group {
        flex: 1;
      }
 
      .search-form .form-group input {
        display: block;
        width: 100%;
        font-size: 1rem;
        padding: 1rem;
        border-radius: 4px;
        flex: 1;
      }
 
      .search-form .form-group input::placeholder {
        font-size: 1rem;
      } 
 
      .search-form button {
        border: 1px solid white;
        border-radius: 4px;
        border: 1px solid #1f2024;
        padding: 0.5rem 1rem;
        background-color: white;
        font-size: 1rem;
        color: #1f2024;
 
        cursor: pointer;
        transition: 100ms linear;
      }
 
      .search-form button:hover {
        background-color: #1f2024;
        color: white;
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
      <form id="searchForm" class="search-form">
        <div class="form-group">
          <input id="name" name="name" type="text" placeholder="Search Note"/>
        </div>
 
        <button type="submit">Search</button>
      </form>
    `;
  }
}

customElements.define("search-bar", searchBar);
