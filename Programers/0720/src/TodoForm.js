export default function TodoForm({ $target, onSubmit }) {
    const $form = document.createElement('form')

    $target.appendChild($form)

    let isInit = false

    this.render = () => {
        $form.innerHTML = `
            <input type="text" name="todo">
            <button>Add</button>
        `

        if (!isInit) {
            $form.addEventListener('submit', e => {
                e.preventDefault()

                const $todo = $form.querySelector('input[name=todo]')
                const text = $todo.value

                if (text.length > 1) {
                    $todo.value = ''
                    onSubmit(text)
                } else {
                    alert('2글자이사 입력해주세요.')
                }
            })
            isInit = true
        }
    }
    this.render()
}
