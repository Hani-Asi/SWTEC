/*  분기와 반복
    1. 컴포넌트는 JSX를 반환하는 "함수"이다.
    2. 함수 내에서 JSX를 처리하는 과정에서 분기와 반복을 사용할 수 있다.
    3. JSX 내에서 if와 for와 같은 반복문 사용이 어렵기 때문에 편의를 위해서
       표현식인 삼항연산자와 map, filter 등을 사용한다.
*/

import { useState } from 'react'
import Board from './components/Board'

export default function App() {
  const [visible, setVisible] = useState(false)

  const articles =[
    {
      id: 1,
      title: 'hello there',
      author: 'ㅁㄴ'
    },
    {
      id: 2,
      title: 'hi',
      author: 'ㅇㄹ'
    },
  ]

  return <div>
    {/*
    <button onClick={() => setVisible(!visible)}>Toggle</button>
    {visible && (
      <h1>논리곱 연산자를 통해 쉽게 JSX 렌더링 여부를 결정할 수 있다.</h1>
    )}*/}

    {/*
    <button onClick={() => setVisible(!visible)}>Toggle</button>
    {visible ? (
      <h1>삼항 연산자를 통해 쉽게 JSX 렌더링 여부를 결정할 수 있다.</h1>
    ) : null}*/}

    <button onClick={() => setVisible(!visible)}>Toggle</button>
    {visible && (
      <h1>삼항 연산자를 통해 쉽게 JSX 렌더링 여부를 결정할 수 있다.</h1>
    )}
    {visible ? (
      <Board articles={articles}/>
    ) : (
      <p>게시판을 보려면 Toggle 버튼을 클릭</p>
    )}
  </div>
}