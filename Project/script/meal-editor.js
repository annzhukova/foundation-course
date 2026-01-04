import { onAuthChange } from "./auth.js";
import { createNewMealInFirestore, readMeal, updateMealInFirestore } from "./firestore.js";

const mealTitle = document.getElementById("title");
const mealPhoto = document.getElementById("meal_photo_input")
const mealPortions = document.getElementById("portions");
const mealDifficulty = document.getElementById("difficulty");
const meal_category = document.getElementById("meal_category");
const mealCalories = document.getElementById("calories");
const ingredients_search = document.getElementById("ingredients_search");
const mealPreporation = document.getElementById("preporation");
const saveBtn = document.getElementById("saveMealBtn");
const cancelBtn = document.getElementById("cancelBtn");
const ingredientsResults = document.getElementById("ingredientsResults");
const ingredientsContainerValues = document.getElementById("ingredients_container_values");
const ingredientList = document.getElementById("ingredientList");

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");
const mealId = urlParams.get("mealId");

const logo = document.getElementById("logo");

let currentUser = null;
let ingredientsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
let ingredientsList = null;

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    currentUser = user;
    switch (mode) {
        case 'new':
            {
                //Form elements should be enabled

                saveBtn.textContent = "Save";
                ingredientsList = getIngredientsFromAPI();
                break;
            }
        case 'edit':
            {
                //Form elements should be enabled
                saveBtn.textContent = "Update";
                ingredientsList = getIngredientsFromAPI();
                displayData();
                break;
            }
        default:
            {
                console.error("unknown mode: " + mode);
                window.location.href = "cook_book.html";
            }
    }


});

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "cook_book.html";
});
saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (mode === 'new') {
        //submit data to firebase
        await createNewMeal();
    }
    else if (mode === 'edit') {
        //push the updated data to firebase
        updateExistingMeal();
    }
})

ingredients_search.addEventListener('input', () => {
    const word = ingredients_search.value;
    if (word) {
        const searchResults = searchForIngredient(word);
        showResults(searchResults);
    } else {
        showNotice();
    }
})

const searchForIngredient = (word) => {
    let newArr = [];
    ingredientsList.map(item => {
        item.includes(word) ? newArr.push(item) : '';
    });
    //console.log(newArr);
    return newArr;
}

const getIngredientsFromAPI = async () => {
    if (!ingredientsList) {
        const resp = await fetch(ingredientsUrl);
        const data = await resp.json();
        const list = data.meals;
        const res = createIngredientsArray(list);
        ingredientsList = res;
    }
    return ingredientsList;
}

const createIngredientsArray = (data) => {
    const ingredientList = [];
    data.forEach((ingr) => ingredientList.push(ingr.strIngredient.toLowerCase()));
    return ingredientList;
}

const showResults = (data) => {
    ingredientsResults.innerHTML = "";
    if (data) {
        data.forEach((ingr) => addIngredient(ingr));
    }
}

const addIngredient = (item) => {
    const ingrContainer = document.createElement("div");
    ingrContainer.innerHTML = `<div class="inrgName">${item}</div`;
    ingredientsResults.appendChild(ingrContainer);

    const inrgName = ingrContainer.querySelector('.inrgName');
    inrgName.addEventListener('click', () => {
        ingredientsResults.innerHTML = "";
        ingredients_search.value = "";
        addIngredienttoForm(item, null, null);
    })
}
const showNotice = () => {
    ingredientsResults.innerHTML = "";
}

const addIngredienttoForm = (name, weight, unit) => {
    //ingredientList
    const currIngredientContainer = document.createElement("div");
    currIngredientContainer.classList.add("mealIngredientDiv");
    currIngredientContainer.innerHTML = `<span class="mealIngredient">${name}</span>
                                        <label>weight</label>
                                        <input type="text" name="ingredientWeight" class="ingredientWeight" value="${weight != null ? weight : ""}"/>
                                        <label>mesurement unit</label>
                                        <span class="hint" title="kg, g, liter, oz, etc">?</span>
                                        <input type="text" name="ingredientUnit" class="ingredientUnit" value="${unit != null ? unit : ""}"/>
                                        <span class="ingredientDel">x</span>` ;
    let deleteButton = currIngredientContainer.querySelector(".ingredientDel");
    let weightInput = currIngredientContainer.querySelector(".ingredientWeight");
    weightInput.style.width = '50px;';
    deleteButton.addEventListener("click", () => {
        currIngredientContainer.remove();
    });
    ingredientList.appendChild(currIngredientContainer);
};

const createNewMeal = async () => {
    //we need to collect the data from fields
    const newMealData = prepareNewMealData();
    console.log(newMealData);
    //push to firestore
    const mealId = await createNewMealInFirestore(newMealData);
    if (mealId) {
        console.log(mealId);
        window.location.href = "cook_book.html";
    }
}

function collectFormData() {
    const title = mealTitle.value.trim();
    const portions = mealPortions.value.trim();
    const difficulty = mealDifficulty.value.trim();
    const category = meal_category.value.trim();
    const calories = mealCalories.value;
    const preporation = mealPreporation.value;
    const ingredients = collectIngredients();
    //const img = mealPhoto.value.trim();
    const img = "";
    return { title, portions, difficulty, category, calories, preporation, ingredients, img };
}

function collectIngredients() {
    const ingredientsInfo = document.getElementsByClassName('mealIngredientDiv');
    return Array.from(ingredientsInfo).map(div => {
        let obj = {};
        obj[div.querySelector('.mealIngredient').innerText] = {
            'weight': div.querySelector('.ingredientWeight').value.trim(),
            'unit': div.querySelector('.ingredientUnit').value.trim()
        };
        return obj;
    });
}

function prepareNewMealData() {
    const formFields = collectFormData();
    const timestamp = new Date();
    return {
        ...formFields,
        created: timestamp,
        updated: timestamp,
        userId: currentUser.uid,
    }
}

async function displayData() {
    // Get the data from Firestore
    readMeal(mealId).then(data => {
        //show the data in the form
        if (data) {
            displayDataInForm(data);
        } else {
            console.error("Entry was not found!");
            window.location.href = "cook_book.html";
        }
    });

}

function displayDataInForm(data) {
    mealTitle.value = data.title;
    //mealPhoto: show image
    mealPortions.value = data.portions;
    mealDifficulty.value = data.difficulty;
    meal_category.value = data.category;
    mealCalories.value = data.calories;
    mealPreporation.value = data.preporation;
    displayIngredientsInForm(data.ingredients);


}
function displayIngredientsInForm(data) {
    data.forEach(ingredient => {
        let name = Object.keys(ingredient)[0];
        let properties = Object.values(ingredient)[0];
        addIngredienttoForm(name, properties.weight, properties.unit)
    });
}


async function updateExistingMeal() {
    const updatedMealData = prepareUpdatedMealData();
    //push to firestore
    const status = await updateMealInFirestore(mealId, updatedMealData);
    if (status) {
        window.location.href = "cook_book.html";
    }
}

function prepareUpdatedMealData() {
    const formFields = collectFormData();
    const timestamp = new Date();
    return {
        ...formFields,
        updated: timestamp,
    }
}