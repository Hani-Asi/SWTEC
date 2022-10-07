import PostsPage from "./components/DocumentsPage.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });

  postsPage.render();
}
