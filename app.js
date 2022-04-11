const container = document.querySelector('.container')
const taskInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const todoLeft = document.querySelector('.todo-left')


let tasks = []
container.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('js-todo-add-btn')) {
        evt.preventDefault()
        if (taskInput.value === "") {
            alert('input value is empty')
        } else {
            let newTask = {
                text: taskInput.value,
                checked: false,
            }
            if (localStorage.getItem('tasks') === null) {
                //console.log('storage is null')
                tasks.push(newTask)
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'))
                tasks.push(newTask)
            }
            localStorage.setItem('tasks', JSON.stringify(tasks))
            addTodo(newTask, tasks.length - 1)
            taskInput.value = ""
            todoLeft.innerHTML = `${countTasksLeft(tasks)}`

        }
    }
    if (evt.target.classList.contains('todo-checkbox')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        if (evt.target.checked === false) {
            tasks[evt.target.parentElement.id].checked = false
        } else {
            tasks[evt.target.parentElement.id].checked = true
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
        todoLeft.innerHTML = `${countTasksLeft(tasks)}`
    }
    if (evt.target.classList.contains('js-todo-del-btn')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        let id = evt.target.parentElement.id
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        evt.target.parentElement.remove()
        todoLeft.innerHTML = `${countTasksLeft(tasks)}`
    }
    if (evt.target.classList.contains('js-todo-filters-all')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {

            addTodo(el, i)
        })
    }
    if (evt.target.classList.contains('js-todo-filters-active')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == false) {
                addTodo(el, i)
            }
        })
    }
    if (evt.target.classList.contains('js-todo-filters-completed')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == true) {
                addTodo(el, i)
            }
        })
    }
    if (evt.target.classList.contains('js-todo-clear-completed')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks = tasks.filter(el => el.checked == false)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        if (tasks.length != 0) {
            tasks.forEach((el, i) => {
                addTodo(el, i)
            })
        }
    }
})

window.addEventListener('load', () => {
    if (localStorage.getItem('tasks') != null) {
        tasks = JSON.parse(localStorage.getItem('tasks'))

        tasks.forEach((el, i) => {
            addTodo(el, i)
        });
        todoLeft.innerHTML = `${countTasksLeft(tasks)}`
    }
})

function addTodo(value, id) {
    let checked = ""
    if (value.checked == true) {
        checked = "checked"
    }
    todoList.innerHTML += `
          <li class="list-group-item mb-3 d-flex align-items-center" id ='${id}' >
        <input class="todo-checkbox form-check-input me-1" type="checkbox" name="todo-check-${id}" ${checked} value="" aria-label="...">
        <label for='todo-check-${id}'>${value.text}</label>
       <button type="button" class="js-todo-del-btn ms-auto btn  btn-outline-danger">
       <i class="fa fa-trash "></i></button>
     </li>
    `
}

function countTasksLeft(arr) {
    let counter = 0
    arr.forEach(el => {
        if (el.checked == false) { counter++ }
    })
    return counter
}
