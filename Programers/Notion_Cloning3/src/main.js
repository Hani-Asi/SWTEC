import App from "./App.js";
import Editor from "./component/Editor.js";
import { setItem, getItem } from "./api/storage.js";

const $target = document.querySelector("#app");

// new App({ $target });

const TEMP_POST_SAVE_KEY = "temp-post";

const posts = getItem(TEMP_POST_SAVE_KEY, {
  title: "",
  content: "",
});

new Editor({
  $target,
  initialState: {
    title: "hello",
    content: "hello",
  },
  onEditing: (post) => {
    setItem("temp-post", {
      ...post,
      tempSaveDate: new Date(),
    });
  },
});
