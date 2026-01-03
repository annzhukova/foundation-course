import { logout, onAuthChange } from './auth.js';

import { readMeals } from './firestore.js';

const logoutBtn = document.querySelector("#logout");
/*const messageDiv = document.getElementById("message");*/
const addMealBtn = document.getElementById("add_meal_btn");

logoutBtn.addEventListener('click', async () => {
    try {
        await logout();
    }
    catch (error) {
        console.error("Logout failed", error);
        messageDiv.textContent = "Logout failed: " + error.message;
    }
})

addMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "add_meal.html?mode=new"
});

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    console.log(user);
    const results = await readMeals(user.uid);

    console.log(results);
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
        const div = document.createElement("div");
        div.classList.add("meal");
        div.dataset.id = meal.id;

        div.innerHTML = `
            <div class="meal">
                <div>
                    <img class="meal_img" src="${meal.img}" alt="${meal.img}" />
                </div>
                <div class="meal_name">
                    <span>${meal.title}</span>
                </div>
                <div class="meal_actions">
                    <span class="actions_del deleteMealBtn">delete</span>
                    <span class="planner_item_actions_replace editMealBtn">edit</span>
                </div>
            </div>`;

        const viewMeal = div.querySelector(".meal_img");
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

        deleteMealBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "delete_meal.html?mode=delete"
        });
        mealsList.appendChild(div);
    });
}