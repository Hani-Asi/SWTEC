import axios from "axios";
import { useAsync } from "./hooks";
import { Header, Spinner } from "./components";

const App = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);
  }, []);

  return (
    <div>
      <Header>Posts</Header>
      <ul>
        {initialPosts.isLoading ? (
          <Spinner />
        ) : (
          (initialPosts.value || []).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
