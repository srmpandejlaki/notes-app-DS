class utils {
  static emptyElement(element) {
    element.innerHTML = "";
  }

  static sleep(response = null) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(response);
      }, 1000),
    );
  }

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
}

export default utils;
