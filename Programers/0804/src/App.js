import TodoList from "./TodoList.js";


export default function App({ $target }) {
   const incompletedTodoList = new TodoList({
      $target,
      initialState: {
         title: '완료되지 않을 일',
         todos: []
      }
   })
   const completedTodoList = new TodoList({
      $target,
      initialState: {
         title: '완료된 일',
         todos: []
      }
   })
}