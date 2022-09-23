import App from "./App.js";
import Editor from "./Editor.js";

const $target = document.querySelector("#app");

//new App({ $target });

new Editor({
  $target,
  initialState: {
    title: "제목 없음",
    content: "입력하세요",
  },
  onEditing: (document) => {
    console.log(document);
  },
});
