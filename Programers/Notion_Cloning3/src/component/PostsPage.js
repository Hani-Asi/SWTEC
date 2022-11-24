import PostList from "./PostList.js";
import Editor from "./Editor.js";
import {
  fetchList,
  fetchPost,
  fetchNewPost,
  fetchDeletePost,
  fetchUpdatePost,
} from "../api/fetch.js";
import { push } from "../router/router.js";
import { getItem, setItem } from "../api/storage.js";

export default function PostPage({ $target, initialState, listRendering }) {
  const $listPage = document.createElement("div");
  const $editorPage = document.createElement("div");

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.id}`;
  let timer = null;

  $listPage.className = "container";
  $editorPage.className = "frame";

  const postList = new PostList({
    $target: $listPage,
    initialState: [],
    onCreateSubPost: async (parentId) => {
      const post = {
        title: "",
        parent: parentId,
      };
      const newPost = await fetchNewPost(post);
      push(`/documents/${newPost.id}`);
    },
    onRemove: async (id) => {
      if (confirm("Are you sure Delete?")) {
        await fetchDeletePost(id);
        push("/");
      }
    },
    onEdit: (id) => {
      push(`/documents/${id}`);
    },
  });

  const editor = new Editor({
    $target: $editorPage,
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
    const posts = await fetchList();
    postList.setState(posts);

    this.state = nextState;
    postLocalSaveKey = `temp-post-${this.state.id}`;

    const post = await fetchLocalStorage();

    editor.setState(post);

    await fetchUpdatePost(this.state);
    await listRendering();
    this.render();
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

  this.render = () => {
    $target.appendChild($listPage);
    $target.appendChild($editorPage);
  };
}
