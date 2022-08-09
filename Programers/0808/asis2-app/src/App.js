/*  요구사항
    1. Counter 컴포넌트 구현
    2. 모든 Counter 컴포넌트의 합 구하기
*/

import { useState } from 'react'
import Counter from './components/Counter'

export default function App() {
  const [totalCount, setTotalCount] = useState(0)

  return (
    <div>
      TotalCount: {totalCount}
      <Counter 
        onIncrease={(count) => {setTotalCount(totalCount + 1)}}
        onDecrease={(count) => {setTotalCount(totalCount - 1)}}
      />
      <Counter 
        onIncrease={(count) => {setTotalCount(totalCount + 1)}}
        onDecrease={(count) => {setTotalCount(totalCount - 1)}}
      />
    </div>
  )
}