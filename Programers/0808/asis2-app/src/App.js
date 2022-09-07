import axios from "axios";
import { useAsync } from "./hooks";
import { Header, Spinner } from "./components";
import PostList from "./components/domain/PostList";

const App = () => {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);
  }, []);

  return (
    <div>
      <Header>Posts</Header>
      {initialPosts.isLoading ? (
        <Spinner />
      ) : (
        <PostList initialPosts={initialPosts.value || []} />
      )}
    </div>
  );
};

export default App;
