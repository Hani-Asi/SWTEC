import { request } from "./api.js";
import DocumentList from "./DocumentList.js";

export default function DocumentSideMenu({ $target }) {
  const $menu = document.createElement("div");

  const documentList = new DocumentList({
    $target,
    initialState: [],
  });

  const $newDocumentButton = document.createElement("button");
  $newDocumentButton.textContent = "Root Document";
  $menu.appendChild($newDocumentButton);

  const fetchDocuments = async () => {
    const documents = await request("/documents");

    documentList.setState(documents);
  };

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($menu);
  };
}
