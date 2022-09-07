import { Route, Routes } from "react-router-dom";
import { PostsPage, PostPage, NotFoundPage } from "@pages";
import DefaultTemplate from "@components/template/DefaultTemplate";

const App = () => {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/" exact element={<h1>Home</h1>} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} /> // 제일 마지막에 있어야함
      </Routes>
    </DefaultTemplate>
  );
};

export default App;
