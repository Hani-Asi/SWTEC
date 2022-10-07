import PostsPage from "./component/PostsPage.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });

  postsPage.render();
}
