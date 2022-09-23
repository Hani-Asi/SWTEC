import DocumentsPage from "./DocumentsPage.js";

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({ $target });

  documentsPage.render();
}
