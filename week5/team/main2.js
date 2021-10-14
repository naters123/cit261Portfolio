/* 
  Read a list of links into an ordered list on the html page
  inspiration found from: "https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/" 
*/
function getHike() {
	// initialize array
	const hikes = [
		{
			name: "Bechler Falls",
			image: "falls.jpg",
			distance: "3 miles",
			difficulty: "Easy",
			description: "asd asda sdas das das das das das das das das dsad fsadf sdaf sadf saf safd safd sadf sdaf sad fsaf"
		} ,
		{
			name: "Teton Canyon",
			image: "falls.jpg",
			distance: "3 miles",
			difficulty: "Easy",
			description: "asd asda sdas das das das das das das das das dsad fsadf sdaf sadf saf safd safd sadf sdaf sad fsaf"
		} ,
		{
			name: "Denanda Falls",
			image: "falls.jpg",
			distance: "7 miles",
			difficulty: "Moderate",
			description: "asd asda sdas das das das das das das das das dsad fsadf sdaf sadf saf safd safd sadf sdaf sad fsaf"
		} 
	]
    // for each index in hikes
	for (let i = 0; i < hikes.length; i++) {
		
        let listElement = document.createElement('li');

        let div1 = document.createElement('div');
        div1.classList.add("header2");
		let title = document.createElement('h2');
		title.appendChild(document.createTextNode(hikes[i].name));
        div1.appendChild(title);
        listElement.appendChild(div1);

        let div2 = document.createElement('div');
        div2.classList.add("imageContainer");
        let image = document.createElement('img');
        image.src = hikes[i].image;
        div2.appendChild(image);
        listElement.appendChild(div2);

        let div3 = document.createElement('div');
        div3.classList.add("textContainer");
        let distanceTitle = document.createElement('h3');
		distanceTitle.appendChild(document.createTextNode("Distance"));
        div3.appendChild(distanceTitle);

        let distance = document.createElement('p');
		distance.appendChild(document.createTextNode(hikes[i].distance));
        div3.appendChild(distance);
        
        let difficultyTitle = document.createElement('h3');
		difficultyTitle.appendChild(document.createTextNode("Difficulty"));
        div3.appendChild(difficultyTitle);


        let difficulty = document.createElement('p');
		difficulty.appendChild(document.createTextNode(hikes[i].difficulty));
        div3.appendChild(difficulty);

        listElement.appendChild(div3);

		document.getElementById('hikes').appendChild(listElement);
	}
}