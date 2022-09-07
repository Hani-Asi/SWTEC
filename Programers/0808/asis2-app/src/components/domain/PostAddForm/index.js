import { useForm } from "../../../hooks";
import { Spinner } from "../..";
import { usePostContext } from "../../../contexts/PostProvider";

const PostAddForm = () => {
  const { onAddPost } = usePostContext();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      userId: 1,
      title: "",
      body: "",
    },
    onSubmit: async (values) => {
      await onAddPost(values);
    },
    validate: ({ title, body }) => {
      const errors = {};
      if (!title) errors.title = " Please enter a title";
      if (!body) errors.body = " Please enter your detail";
      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type="text" name="body" onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <Spinner /> : <button type="submit">Add</button>}
    </form>
  );
};

export default PostAddForm;
