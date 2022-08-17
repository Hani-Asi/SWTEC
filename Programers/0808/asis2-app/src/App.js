/*  useMemo
    1. 함수 컴포넌트는 자신의 상태가 변경될 때 리렌더링된다.
    2. 부모 컴포넌트로 부터 받는 prop이 변경될 때 리렌더링된다.
    3. 부모 컴포넌트의 상태가 변경될 때 리렌더링된다.
*/

import { useState } from "react"
import ShowSum from "./components/ShowSum"

export default function App() {
  const [label, setLabel] = useState("Result")

  return (
    <div>
      <button onClick={() => setLabel(label + ":")}>Change Label</button>
      <ShowSum label={label} n={1000000000} />
    </div>
  )
}