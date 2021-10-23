/* 
  Read a list of links into an ordered list on the html page
  inspiration found from: "https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/" 
*/
function getIndex() {
	// initialize array
	const links = [
		{
			label: "Week 01",
			url: "week1"
		} ,
		{
		   	label: "Week 02",
		   	url: "week2"
		},
		{
		   	label: "Week 03",
		   	url: "week3"
		}
		,
		{
		   	label: "Week 04",
		   	url: "week4"
		},
		{
			label: "Week 05",
			url: "week5"
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
		["What is Superman's real name?","Clark Kent"],
		["What is Wonder Woman's real name?","Diana Prince"],
		["What is Batman's real name?","Bruce Wayne"],
		["How many questions have you gotten correct so far?", score] // a dynamic question
	];

	for(const [question,answer] of quiz){
		const response = prompt(question);

		// This allows the answer to be non case sensitive
		if(response.toLowerCase() === answer.toString().toLowerCase()){
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
		["What is Superman's real name?","Clark Kent"],
		["What is Wonder Woman's real name?","Diana Prince"],
		["What is Batman's real name?","Bruce Wayne"]
	];
	function start(quiz){
		let score = 0;
		// main game loop
		for(const [question,answer] of quiz){
			const response = ask(question);
			check(response,answer);
		}
		// end of main game loop
		gameOver();
		// function declarations
		function ask(question){
			return prompt(question);
		}
		function check(response,answer){
			if(response === answer){
			alert('Correct!');
			score++;
			} else {
			alert(`Wrong! The correct answer was ${answer}`);
			}
		}
		function gameOver(){
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
	  alert( calculator.sum() );
	  alert( calculator.mul() );
}
function exercise5() {
	var student = {
		name : "David Rayy",
		sclass : "VI",
		rollno : 12 };
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
				if (output[i] > output[i+1]) {
					let temp = output[i];
					let temp2 = output[i+1];
					output[i] = temp2;
					output[i+1] = temp;
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
		unlock() { this.locked = false; },
		lock() { this.locked = true;  },
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