export default function TodoList({ $target, initialState, onToggle, onRemove }) {
   const $todo = document.createElement('div')

   $target.appendChild($todo)

   /*
      기존 initialState는 Array(배열)방식으로 들어왔다면
      이젠 아래와 같은 방식으로 들어오게 된다.
      {
         username: 'roto',
         todos: []
      }<h1>${this.state.username}의 할일 목록</h1>
   */
   this.state = initialState

   this.setState = (nextState) => {
      this.state = nextState
      this.render()
   }

   this.render = () => {
      if (this.state.length === 0) {
         $todo.innerHTML = `Todo가 없습니다.`
         return
      }
      
      $todo.innerHTML = `
         <ul>
            ${this.state.map(({ _id, content, isCompleted }) => `
               <li data-id="${_id}" class="todo-item">
                  ${isCompleted ? `<s>${content}</s>` : content}
                  <button class="remove"> X </button>
               </li>
            `).join('')}
         </ul>
      `
   }
   $todo.addEventListener('click', (e) => {
      const $li = e.target.closest('.todo-item')

      if ($li) {
         const { id } = $li.dataset
         // 실제 이벤트를 발생시킨 지점이 어디인지 찾는 법은

         const { className } = e.target
         if (className === 'remove') {
            onRemove(id)
         } else {
            onToggle(id)
         }
      }
   })
   this.render()
}