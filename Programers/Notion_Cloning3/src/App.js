import PostsPage from "./component/PostsPage.js";
import PostEditPage from "./component/PostEditPage.js";
import { initRouter } from "./router/router.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({
    $target,
  });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    $target.innerHTML = "";
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
