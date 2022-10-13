import PostList from "./PostList.js";
import { fetchList, fetchNewPost, fetchDeletePost } from "../api/fetch.js";
import { push } from "../router/router.js";

export default function PostPage({ $target, initialState }) {
  const $page = document.createElement("div");
  const $button = document.createElement("button");

  this.state = initialState;

  $page.className = "postsPage";
  $button.className = "newDocument-Button";
  $button.textContent = "+ 새 페이지";

  const postList = new PostList({
    $target: $page,
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

  this.setState = async () => {
    const posts = await fetchList();
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
    $target.appendChild($button);
  };

  $button.addEventListener("click", async (e) => {
    if (e.target.className === "newDocument-Button") {
      const post = {
        title: "",
        content: "",
        parent: null,
      };
      const newPost = await fetchNewPost(post);
      push(`/documents/${newPost.id}`);
    }
  });
}
