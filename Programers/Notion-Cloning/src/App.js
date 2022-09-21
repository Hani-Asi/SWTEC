import DocumentSideMenu from "./DocumentSideMenu.js";

export default function App({ $target }) {
  const documentsMenu = new DocumentSideMenu({ $target });

  documentsMenu.render();
}
