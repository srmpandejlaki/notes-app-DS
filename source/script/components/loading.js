class Loading extends HTMLElement {
  emptyContent() {
    this.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.emptyContent();

    this.innerHTML += `Waiting...`;
  }
}

customElements.define("loading-respon", Loading);
