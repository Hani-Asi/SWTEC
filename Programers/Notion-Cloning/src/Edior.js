export default function Editor({ $target }) {
  const $editor = document.createElement("textarea");

  $target.appendChild($editor);

  this.render = () => {};
  this.render();
}
