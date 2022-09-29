import DocumentsPage from "./DocumentsPage.js";
import DocumentEditPage from "./DocumentEditPage.js";

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({
    $target,
    onDocumentClick: (id) => {
      history.pushState(null, null, `/documents/${id}`);
      this.route();
    },
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      document: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      documentsPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId });
    }
  };

  this.route();
}
