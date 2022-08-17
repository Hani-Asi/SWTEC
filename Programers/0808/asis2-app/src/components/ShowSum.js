import { useMemo } from "react"

function sum(n) {
   console.log('Start')
   let result = 0
   for (let i = 1; i <= n; i += 1) {
      result += i
   }
   console.log('Finished')
   return result
}

const ShowSum = ({ label, n }) => {
   // const result = sum(n)
   const result = useMemo(() => sum(n), [n]) // 연산이 오래 걸리는데 계속 리렌더링하면 더 느려진다.

   return (
      <span>
         {label}: {result}
      </span>
   )
}

export default ShowSum