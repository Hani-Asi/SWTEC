import { push } from "../router/router.js";
import { fetchNewPost } from "../api/fetch.js";

export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");

  $postList.className = "sidebar-container";

  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul class="sidebar-selectable">
          ${this.state
            .map(
              (post) =>
                `
                  <li
                    class="sidebar-document"
                    style="li::marker {
                      list-style-type: "▶";
                    }"
                    data-id="${post.id}"
                  >
                    ${post.title}
                  </li>
                `
            )
            .join("")}
      </ul>
      <button class="newDocument-Button">+ 새 페이지</button>
    `;
  };

  this.render();

  $postList.addEventListener("click", async (e) => {
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;
      push(`/documents/${id}`);
    }

    if (e.target.className === "newDocument-Button") {
      const post = {
        title: "",
        content: "",
        parent: null,
      };
      const newPost = await fetchNewPost(post);
      push(`/documents/${newPost.id}`);
    }
  });
}
