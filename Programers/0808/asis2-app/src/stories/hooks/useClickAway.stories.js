import styled from "@emotion/styled";
import { useState } from "react";
import useClickAway from "../../hooks/useClickAway";

export default {
  title: "Hook/useClickAway",
};

const Popover = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: #eee;
`;

export const Default = () => {
  const [show, setShow] = useState(false);
  const ref = useClickAway((e) => {
    if (e.target.tagName !== "BUTTON") {
      setShow(false);
    }
  });

  return (
    <div>
      <button onClick={() => setShow(true)}>누르면 상자가 보여짐</button>
      <Popover ref={ref} style={{ display: show ? "block" : "none" }}>
        버튼과 상자 외의 곳을 클릭하면 다시 버튼만 있는 상태로 돌아감
      </Popover>
    </div>
  );
};
