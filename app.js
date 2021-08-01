// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listenser
function loadEventListeners() {
	// DOM Load Event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add Task Event
	form.addEventListener('submit', addTask);
	// Remove Task Event
	taskList.addEventListener('click', removeTask);
	// Clear Task Event
	clearBtn.addEventListener('click', clearTasks);
	// Filter Tasks Event
	filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LocalStorage
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) {
		// Create li Element
		const li = document.createElement('li');
		// Add Class
		li.className = 'collection-item';
		// Create textNode and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add Class
		link.className = 'delete-item secondary-content';
		// ADD Icon HTML
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Appen the link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add A Task');
	}

	// Create li Element
	const li = document.createElement('li');
	// Add Class
	li.className = 'collection-item';
	// Create textNode and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement('a');
	// Add Class
	link.className = 'delete-item secondary-content';
	// ADD Icon HTML
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Appen the link to li
	li.appendChild(link);
	// Append li to ul
	taskList.appendChild(li);

	// Store to LocalStorage(LS)
	storeTaskInLocalStorage(taskInput.value);

	// Clear Input
	taskInput.value = '';

	e.preventDefault();
}

//  Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove form LocalStorage (LS)
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeTaskFromLocalStorage(taskItem) {
	// console.log(taskItem);
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// Slower Process
	// taskList.innerHTML = '';

	// Faster Process
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear from LocalStorage(LS)
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
