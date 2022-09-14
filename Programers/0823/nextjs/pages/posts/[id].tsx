import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/about")}>Go to about</button>
      {router.query.id}
    </div>
  );
};

export default Post;
