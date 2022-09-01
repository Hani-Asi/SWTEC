import useTimeoutFn from "../../hooks/useTimeoutFn";

export default {
  title: "Hook/useTimeoutFn",
};

export const Default = () => {
  const [run, clear] = useTimeoutFn(() => {
    alert("실행");
  }, 3000);

  return (
    <>
      <div>useTimeoutFn Test</div>
      <button onClick={run}>3 Seccond late</button>
      <button onClick={clear}>stop</button>
    </>
  );
};
