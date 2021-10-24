
class todo {
	constructor(id, content, completed) {
		this.id = id;
		this.content = content;
		this.completed = completed;
	}
	id() {
		return this.id;
	}
	content() {
		return this.content;
	}
	completed() {
		return this.completed;
	}
}

let toDoList = new Array();
let showActive = true; 
let showCompleted = true;

function displayList() {
	localStorage.setItem("toDoList", JSON.stringify(toDoList));
	// sessionStorage.setItem("toDoList", JSON.stringify(toDoList));
	let tasksLeft = 0;
	for (let i = 0; i < toDoList.length; i++) {
		if (!toDoList[i].completed) {
			tasksLeft++;
		}
	}
	document.getElementById('tasks').innerHTML = `${tasksLeft} tasks left.`
	const container = document.getElementById('listContainer');
	container.innerHTML = '';
	
	for (let i = 0; i < toDoList.length; i++) {
		let listElement = document.createElement('div');
		checkDiv = document.createElement('div');
		nameDiv = document.createElement('div');
		xDiv = document.createElement('div');
		listElement.classList.add('listElement');

		checkDiv.classList.add('tenWidth');
		let checkBox = document.createElement('input');
		checkBox.type = 'checkbox';
		checkBox.classList.add(toDoList[i].id);
		checkBox.classList.add('checkBox');
		checkBox.setAttribute("onclick", "completeTask(this)");
		if (toDoList[i].completed) {
			checkBox.checked = true;
		}
		checkDiv.appendChild(checkBox);
		listElement.appendChild(checkDiv);

		nameDiv.classList.add('eightyWidth');
		let name = document.createElement('p');
		if (checkBox.checked === true) {
			name.style.textDecoration = "line-through";
		}
		name.innerHTML = toDoList[i].content;
		name.classList.add('taskName');
		name.classList.add(toDoList[i].id);
		nameDiv.appendChild(name);
		listElement.appendChild(nameDiv);

		xDiv.classList.add('tenWidth');
		let anchor = document.createElement('a');
		anchor.classList.add('remove');
		anchor.classList.add(toDoList[i].id);
		anchor.setAttribute("onclick", "removeTask(this)");
		let label = document.createTextNode('X');
		anchor.appendChild(label);
		xDiv.appendChild(anchor);
		listElement.appendChild(xDiv);
		if (showActive && showCompleted) {
			document.getElementById('listContainer').appendChild(listElement);
		}
		else if (showActive && !showCompleted) {
			if (checkBox.checked === false) {
				document.getElementById('listContainer').appendChild(listElement);
			}
		}
		else if (!showActive && showCompleted) {
			if (checkBox.checked === true) {
				document.getElementById('listContainer').appendChild(listElement);
			}
		}
	}
}

function addToList() {
	let content = document.getElementById("theInput").value;
	document.getElementById("theInput").value = '';
	if (content) {
		let anItem = new todo(new Date().getTime(), content.toString(), false);
		toDoList.push(anItem);
		displayList();
	}
}

function onLoad() {
	if (localStorage.getItem("toDoList") !== null) {
		let data = localStorage.getItem("toDoList");
		// data = sessionStorage.getItem("toDoList");
		toDoList = JSON.parse(data);
		displayList();		
	}
}

function removeTask(task) {
	console.log(task);
	const classNames = task.className.split(' ');
	for (let i = 0; i < toDoList.length; i++) {
		for (let j = 0; j < classNames.length; j++) {
			if (classNames[j] == toDoList[i].id) {
				toDoList.splice(i, 1);
			}
		}
	}
	displayList();
}

function completeTask(taskBox) {
	let checked = taskBox.checked;
	const classNames = taskBox.className.split(' ');
	for (let i = 0; i < toDoList.length; i++) {
		for (let j = 0; j < classNames.length; j++) {
			if (classNames[j] == toDoList[i].id) {
				toDoList[i].completed = !toDoList[i].completed;
			}
		}
	}
	displayList();
}
function showAll() {
	showActive = true;
	showCompleted = true;
	displayList();
}
function active() {
	showActive = true;
	showCompleted = false;
	displayList();
}
function complete() {
	showActive = false;
	showCompleted = true;
	displayList();
}