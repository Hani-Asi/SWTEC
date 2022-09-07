import { Header, Text } from "../..";

const PostItem = ({ post }) => {
  return (
    <li>
      <Header strong level={3}>
        {post.title}
      </Header>
      <Text>{post.body}</Text>
    </li>
  );
};

export default PostItem;
