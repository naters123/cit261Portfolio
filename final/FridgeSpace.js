// The food class the list will use
class food {
	constructor(id, name, quantity, exdate) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.exdate = exdate;
	}
} 

// A list of food items
let foodList = new Array();
// This is for a random list population
let foods = ["Big Mac", "Egg", "Butter", "Bread", "Yogurt", "Cheese", "Chicken", "Turkey", "Apple", "Banana"];

/* Display the list of foods on the left container. I should've just used innerHTML/literals instead of appendChild for everything.. */
function displayList() {
	localStorage.setItem("foodList", JSON.stringify(foodList));
	const container = document.getElementById('foodList');
	// Clear the list to redraw it
	container.innerHTML = '';

	// Add each food to the list display
	for(let i = 0; i < foodList.length; i++) {
		// Top div
		let foodListItem = document.createElement("div");
		foodListItem.classList.add('foodListItem');
		foodListItem.classList.add(foodList[i].id);
		foodListItem.setAttribute("id", foodList[i].name);
		foodListItem.setAttribute("onclick", "getNutrition(this)");
		// Row containing the food item
		let row1 = document.createElement("div");
		row1.classList.add('row');
		// columns and info
		// Name
		let col301 = document.createElement("div");
		col301.classList.add('col30');
		let item1 = document.createElement("p");
		item1.classList.add('item');
		item1.classList.add(foodList[i].id);
		let theName = foodList[i].name;
		if(theName.length > 15) {
			theName = theName.substring(0, 12) + "...";
		}
		item1.innerHTML = theName;
		col301.appendChild(item1);
		// Quantity
		let col302 = document.createElement("div");
		col302.classList.add('col30');
		let item2 = document.createElement("p");
		item2.classList.add('item');
		item2.classList.add(foodList[i].id);
		item2.innerHTML = foodList[i].quantity;
		col302.appendChild(item2);
		// Date
		let col303 = document.createElement("div");
		col303.classList.add('col30');
		let item3 = document.createElement("p");
		item3.classList.add('item');
		item3.classList.add(foodList[i].id);
		item3.innerHTML = foodList[i].exdate;
		col303.appendChild(item3);
		// Attach coloumns to row
		row1.appendChild(col301);
		row1.appendChild(col302);
		row1.appendChild(col303);
		// Row containing the hr
		let row2 = document.createElement("div");
		row2.classList.add('row');
		// Attach hr to row
		row2.appendChild(document.createElement("hr"));
		// Attach row to item
		foodListItem.appendChild(row1);
		// Attach Item and hr to list
		container.appendChild(foodListItem);
		container.appendChild(row2);
	}
}
/* Add a new item to the list */
function addToList() {
	// Close the form 
	document.getElementById("addFood").style.display = "none";
	// Grab the input values from the form
	let inName = document.getElementById("invTypes").value;
	let inQuantity = document.getElementById("inQuantity").value;
	let inDate = document.getElementById("inDate").value;
	// Create the Food item and add to list
	let anItem = new food(new Date().getTime(), inName, inQuantity, inDate);
	foodList.push(anItem);
	// The list changed so redraw it
	displayList();
}
/* Quickly adds a few test items with random dates (within a range) */
function populateList() {
	// Grab names from premade array and use today's date
	for(let i = 0; i < 10; i++) {
		let anItem = new food(i, foods[i], i + 1, `${new Date().getFullYear()}-${new Date().getMonth()+1}-${Math.floor(Math.random() * (29 - new Date().getDate()-1) + new Date().getDate()-1)}`);
		foodList.push(anItem);
	}
	// The list changed so redraw it
	displayList();
}
/* Remove everything from the list and localstorage all at once */
function clearList() {
	localStorage.clear();
	foodList = new Array();
	// The list changed so redraw it
	displayList();
}
/* Remove a specific food from the list */
function removeFood() {
	// When a user clicks a food and getNutrition() is called, it stores the Id of the food item in the 
	// removeId hidden input. 
	const foodNames = document.getElementById("removeId").value.split(' ');
	// Loop through the food list to find the input that matches the one the user clicked on
	for(let i = 0; i < foodList.length; i++) {
		for(let j = 0; j < foodNames.length; j++) {
			// if they match, remove it
			if(foodNames[j] == foodList[i].id) {
				foodList.splice(i, 1);
			}
		}
	}
	// Stop displaying the deleted item's nutritional info
	document.getElementById("nutritionDiv").style.display = "none";
	// Display a message instead
	document.getElementById("nutritionGuideMessage").style.display = "block";
	document.getElementById("nutritionGuideMessage").innerHTML = "The item was deleted. Click on another to view its nutritional information. <br>&#171;&#171;"
	// The list changed so redraw it
	displayList();
}
/* API request for a food's nutritional information */
function getNutrition(listItem) {
	// hide the display message
	document.getElementById("nutritionGuideMessage").style.display = "none";
	// show the container that holds the nutritional information
	document.getElementById("nutritionDiv").style.display = "block";
	// the item we are getting nutritional information for
	let food = listItem.id;
	// names with % characters need to be formatted for the url
	thefood = food.replace(/%/g, '%25');
	// set the hidden input to the food's ID in case the user wants to delete this food
	document.getElementById("removeId").value = listItem.className;
	// Make the API call
	fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${thefood}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_cholesterol%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_sugars`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
			"x-rapidapi-key": "a27d61b31cmsh5aa285c51234714p1b6693jsncfb62cf3dcbf"
		}
	}).then(response => response.json()).then(data => {
		// Display results
		displayNutrition(data, food);
	}).catch(err => {
		console.error(err);
	});
}
/* This will display the nutrition in the Nutrition Facts container */
function displayNutrition(data, food) {
	let index = 0;
	// Find the food in the array to use its other values besides the name (exp date, quantity)
	for(index; index < foodList.length; index++) {
		if(foodList[index].name === food) {
			break;
		}
	}
	// Set the HTML values
	document.getElementById("Name").innerHTML = data.hits[0].fields.item_name;
	document.getElementById("Quantity").innerHTML = "Quantity # " + foodList[index].quantity;
	document.getElementById("Date").innerHTML = "Expiration Date: " + foodList[index].exdate;
	document.getElementById("Fat").innerHTML = data.hits[0].fields.nf_total_fat + "g";
	document.getElementById("Cholesterol").innerHTML = data.hits[0].fields.nf_cholesterol + "g";
	document.getElementById("DietaryFiber").innerHTML = data.hits[0].fields.nf_dietary_fiber + "g";
	document.getElementById("Protein").innerHTML = data.hits[0].fields.nf_protein + "g";
	document.getElementById("SaturatedFat").innerHTML = data.hits[0].fields.nf_saturated_fat + "g";
	document.getElementById("Sodium").innerHTML = data.hits[0].fields.nf_sodium + "g";
	document.getElementById("Sugar").innerHTML = data.hits[0].fields.nf_sugars + "g";
	document.getElementById("Carbohydrates").innerHTML = data.hits[0].fields.nf_total_carbohydrate + "g";
	document.getElementById("calorieAmount").innerHTML = data.hits[0].fields.nf_calories;
}
/* open pop up form */
function openForm() {
	document.getElementById("addFood").style.display = "block";
}
/* close pop up form */
function closeForm() {
	document.getElementById("addFood").style.display = "none";
}
/* Make an API call to get the more specific food options for the Form */
function displayOptions() {
	if(document.getElementById("inName").value.length !== 0) {
		let food = document.getElementById("inName").value;
		// names with % characters need to be formatted for the url
		thefood = food.replace(/%/g, '%25');
		fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${thefood}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_cholesterol%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_sugars`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
				"x-rapidapi-key": "a27d61b31cmsh5aa285c51234714p1b6693jsncfb62cf3dcbf"
			}
		}).then(response => response.json()).then(data => {
			// Add these options to the drop down list
			createDisplayOptions(data, food);
			console.log('Success:', data);
		}).catch(err => {
			console.error(err);
		});
	}
}
/* Adds more specific options to a drop down list when a user types a food */
function createDisplayOptions(data, food) {
	let selectList = document.getElementById("invTypes");
	// If there was already something inside the drop down bar, clear it
	selectList.innerHTML = "";
	let theOptions = "";
	// Add options until we have them all
	for(let i = 0; i < data.hits.length; i++) {
		let anOption = `<option value='${data.hits[i].fields.item_name}'>${data.hits[i].fields.item_name}</option>`;
		theOptions += anOption;
	}
	// Add the user's original input if they would rather use that
	let finalOption = `<option value='${food}'>${food}</option>`;
	theOptions += finalOption;
	// Add them to the page
	selectList.innerHTML = theOptions;
}
/* When the page loads the list needs to be taken from storage */
window.addEventListener('load', function() {
	// Grab the list from local storage
	if(localStorage.getItem("foodList") !== null) {
		let data = localStorage.getItem("foodList");
		foodList = JSON.parse(data);
		// Need to know which items have expired, add them to a list
		expiredFood = new Array();
		let todayDate = new Date();
		todayDate = todayDate.toISOString().slice(0, 10);
		for(let i = 0; i < foodList.length; i++) {
			if(foodList[i].exdate < todayDate) {
				expiredFood.push(foodList[i].name);
			}
		}
		// Display all food items
		displayList();
		// Build a display message to let the user know what foods have expired
		if(expiredFood.length) {
			let message = "The following foods have expired: <br><br>"
			for(let i = 0; i < expiredFood.length; i++) {
				message += expiredFood[i] + "<br>";
			}
			document.getElementById("nutritionGuideMessage").innerHTML = message;
		}
	}
})