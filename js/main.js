/* 
  Read a list of links into an ordered list on the html page
  inspiration found from: "https://www.geeksforgeeks.org/how-to-create-a-link-in-javascript/" 
*/
function getIndex() {
	// initialize array
	const links = [{
			label: "Week 01",
			url: "week1"
		} //, For a new index
		//{
		//   label: "Week 02",
		//  url: "week2/index.html"
		//}
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