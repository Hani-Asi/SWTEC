export default function Editor(
  { $target, initialState = { title: "", content: "" } },
  onEditing
) {
  const $editor = document.createElement("div");

  let isinitialize = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
        <input 
          type="text" 
          name="title" 
          style="width: 800px; height: 100px; font-size: 50px; border: none;" 
          value="${this.state.title} " 
        />
        <textarea 
          name="content" 
          style="width: 800px; height: 1000px;"
        >${this.state.content} </textarea>
      `;
      isinitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;

    const name = target.getAttribute("name");

    if (this.state[name]) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
    }

    console.log(nextState);
    this.setState(nextState);
    onEditing(this.state);
  });
}
