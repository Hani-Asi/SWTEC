import { request } from "./api.js"
import UserList from "./UserList.js"
import Header from "./Header.js"
import TodoForm from "./TodoForm.js"
import TodoList from "./TodoList.js"
import { parse } from "./querystring.js"

export default function App ({ $target }) {

   const $userListContainer = document.createElement('div')
   const $todoListContainer = document.createElement('div')

   $target.appendChild($userListContainer)
   $target.appendChild($todoListContainer)

   this.state = {
      userList: [],
      selectedUsername: null,
      todos: [],
      isTodoLoading: false
   }

   const userList = new UserList({
      $target: $userListContainer,
      initialState: this.state.userList,
      onSelect: async (username) => {
         history.pushState(null, null, `/?selectedUsername=${username}`)
         this.setState({
            ...this.state,
            selectedUsername: username
         })
         await await fetchTodos()
      }
   })

   const header = new Header({
      $target: $todoListContainer,
      initialState: {
         isLoading: this.state.isTodoLoading,
         selectedUsername: this.state.selectedUsername
      }
   })

   new TodoForm({
      $target: $todoListContainer,
      onSubmit: async (content) => {
         const isFirstTodoAdd = this.state.todos.length === 0

         const todo = {
            content,
            isCompleted: false
         }
         /* ▼ 여기부터 아래 표시까지 낙관적 업데이트라고 한다. API 통신이 느릴때 이 방법을 쓴다.
         클라이언트에서 서버에 정보 업데이트를 할 때 딜레이가 있다면 클라이언트에 표시되는 것도 똑같은 시간이 걸린다.
         하지만 낙관적 업데이트를 사용하면 일단 정보를 먼저 클라이언트에 표시하게 해둠과 동시에 서버에 업데이트를 한다.
         그리고 정보가 서버에 돌아오는 딜레이 시간 동안 어차피 클라이언트에 표시되어 있어 딜레이가 없게 느껴질 수 있다.
         페이스북에서 이 방법을 사용해서 유명해졌다. 페북에서 코멘트를 쓰면 바로 화면에 추가가 되지만 뒤는 보이지 않게 서버쪽에 요청하고 들어가는 상태이다. */
         this.setState({
            ...this.state,
            todos: [
               ...this.state.todos,
               todo
            ]
         })
         //▲ 여기까지
         
         await request(`/${this.state.selectedUsername}`, {
            method: 'POST',
            body: JSON.stringify(todo)
         })
         await fetchTodos()

         if (isFirstTodoAdd) {
            await fetchUserList()
         }
      }
   })
   
   this.setState = nextState => {
      this.state = nextState

      header.setState({
         isLoading: this.state.isTodoLoading,
         selectedUsername: this.state.selectedUsername
      })

      todoList.setState({
         isLoading: this.state.isTodoLoading,
         todos: this.state.todos,
         selectedUsername: this.state.selectedUsername
      })

      userList.setState(this.state.userList)

      this.render()
   }

   this.render = () => {
      const { selectedUsername } = this.state
      $todoListContainer.style.display = selectedUsername ? 'block' : 'none'
   }

   const todoList = new TodoList({
      $target: $todoListContainer,
      initialState: {
         isTodoLoading: this.state.isTodoLoading,
         todos: this.state.todos,
         selectedUsername: this.state.selectedUsername
      },
      onToggle: async (id) => {
         const todoIndex = this.state.todos.findIndex(todo => todo._id === id)

         const nextTodos = [...this.state.todos]
         nextTodos[todoIndex].isCompleted = !nextTodos[todoIndex].isCompleted

         this.setState({
            ...this.state,
            todos: nextTodos
         })
         await request(`/${this.state.selectedUsername}/${id}/toggle`, {
            method: 'PUT'
         })
         await fetchTodos()
      },
      onRemove: async (id) => {
         const todoIndex = this.state.todos.findIndex(todo => todo._id === id)

         const nextTodos = [...this.state.todos]
         nextTodos.splice(todoIndex, 1)

         this.setState({
            ...this.state,
            todos: nextTodos
         })
         await request(`/${this.state.selectedUsername}/${id}`, {
            method: 'DELETE'
         })
         await fetchTodos()
      }
      // Uncaught SyntaxError: Unexpected reserved word 오류는
      // await를 쓸 때 나는 오류인데(예약어 오류) async를 안 붙여서 나는 오류
   })

   const fetchUserList = async () => {
      const userList = await request('/users')
      this.setState({
         ...this.state,
         userList
      })
   }

   const fetchTodos = async () => {
      const { selectedUsername } = this.state

      if (selectedUsername) {
         this.setState({
            ...this.state,
            isTodoLoading: true
         })
         const todos = await request(`/${selectedUsername}`)
         this.setState({
            ...this.state,
            todos,
            isTodoLoading: false
         })
      }
   }
   
   const init = async () => {
      await fetchUserList()

      // url에 특정 사용자를 나타내는 값이 있는 경우
      const { search } = location

      if (search.length > 0) {
         // location.search로 불러오면 맨 앞에 '?'물음표 잘라서 가져오고 querystring은 '&'엔퍼센트로 연결되어 있기 때문에 '&'로 자르고 
         // selectedUsernameQuerystring에 나머지들이 들어오게 된다.
         // selectedUsernameQuerystring에서 '='이퀄로 자르고 그 오른쪽에 있는 걸 가져온다.
         // 그 가져온 값이 유저네임
         const { selectedUsername } = parse(search.substring(1))

         if (selectedUsername) {
            this.setState({
               ...this.state,
               selectedUsername
            })
            await fetchTodos()
         }
      }
   }
   
   this.render()
   init()

   // 뒤로가기 처리 'popstate'
   window.addEventListener('popstate', () => {
      init()
   })
}