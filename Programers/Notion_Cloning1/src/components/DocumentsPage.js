import { request } from "../api/api.js";
import DocumentList from "./DocumentList.js";
import LinkButton from "./LinkButton.js";

export default function DocumentsPage({ $target }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
  });

  new LinkButton({
    $target: $page,
    initialState: {
      text: "페이지 추가",
      link: "/documents/new",
    },
  });

  this.setState = async () => {
    const documents = await request("/documents");
    documentList.setState(documents);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
