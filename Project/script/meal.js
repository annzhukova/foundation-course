import { logout, onAuthChange } from "./auth.js";
import { readMeal } from "./firestore.js"


const logoutBtn = document.querySelector("#logout");
/*const messageDiv = document.getElementById("message");*/
const editMealBtn = document.getElementById("editMealBtn");
const plannerLink = document.getElementById('plannerLink');
const overlay = document.getElementById("overlay");
const overlayPopup = document.getElementById("overlay_popup");
const createPlanBtn = document.getElementById("createPlanBtn");
const planStartDate = document.getElementById("start_date");
const planEndDate = document.getElementById("end_date");
const cancelPlanner = document.getElementById("cancel_planner");

const mealTitleHeader = document.getElementById("meal_title_header");
const mealTitle = document.getElementById("meal_title");
const mealImg = document.getElementById("meal_img");
const mealDifficulty = document.getElementById("meal_difficulty");
const mealCategory = document.getElementById("meal_category");
const mealPortions = document.getElementById("meal_portions");
const mealCalories = document.getElementById("meal_calories");
const mealIngredients = document.getElementById("meal_ingredients");
const mealPreporation = document.getElementById("meal_preporation");

const logo = document.getElementById("logo");

const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get("mealId");

const key = "mealsData";
let mealsData = [];

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})

editMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "add_meal.html?mode=edit&mealId=" + mealId;
});

plannerLink.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.zIndex = 3;
    overlay.style.display = "block";
    overlayPopup.style.zIndex = 4;
    overlayPopup.style.display = "block";
    overlayPopup.style.transition = "all 5s ease-in-out;"
});

cancelPlanner.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.zIndex = -1;
    overlay.style.display = "none";
    overlayPopup.style.zIndex = 1;
    overlayPopup.style.display = "none";
    planStartDate.value = "";
    planEndDate.value = "";
});

createPlanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const dateStart = planStartDate.value;
    const dateEnd = planEndDate.value;
    window.location.href = "planner.html?dateStart=" + dateStart + "&dateEnd=" + dateEnd;
});

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }

    displayData();
})

async function displayData() {
    // Get the data from Firestore
    readMeal(mealId).then(data => {
        //show the data in the form
        if (data) {
            console.log(data);
            displayDataOnPage(data);
        } else {
            console.error("Entry was not found!");
            window.location.href = "app.html";
        }
    });

}

function displayDataOnPage(data) {
    mealTitleHeader.textContent = data.title;
    mealTitle.textContent = data.title;
    //mealImg
    mealDifficulty.textContent = data.difficulty;
    mealCategory.textContent = data.category;
    mealPortions.textContent = data.portions;
    mealCalories.textContent = data.calories;
    mealPreporation.textContent = data.preporation;
    displayIngredientsOnPage(data.ingredients);
}

function displayIngredientsOnPage(data) {
    data.forEach(ingredient => {
        let name = Object.keys(ingredient)[0];
        let properties = Object.values(ingredient)[0];
        addIngredienttoBlock(name, properties.weight, properties.unit);
    });
}

function addIngredienttoBlock(name, weight, unit) {
    const currIngredientContainer = document.createElement("div");
    currIngredientContainer.innerHTML = `<span>${weight} ${unit} ${name}</span>`;
    mealIngredients.appendChild(currIngredientContainer);
}


