import { request } from "./api.js";
import DocumentList from "./DocumentList.js";

export default function DocumentsPage({ $target, onDocumentClick }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onDocumentClick,
  });

  const $newDocumentButton = document.createElement("button");
  $newDocumentButton.textContent = "페이지 추가";
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
  this.render();
}
