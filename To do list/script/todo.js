let addMessage = document.querySelector('.message')
let addButton = document.querySelector('.add')
let todo = document.querySelector('.todo')

let todoList = []

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'))
    dispalyMessage()
}

addButton.addEventListener('click', function() {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    }

    todoList.push(newTodo)
    dispalyMessage()
    localStorage.setItem('todo', JSON.stringify(todoList))
})

function dispalyMessage() {
    let dispalyMessage = ''
    if (todoList.length === 0) todo.innerHTML = ''
    todoList.forEach(function(item, index) {
        dispalyMessage += `
        <li>
            <input type="checkbox" id="item_${index}" ${item.checked ? 'checked' : ''}>
            <label for="item_${index}" class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `
        todo.innerHTML = dispalyMessage
    })
}

todo.addEventListener('change', function(event) {
    // let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML
    let idInput = event.target.getAttribute('id')
    let forLabel = todo.querySelector('[for=' + idInput + ']')
    let valueLabel = forLabel.innerHTML

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))

        }
    })
})

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault()
    todoList.forEach(function(item, index) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.deleteKey) {
                todoList.splice(index, 1)
            } else {
                item.important = !item.important
            }
            dispalyMessage()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})