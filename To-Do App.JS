document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const tasks = getTasks();
        tasks.push({ text: taskText, completed: false, date: new Date() });
        saveTasks(tasks);
        taskInput.value = '';
        renderTasks();
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = getTasks();
    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.text} <span>${new Date(task.date).toLocaleString()}</span>
            <div class="task-buttons">
                <button class="complete" onclick="completeTask(${index})">Complete</button>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(taskItem);
    });

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.text} <span>${new Date(task.date).toLocaleString()}</span>
            <div class="task-buttons">
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(taskItem);
    });
}

function completeTask(index) {
    const tasks = getTasks();
    tasks[index].completed = true;
    tasks[index].date = new Date();
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const newTaskText = prompt('Edit the task:', tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        saveTasks(tasks);
        renderTasks();
    }
}
