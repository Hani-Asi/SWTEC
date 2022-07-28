import { request } from "./api.js"
import Header from "./Header.js"
import TodoForm from "./TodoForm.js"
import TodoList from "./TodoList.js"

export default function App ({ $target }) {
   
   this.state = {
      username: 'roto',
      todos: []
   }

   new Header({
      $target,
      initialState: this.state.username
   })

   new TodoForm({
      $target,
      onSubmit: async (content) => {
         // ▼ 여기부터 아래 표시까지 낙관적 업데이트라고 한다. API 통신이 느릴때 이 방법을 쓴다.
         // 클라이언트에서 서버에 정보 업데이트를 할 때 딜레이가 있다면 클라이언트에 표시되는 것도 똑같은 시간이 걸린다.
         // 하지만 낙관적 업데이트를 사용하면 일단 정보를 먼저 클라이언트에 표시하게 해둠과 동시에 서버에 업데이트를 한다.
         // 그리고 정보가 서버에 돌아오는 딜레이 시간 동안 어차피 클라이언트에 표시되어 있어 딜레이가 없게 느껴질 수 있다.
         // 페이스북에서 이 방법을 사용해서 유명해졌다. 
         // 페북에서 코멘트를 쓰면 바로 화면에 추가가 되지만 뒤는 보이지 않게 서버쪽에 요청하고 들어가는 상태이다.
         // 구글 설문조사도 마찬가지다.
         const todo = {
            content,
            isCompleted: false
         }
         this.setState({
            ...this.state,
            todos: [
               ...this.state.todos,
               todo
            ]
         })
         // ▲ 여기까지
         await request(`/${this.state.username}`, {
            method: 'POST',
            body: JSON.stringify(todo)
         })
         await fetchTodo()
      }
   })
   
   this.setState = nextState => {
      this.state = nextState

      todoList.setState(this.state.todos)
   }

   const todoList = new TodoList({
      $target,
      initialState: this.state.todos,
      onToggle: (id) => {
         alert(`${id} 토글`)
      },
      onRemove: (id) => {
         alert(`${id} 삭제`)
      }
   })

   const fetchTodo = async () => {
      const { username } = this.state

      if (username) {
         const todos = await request(`/${username}?delay=5000`)
         this.setState({
            ...this.state,
            todos 
         })
      }
   }
   fetchTodo()
}