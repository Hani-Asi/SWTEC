import { useState } from "react";
import useIntervalFn from "../../hooks/useIntervalFn";

export default {
  title: "Hook/useIntervalFn",
};

export const Default = () => {
  const [array, setArray] = useState([]);
  const [run, clear] = useIntervalFn(() => {
    setArray([...array, "Add "]);
  }, 1000);

  return (
    <>
      <div>useIntervalFn Test</div>
      <div>{array}</div>
      <button onClick={run}>1 Seccond Add</button>
      <button onClick={clear}>stop</button>
    </>
  );
};
