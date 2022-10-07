import { request } from "../api/api.js";
import Editor from "./Editor.js";
import LinkButton from "./LinkButton.js";
import { getItem, setItem, removeItem } from "../api/storage.js";

const $page = document.createElement("div");

export default function DocumentEditPage({ $target, initialState }) {
  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const document = getItem(documentLocalSaveKey, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: document,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        const newDoc = this.state.documentId === "new";
        if (newDoc) {
          const createDocument = await request("/documents", {
            method: "POST",
            body: JSON.stringify(document),
          });
          history.replaceState(null, null, `/documents/${createDocument.id}`);
          removeItem(documentLocalSaveKey);

          this.setState({
            documentId: createDocument.id,
          });
        } else {
          await request(`/documents/${document.id}`, {
            method: "PUT",
            body: JSON.stringify(document),
          });
          removeItem(documentLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${nextState.documentId}`;
      this.state = nextState;

      if (this.state.documentId === "new") {
        const document = getItem(documentLocalSaveKey, {
          title: "",
          content: "",
        });
        this.render();
        editor.setState(document);
      } else {
        await fetchDcoument();
      }

      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(
      this.state.document || {
        title: "",
        content: "",
      }
    );
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchDcoument = async () => {
    const { documentId } = this.state;

    if (documentId !== "new") {
      const document = await request(`/documents/${documentId}`);

      const tempDocument = getItem(documentLocalSaveKey, {
        title: "",
        content: "",
      });

      if (
        tempDocument.tempSaveDate &&
        tempDocument.tempSaveDate > document.updated_at
      ) {
        if (confirm("Unsaved data exists")) {
          this.setState({
            ...this.state,
            document: tempDocument,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        document,
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: "목록으로 이동",
      link: "/",
    },
  });
}
