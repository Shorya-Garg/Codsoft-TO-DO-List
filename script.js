const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToDOM(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    }
});

function addTaskToDOM(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
    `;

    taskList.appendChild(taskItem);

    taskItem.querySelector('.edit-task').addEventListener('click', () => editTask(taskItem));
    taskItem.querySelector('.delete-task').addEventListener('click', () => deleteTask(taskItem));
}
function editTask(taskItem) {
    const taskTextElement = taskItem.querySelector('.task-text');
    const newTaskText = prompt('Edit task:', taskTextElement.textContent);

    if (newTaskText) {
        updateTaskInLocalStorage(taskTextElement.textContent, newTaskText);
        taskTextElement.textContent = newTaskText;
    }
}
function deleteTask(taskItem) {
    const taskText = taskItem.querySelector('.task-text').textContent;
    taskItem.remove();
    removeTaskFromLocalStorage(taskText);
}
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function updateTaskInLocalStorage(oldTaskText, newTaskText) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldTaskText);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
