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