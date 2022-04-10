const container = document.querySelector('.container')
const taskInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const todoLeft = document.querySelector('.todo-left')


let tasks = []
container.addEventListener('click', (evt) => {
    if (evt.target.id == 'todo-add-btn') {
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
    if (evt.target.classList[0] == 'todo-checkbox') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        if (evt.target.checked === false) {
            tasks[evt.target.parentElement.id].checked = false
        } else {
            tasks[evt.target.parentElement.id].checked = true
        }
        localStorage.setItem('tasks', JSON.stringify(tasks))
        todoLeft.innerHTML = `${countTasksLeft(tasks)}`
    }
    if (evt.target.classList[0] == 'todo-del-btn') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        let id = evt.target.parentElement.id
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        evt.target.parentElement.remove()
        todoLeft.innerHTML = `${countTasksLeft(tasks)}`
    }
    if (evt.target.id == 'todo-filters-all') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {

            addTodo(el, i)
        })
    }
    if (evt.target.id == 'todo-filters-active') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == false) {
                addTodo(el, i)
            }
        })
    }
    if (evt.target.id == 'todo-filters-completed') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == true) {
                addTodo(el, i)
            }
        })
    }
    if (evt.target.id == "todo-clear-completed") {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks = tasks.filter(el => el.checked == false)
        console.log(tasks)
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
          <li class="list-group-item mb-3 d-flex align-items-center" id ='${id}'>
        <input class="todo-checkbox form-check-input me-1" type="checkbox" name="todo-check-${id}" ${checked} value="" aria-label="...">
        <label for='todo-check-${id}'>${value.text}</label>
       <button type="button" class="todo-del-btn ms-auto btn  btn-outline-danger"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
       width="16" height="16"
       viewBox="0 0 128 128"
       style=" fill:#000000;"><path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z"></path></svg>
   </button>
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
