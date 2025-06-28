const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all-btn');
const allBtn = document.getElementById('all-btn');
const pendingBtn = document.getElementById('pending-btn');
const completedBtn = document.getElementById('completed-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const quotes = [
    "Well done! One step closer to your goals! 🚀",
    "Great job! Small wins add up to big success. 🌟",
    "You did it! Keep the momentum going! 🔥",
    "Task completed! Progress is better than perfection. 💪",
    "Another one down! You're on a roll! 🎉",
    "Success is built on the completion of small steps. Keep it up! 🏆",    
    "You're unstoppable! One task at a time. ✨",
    "Every task done is a step toward a brighter future. 🌈",
    "You're proving to yourself that you can do it. Keep going! 💯",
    "Checked off another task? That's how champions are made! 🏅"
];

function displayMotivationalQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    alert(quotes[randomIndex]);
}

// Function to format the date as dd/mm/yyyy
function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Function to render tasks based on a filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
    }).forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) taskItem.classList.add('completed');
        taskItem.innerHTML = `
            <span>${task.text} <span class="task-date"> Due: ${formatDate(task.date)}</span></span>
            <div class="buttons">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">✏</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Add confetti and motivational quote on task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();

    // Trigger confetti if the task is marked as completed
    if (tasks[index].completed) {
        confetti({
            particleCount: 200,   // Number of confetti particles
            spread: 150,          // Spread of the confetti
            origin: { x: 0.5, y: 0.5 }, // Center the confetti
            angle: 90,            // Angle of the confetti burst
            startVelocity: 30,    // Starting speed of the confetti
            colors: ['#bb0000', '#ffffff'], // Colors of the confetti
        });
        // Display a motivational quote
        displayMotivationalQuote();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding tasks
addBtn.addEventListener('click', () => {
    if (taskInput.value && dateInput.value) {
        tasks.push({ text: taskInput.value, date: dateInput.value, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        dateInput.value = '';
    }
});

// Event listener for clearing all tasks
clearAllBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
});

// Edit a task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    const newDate = prompt('Edit date:', tasks[index].date);
    if (newText && newDate) {
        tasks[index].text = newText;
        tasks[index].date = newDate;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Filter buttons functionality
allBtn.addEventListener('click', () => renderTasks('all'));
pendingBtn.addEventListener('click', () => renderTasks('pending'));
completedBtn.addEventListener('click', () => renderTasks('completed'));

// Initial render of tasks
renderTasks();
