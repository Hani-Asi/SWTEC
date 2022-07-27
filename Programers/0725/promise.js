const API_ENDPOINT = 'https/kdt.roto.codes'

const todos = promiseRequest(`${API_ENDPOINT}/todos`)
   .then(todos => {
      const completedTodo = todos.find(todo => todo.isCompleted)

      if (completedTodo) {
         return promiseRequest(`${API_ENDPOINT}/comments?todo.id=${completedTodo.id}`)
      }
   })
   .then(comments => {
      comments.forEach(comment => console.log(comment.content))
   })