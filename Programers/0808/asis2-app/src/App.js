/*  useRef는
    1. DOM에 직접 접근할 때 사용합니다
    2. 지역 변수로 사용할 때 사용합니다
    useState는 값이 변경될 때 다시 렌더링을 한다
    useRef는 값이 변경되더라도 다시 렌더링을 하지 않습니다
*/

import { useRef } from 'react'
import AutoCounter from './components/AutoCounter.js'
import Input from "./components/Input.js"

export default function App() {
  const inputRef = useRef()

  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>

      <AutoCounter />
    </div>
  )
}