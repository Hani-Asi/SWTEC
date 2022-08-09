import "./App.css"
import Logo from "./components/Logo"
import Paragraph from "./components/Paragraph"

export default function App() {
  return (
    // 아래와 같이 js파일인데 html처럼 사용하는 것을 JSX라고 부른다.
    <div className="App">
      <header className="App-header">

        <Logo size={100}/> {/* Logo는 컴포넌트화 */}
        <Logo />

        <Paragraph> {/* P태그도 컴포넌트화 */}
          Edit <code>src/App.js</code> and save to reload.
        </Paragraph>

        <Paragraph size={14} color="white">
          im want white
        </Paragraph>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}