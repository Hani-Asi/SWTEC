import PostsPage from "./component/PostsPage.js";
import PostEditPage from "./component/PostEditPage.js";

export default function App({ $target }) {
  const postsPage = new PostsPage({ $target });
  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: "new",
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      postsPages.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      postEditPage.documents.setState({ postId });
    }
  };
  this.route();
}
