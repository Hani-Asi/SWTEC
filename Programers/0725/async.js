const API_ENDPOINT = 'https://kdt.roto.codes'

requestAnimationFrame(`${API_ENDPOINT}/todos`, (todos) => {
   const completedTodo = todos.find(todo => todo.isCompleted)

   if (completedTodo) {
      requestAnimationFrame(`${API_ENDPOINT}/comments?todo.id=${completedTodo.id}`, (comments) => {
         comments.forEach(comment => console.log(comment.content))
      })
   }
})