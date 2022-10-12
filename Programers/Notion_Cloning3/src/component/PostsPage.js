import PostList from "./PostList.js";
import { request } from "../api/api.js";
import LinkButton from "./LinkButton.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "페이지 추가",
      link: "/documents/new",
    },
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
