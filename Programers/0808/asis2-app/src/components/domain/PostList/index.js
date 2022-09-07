import PostItem from "../PostItem";

const PostList = ({ initialPosts }) => {
  return (
    <ul>
      {initialPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
