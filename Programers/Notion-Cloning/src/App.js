import { request } from "./api.js";

export default function App({ $target }) {
  const h1 = document.querySelector(".title h1");

  function handleTitleClick() {
    const currentFontWeight = h1.style.bold;
    let newFontWeight;
    if (currentFontWeight === "normal") {
      newFontWeight = "bold";
    } else {
      newFontWeight = "normal";
    }
    h1.style.bold = newFontWeight;
  }
}
