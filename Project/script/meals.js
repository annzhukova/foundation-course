import { logout, onAuthChange } from './auth.js';

//import { readMeals } from './firestore.js';

const logoutBtn = document.querySelector("#logout");
/*const messageDiv = document.getElementById("message");
const addMealBtn = document.getElementById("addMealBtn");*/

logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})
/*
addMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "add_meal.html?mode=new"
});*/

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    console.log(user);
    //const results = await readMeals(user.uid);


    //console.log(results);
    //updateMealsList(results);
})

function updateMealsList(meals) {
    const noMealsMsg = document.getElementById("noMealsMsg");
    const mealsList = document.getElementById("mealsList");
    mealsList.innerHTML = "";
    if (meals.length === 0 || !meals) {
        noMealsMsg.style.display = "block";
        return;
    }
    meals.forEach(meal => {
        const li = document.createElement("li");
        li.dataset.id = meal.id;

        li.innerHTML = `
            <div class="meal-title">${meal.title}</div>
            <div class="meal-date">${meal.created ? new Date(meal.created.seconds * 1000).toLocaleDateString() : "-"}</div>
            <div class="meal-actions">
            <button class="editMealBtn">Edit</button>
            <button class="deleteMealBtn">Delete</button>
            </div>`;

        const viewMeal = li.querySelector(".meal-title");
        const editMealBtn = li.querySelector(".editMealBtn");
        const deleteMealBtn = li.querySelector(".deleteMealBtn");

        viewMeal.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "meal.html?mode=view&id=" + meal.id;
        });

        editMealBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "add_meal.html?mode=edit&id=" + meal.id;
        });

        deleteEntryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "delete_meal.html?mode=delete"
        });
        mealsList.appendChild(li);
    });
}