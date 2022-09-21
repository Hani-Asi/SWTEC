export default function DocumentList({ $target, initialState, DocumentClick }) {
  const $documentList = document.createElement("div");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state && Array.isArray(this.state)) {
      $documentList.innerHTML = `
      <ul>
        ${this.state
          .map(
            (documents) => `
          <li data-id="${documents.id}">${documents.title}</li>
        `
          )
          .join("")}
      </ul>
    `;
    }
  };

  this.render();
}
