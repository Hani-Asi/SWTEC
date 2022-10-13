import Editor from "./Editor.js";
import { fetchPost, fetchUpdatePost } from "../api/fetch.js";
import { getItem, setItem } from "../api/storage.js";

export default function PostEditPage({ $target, initialState, listRendering }) {
  const $page = document.createElement("div");

  $page.className = "postEditPage";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.id}`;
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
    },
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await fetchUpdatePost(post);
        await listRendering();
      }, 1000);

      setItem(postLocalSaveKey, {
        ...post,
        tempSaveData: new Date(),
      });
    },
    subPostRender: (id) => {
      this.setState({ id });
      history.replaceState(null, null, `/documents/${id}`);
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    postLocalSaveKey = `temp-post-${this.state.id}`;

    const post = await fetchLocalStorage();

    editor.setState(post);

    await fetchUpdatePost(this.state);
    await listRendering();
    await this.render();
  };

  const fetchLocalStorage = async () => {
    const post = fetchPost(this.state.id);
    const tempPost = getItem(postLocalSaveKey, {
      title: "",
      content: "",
      parent: null,
    });

    if (tempPost.tempSaveData && tempPost.tempSaveData > post.updatedAt) {
      if (confirm("There is unsaved data. Are you sure you want to edit?")) {
        const updatedPost = {
          ...post,
          title: tempPost.title,
          content: tempPost.content,
        };

        return updatedPost;
      }
    }

    return post;
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
