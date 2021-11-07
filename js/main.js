/* 
  Read a list of links into an ordered list on the html page
  inspiration found from: "https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/" 
*/
function getIndex() {
	// initialize array
	const links = [{
			label: "Week 01",
			url: "week1"
		},
		{
			label: "Week 02",
			url: "week2"
		},
		{
			label: "Week 03",
			url: "week3"
		},
		{
			label: "Week 04",
			url: "week4"
		},
		{
			label: "Week 05",
			url: "week5"
		},		
		{
			label: "Week 07",
			url: "week7"
		},
		{
			label: "Week 08",
			url: "week8"
		},
		{
			label: "ToDoApp",
			url: "TODOapp"
		}
	]
	// for each index in links
	for (let i = 0; i < links.length; i++) {

		// create the url
		var url = document.createElement('a');
		url.href = links[i].url;

		// set the text on the anchor
		var label = document.createTextNode(links[i].label);
		url.appendChild(label);

		// create the list element
		var listElement = document.createElement('li');

		// add the url to the list element
		listElement.appendChild(url);

		// add the list element to the ordered list
		document.querySelector('ol').appendChild(listElement);
	}
}

// same from the reading
function chapter2() {
	const question = "What is Superman's real name?"
	const answer = prompt(question);
	alert(`You answered ${answer}`)
}

// slightly modified from the reading
function chapter3() {

	let score = 0;

	quiz = [
		["What is Superman's real name?", "Clark Kent"],
		["What is Wonder Woman's real name?", "Diana Prince"],
		["What is Batman's real name?", "Bruce Wayne"],
		["How many questions have you gotten correct so far?", score] // a dynamic question
	];

	for (const [question, answer] of quiz) {
		const response = prompt(question);

		// This allows the answer to be non case sensitive
		if (response.toLowerCase() === answer.toString().toLowerCase()) {
			alert('Correct!');
			score++;
			quiz[3][1]++;

		} else {
			alert(`Wrong! The correct answer was ${answer}`);
		}
	}
	alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
}
// same from the reading
function chapter4() {
	const quiz = [
		["What is Superman's real name?", "Clark Kent"],
		["What is Wonder Woman's real name?", "Diana Prince"],
		["What is Batman's real name?", "Bruce Wayne"]
	];

	function start(quiz) {
		let score = 0;
		// main game loop
		for (const [question, answer] of quiz) {
			const response = ask(question);
			check(response, answer);
		}
		// end of main game loop
		gameOver();
		// function declarations
		function ask(question) {
			return prompt(question);
		}

		function check(response, answer) {
			if (response === answer) {
				alert('Correct!');
				score++;
			} else {
				alert(`Wrong! The correct answer was ${answer}`);
			}
		}

		function gameOver() {
			alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
		}
	}
	start(quiz);
}
// From https://javascript.info/object-methods exercise 2 
function exercise2jsinfo() {
	let calculator = {
		read() {
			val1 = prompt("Enter a number");
			val2 = prompt("Enter another number");
		},
		sum() {
			return Number(val1) + Number(val2);
		},
		mul() {
			return Number(val1) * Number(val2);
		}
	};

	calculator.read();
	alert(calculator.sum());
	alert(calculator.mul());
}

function exercise5() {
	var student = {
		name: "David Rayy",
		sclass: "VI",
		rollno: 12
	};
	alert("The original object was: " + JSON.stringify(student));
	delete student.rollno;
	alert("Removing rollno gives: " + JSON.stringify(student));
}

function bubbleSort() {
	let data = [6, 4, 0, -3, -2, 1];
	let output = [6, 4, 0, -3, -2, 1];

	let notDone = true;
	while (notDone) {
		notDone = false;
		for (let i = 0; i < output.length; i++) {
			if (i !== (output.length - 1)) {
				if (output[i] > output[i + 1]) {
					let temp = output[i];
					let temp2 = output[i + 1];
					output[i] = temp2;
					output[i + 1] = temp;
					notDone = true;
				}
			}
		}
	}
	alert("Bubble sorting " + JSON.stringify(data) + " gives: " + JSON.stringify(output));

}

function turnoffP() {
	$("p").hide();
}

function turnonP() {
	$("p").show();
}

function multiply() {
	class MultiplicatorUnitFailure extends Error {}

	function primitiveMultiply(a, b) {
		if (Math.random() < 0.2) {
			return a * b;
		} else {
			throw new MultiplicatorUnitFailure("Klunk");
		}
	}

	function reliableMultiply(a, b) {

		try {
			return primitiveMultiply(a, b);
		} catch (error) {

			throw error;
		}

	}
	try {
		alert(reliableMultiply(8, 8));
	} catch (e) {
		alert("This error message has a random chance of appearing");
	}

}
// I had to go with their solution here.. the code is not mine aside from changing the console.log to an alert.
function lockedBox() {
	const box = {
		locked: true,
		unlock() {
			this.locked = false;
		},
		lock() {
			this.locked = true;
		},
		_content: [],
		get content() {
			if (this.locked) throw new Error("Locked!");
			return this._content;
		}
	};

	function withBoxUnlocked(body) {
		let locked = box.locked;
		if (!locked) {
			return body();
		}

		box.unlock();
		try {
			return body();
		} finally {
			box.lock();
		}
	}

	withBoxUnlocked(function() {
		box.content.push("gold piece");
	});

	try {
		withBoxUnlocked(function() {
			throw new Error("Pirates on the horizon! Abort!");
		});
	} catch (e) {
		alert("Error raised:" + " Pirates on the horizon! Abort!");
	}

	alert(box.locked);
	// → true
}
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
	let data = localStorage.getItem("toDoList");
	toDoList = JSON.parse(data);
	displayList();
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
// Write a JavaScript function which will take an array of numbers 
// stored and find the second lowest and second greatest numbers, respectively.
function secondNums() {
	let nums = [];
	let size = 5;
	alert("Task:\nWrite a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively.");
	for(let i=0; i<size; i++) {
		nums[i] = prompt('Enter an array number:');
	}
	nums = nums.sort(function(a, b) {
		return a - b;
	});
	let numsSet = [...new Set(nums)];
	let nums2 = Array.from(numsSet);
	if (nums2.length === 1) {
		alert("The array didn't contain enough unique numbers");
	}
	else {
		alert(`The array is: ${nums}\n${nums2[1]} is the second smallest, ${nums2[nums2.length - 2]} is the second largest`);
	}
}
// A function that lets the user create a function from the html page
function createJavaFunc() {
	let functionText = document.getElementById("functionText").value.toString();
	let theFunction = document.createElement("script");
	theFunction.language = "javascript";
	theFunction.text = functionText;
	document.getElementsByTagName('BODY').item(0).appendChild(theFunction);
	alert("Function Created");
}