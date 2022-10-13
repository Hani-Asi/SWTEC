import PostsPage from "./component/PostsPage.js";
import PostEditPage from "./component/PostEditPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({
    $target,
    initialState: [],
  });

  const postEditPage = new PostEditPage({
    $target,
    initialState: {},
    listRendering: () => postsPage.setState(),
  });

  this.route = async () => {
    $target.innerHTML = "";

    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");

      await postsPage.setState();
      await postEditPage.setState({ id });
    } else {
      $target.innerHTML = "<h1>404 Not Found</h1>";
    }
  };

  this.route();
  initRouter(() => this.route());
}
