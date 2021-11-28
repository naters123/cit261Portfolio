class food {
	constructor(id, name, quantity, exdate) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.exdate = exdate;
	}
}
let foodList = new Array();
let foods = ["Big Mac", "Egg", "Butter", "Bread", "Yogurt", "Cheese", "Chicken", "Turkey", "Apple", "Banana"];
// let showActive = true; 
// let showCompleted = true;
function displayList() {
	localStorage.setItem("foodList", JSON.stringify(foodList));
	// sessionStorage.setItem("toDoList", JSON.stringify(toDoList));
	const container = document.getElementById('foodList');
	container.innerHTML = '';
	console.log(foodList);
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
		item1.innerHTML = foodList[i].name;
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
		// attach coloumns to row
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

function addToList() {
	document.getElementById("addFood").style.display = "none";
	let inName = document.getElementById("inName").value;
	let inQuantity = document.getElementById("inQuantity").value;
	let inDate = document.getElementById("inDate").value;
	let anItem = new food(new Date().getTime(), inName, inQuantity, inDate);
	//let anItem = new food(new Date().getTime(), foodName, quantity, new Date(year, monthIndex, day));
	foodList.push(anItem);
	displayList();
}

function onLoad() {
	if(localStorage.getItem("foodList") !== null) {
		let data = localStorage.getItem("foodList");
		foodList = JSON.parse(data);
		displayList();
	}
}

function populateList() {
	for(let i = 0; i < 10; i++) {
		let anItem = new food(i, foods[i], i + 1, `${new Date().getFullYear()}-${new Date().getMonth()+1}-${Math.floor(Math.random() * (29 - new Date().getDate()-1) + new Date().getDate()-1)}`);
		//let anItem = new food(new Date().getTime(), foodName, quantity, new Date(year, monthIndex, day));
		foodList.push(anItem);
	}
	foodList = shuffleArray(foodList);
	displayList();
}

function clearList() {
	localStorage.clear();
	foodList = new Array();
	displayList();
}

function removeFood(food) {
	console.log(food);
	const foodNames = food.className.split(' ');
	for(let i = 0; i < foodList.length; i++) {
		for(let j = 0; j < foodNames.length; j++) {
			if(foodNames[j] == foodList[i].id) {
				foodList.splice(i, 1);
			}
		}
	}
	displayList();
}

function getNutrition(listItem) {
	document.getElementById("nutritionGuideMessage").style.display = "none";
	document.getElementById("nutritionDiv").style.display = "block";
	var food = listItem.id;
	fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${food}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_cholesterol%2Cnf_saturated_fat%2Cnf_sodium%2Cnf_dietary_fiber%2Cnf_sugars`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "nutritionix-api.p.rapidapi.com",
			"x-rapidapi-key": "a27d61b31cmsh5aa285c51234714p1b6693jsncfb62cf3dcbf"
		}
	}).then(response => response.json()).then(data => {
		displayNutrition(data, food);
		console.log('Success:', data);
		console.log(data.hits[0].fields.item_name);
		console.log(data.hits[0].fields.nf_calories);
	}).catch(err => {
		console.error(err);
	});
}

function displayNutrition(data, food) {
	let index = 0;
	for(index; index < foodList.length; index++) {
		if (foodList[index].name===food)
		{
			break;
		}
	}
	document.getElementById("Name").innerHTML = data.hits[0].fields.item_name;
	document.getElementById("Quantity").innerHTML = "Quantity # " + foodList[index].quantity;
	document.getElementById("Date").innerHTML = "Expiration Date: " + foodList[index].exdate;

	document.getElementById("Fat").innerHTML = data.hits[0].fields.nf_total_fat+"g";
	document.getElementById("Cholesterol").innerHTML = data.hits[0].fields.nf_cholesterol+"g";
	document.getElementById("DietaryFiber").innerHTML = data.hits[0].fields.nf_dietary_fiber+"g";
	document.getElementById("Protein").innerHTML = data.hits[0].fields.nf_protein+"g";
	document.getElementById("SaturatedFat").innerHTML = data.hits[0].fields.nf_saturated_fat+"g";
	document.getElementById("Sodium").innerHTML = data.hits[0].fields.nf_sodium+"g";
	document.getElementById("Sugar").innerHTML = data.hits[0].fields.nf_sugars+"g";
	document.getElementById("Carbohydrates").innerHTML = data.hits[0].fields.nf_total_carbohydrate+"g";

	document.getElementById("calorieAmount").innerHTML = data.hits[0].fields.nf_calories;

	
}

// Pop up
function openForm() {
	document.getElementById("addFood").style.display = "block";
}

function closeForm() {
	document.getElementById("addFood").style.display = "none";
}

// Randomize array
// Src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}