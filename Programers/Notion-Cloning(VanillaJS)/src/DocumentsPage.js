import { request } from "./api.js";
import DocumentList from "./DocumentList.js";

export default function DocumentsPage({ $target }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
  });

  const $newDocumentButton = document.createElement("button");
  $newDocumentButton.textContent = "New Document";
  $page.appendChild($newDocumentButton);

  const fetchDocuments = async () => {
    const documents = await request("/documents");

    documentList.setState(documents);
  };

  this.setState = async () => {
    const documents = await request(`/documents`);
    documentList.setState(documents);
    this.render();
  };

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($page);
  };
}
