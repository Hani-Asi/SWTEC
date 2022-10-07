export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");

  let isInitialize = false;
  this.state = initialState;

  $editor.style.width = "400px";
  $editor.style.height = "400px";
  $editor.style.borderRadius = "8px";
  $editor.style.fontSize = "18px";

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    const { title, content } = this.state;
    if (!isInitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" style="width: 400px; border-radius: 8px; font-size:25px" value="${title}" />
        <textarea name="content" style="width: 400px; height: 400px; border-radius: 8px; font-size: 15px">${content}</textarea>
      `;
      isInitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    if (this.state[name]) {
      // 아래의 [name]을 통해 input과 textarea의 target.value를 구별하여 nextState를 부르기 가능
      const nextState = { ...this.state, [name]: target.value };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
