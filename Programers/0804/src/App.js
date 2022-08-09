import { request } from "./api.js";
import TodoList from "./TodoList.js";
import TaskManager from "./TaskManager.js";

export default function App({ $target }) {
   const tasks = new TaskManager()

   this.state = {
      todos: []
   }

   const incompletedTodoList = new TodoList({
      $target,
      initialState: {
         title: '완료되지 않을 일',
         todos: []
      },
      onDrop: async (todoId) => {
         console.log(`완료처리 된 Todo에서 ${todoId}가 넘어옴`)

         const nextState = [...this.state.todos]
         const todoIndex = nextState.findIndex(todo => todo._id === todoId)

         nextTodos[todoIndex].isCompleted = false

         this.setState({
            ...this.state,
            todos: nextTodos
         })

         tasks.addTasks(async() => {
            await request(`/${todoId}/toggle`, {
               method: 'PUT'
            })
         })
      }
   })
   
   const completedTodoList = new TodoList({
      $target,
      initialState: {
         title: '완료된 일',
         todos: []
      },
      onDrop: async (todoId) => {
         console.log(`미완료처리 된 Todo에서 ${todoId}가 넘어옴`)

         const nextState = [...this.state.todos]
         const todoIndex = nextState.findIndex(todo => todo._id === todoId)
         
         nextTodos[todoIndex].isCompleted = true

         this.setState({
            ...this.state,
            todos: nextTodos
         })

         tasks.addTasks(async() => {
            await request(`/${todoId}/toggle`, {
               method: 'PUT'
            })
         })
      }
   })

   this.setState = nextState => {
      this.state = nextState

      const { todos } = this.state

      incompletedTodoList.setState({
         ...incompletedTodoList.state,
         todos: todos.filter(todo => !todo.isCompleted)
      })

      completedTodoList.setState({
         ...completedTodoList.state,
         todos: todos.filter(todo => todo.isCompleted)
      })
   }

   const fetchTodos = async () => {
      const todos = await request('')

      this.setState({
         ...this.state,
         todos
      })
   }

   fetchTodos()

   const $button = document.createElement('button')
   $button.textContent = '동기화'

   $target.appendChild($button)

   $button.addEventListener('click', () => tasks.run())
}