import useForm from "../../hooks/useForm";

export default {
  title: "Hook/useForm",
};

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

export const Default = () => {
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) errors.email = "The Email field is required";
      if (!password) errors.password = "The Password field is required";
      if (!/^.+@.+\..+$/.test(email))
        errors.email = "The Email format is different.";
      return errors;
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Hello there</h1>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email}
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};
