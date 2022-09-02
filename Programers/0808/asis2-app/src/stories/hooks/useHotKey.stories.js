import useHotKey from "../../hooks/useHotKey";
import { useState } from "react";

export default {
  title: "Hook/useHotKey",
};

export const Default = () => {
  const [value, setValue] = useState("");

  const hotkeys = [
    {
      global: true,
      combo: "meta+k",
      onKeyDown: (e) => {
        alert("meta + k");
      },
    },
    {
      combo: "esc",
      onKeyDown: (e) => {
        setValue("");
      },
    },
  ];

  const { handleKeyDown } = useHotKey(hotkeys);

  return (
    <div>
      <div>useHotKey Test</div>
      <input
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
