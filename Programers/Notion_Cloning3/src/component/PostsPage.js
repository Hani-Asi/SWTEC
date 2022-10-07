import PostList from "./PostList.js";
import { request } from "../api/api.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target,
    initialState: [],
  });

  const $newPostButton = document.createElement("button");
  $newPostButton.textContent = "페이지 추가";
  $page.appendChild($newPostButton);

  const fetchPosts = async () => {
    const posts = await request("/documents");

    postList.setState(posts);
  };

  this.render = async () => {
    await fetchPosts();
    $target.appendChild($page);
  };
}
