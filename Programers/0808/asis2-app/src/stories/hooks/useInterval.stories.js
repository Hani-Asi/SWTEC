import { useState } from "react";
import useInterval from "../../hooks/useInterval";

export default {
  title: "Hook/useInterval",
};

export const Default = () => {
  const [array, setArray] = useState([]);
  const clear = useInterval(() => {
    setArray([...array, "Add "]);
  }, 1000);

  return (
    <>
      <div>useIntervalFn Test</div>
      <div>{array}</div>
      <button onClick={clear}>stop</button>
    </>
  );
};
