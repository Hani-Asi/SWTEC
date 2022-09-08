import { useRef } from "react";
import Input from "./components/input";

const App = () => {
  const inputRef = useRef();
  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
};

export default App;
