const container = document.querySelector('.container')
const taskInput = document.querySelector('#todo-input')
const todoList = document.querySelector('#todo-list')
const todoLeft = document.querySelector('.todo-left')


container.addEventListener('click', (evt) => {
    if (evt.target.id == 'todo-add-btn') {
        evt.preventDefault()
        if (taskInput.value === "") {
            alert('input value is empty')
        } else {

            let tasks = []
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
    if (evt.target.classList[0] == 'todo-filters-all') {

        tasks = JSON.parse(localStorage.getItem('tasks'))

        todoList.innerHTML = ""
        tasks.forEach((el, i) => {

            addTodo(el, i)
        })
    }
    if (evt.target.classList[0] == 'todo-filters-active') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == false) {
                addTodo(el, i)
            }
        })
    }
    if (evt.target.classList[0] == 'todo-filters-completed') {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        todoList.innerHTML = ""
        tasks.forEach((el, i) => {
            if (el.checked == true) {
                addTodo(el, i)
            }
        })
    }

})

window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('tasks'))

    tasks.forEach((el, i) => {
        addTodo(el, i)
    });
    todoLeft.innerHTML = `${countTasksLeft(tasks)}`
})


function addTodo(value, id) {
    let checked = ""
    if (value.checked == true) {
        checked = "checked"
    }
    /* <li class="todo-item" id="${id}">
            <input type="checkbox" class="todo-checkbox" name="todo-check-${id}" ${checked}>
            <label for="todo-check-${id}">${value.text}</label>
            <button class="todo-del-btn">delete</button>
          </li> */
    todoList.innerHTML += `
          <li class="list-group-item mb-3 d-flex align-items-center" id ='${id}'>
        <input class="todo-checkbox form-check-input me-1" type="checkbox" name="todo-check-${id}" ${checked} value="" aria-label="...">
        <label for='todo-check-${id}'>${value.text}</label>
       <button type="button" class="todo-del-btn ms-auto btn  btn-outline-danger">Delete</button>
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


/* const addTask = document.querySelector('#task-add-btn')
const todo = document.querySelector('#todo-group')


let tasks = []
addTask.addEventListener('click', (event) => {
    event.preventDefault()
    const taskText = document.querySelector('#task-input')
    let newTask = {
        text: taskText.value,
        checked: false,
        important: false
    }
    if (taskText.value.length == 0) {
        alert('empty imput!')
    } else {
        tasks.push(newTask)
        displayTasks()
    }
})

function displayTasks(){
    let data = ''
    tasks.forEach(function(item,i){
       data += `<li class="list-group-item mb-3 d-flex align-items-center" id ='item-${i}'>
       <input class=" form-check-input me-1" type="checkbox" value="" aria-label="...">
        <label for='item-${i}'>${item.text}</label>
       <button type="button" class="ms-auto btn  btn-outline-danger">Delete</button>
     </li>`
    todo.innerHTML =data
    });
} */