import useAsyncFn from "../../hooks/useAsyncFn";

export default {
  title: "Hook/useAsyncFn",
};

const asyncReturnValue = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
};

export const Success = () => {
  const [state, callback] = useAsyncFn(async () => {
    return await asyncReturnValue();
  }, []);

  return (
    <div>
      <div>useAsyncFn Test</div>
      <div>{JSON.stringify(state)}</div>
      <button onClick={callback} disabled={state.isLoading}>
        비동기 호출
      </button>
    </div>
  );
};
