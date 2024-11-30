import "./components/footer-bar.js";
import "./components/header-bar.js";
import "./components/loading.js";
import "./components/notes-item.js";
import "./components/notes-list.js";
import "../css/style.css";

import { home, renderUnArchive } from "./view/home.js";

document.addEventListener("DOMContentLoaded", () => {
  renderUnArchive();
  home();
});
