import { logout, onAuthChange } from "./auth.js";
import { readMeals, deleteMealInFirestore } from "./firestore.js"


const logoutBtn = document.querySelector("#logout");
/*const messageDiv = document.getElementById("message");*/
const addMealBtn = document.getElementById("add_meal_btn");
const plannerLink = document.getElementById('plannerLink');
const overlay = document.getElementById("overlay");
const overlayPopup = document.getElementById("overlay_popup");
const createPlanBtn = document.getElementById("createPlanBtn");
const planStartDate = document.getElementById("start_date");
const planEndDate = document.getElementById("end_date");
const cancelPlanner = document.getElementById("cancel_planner");

const logo = document.getElementById("logo");

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

addMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "add_meal.html?mode=new"
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

    const results = await readMeals(user.uid);
    //console.log(results);
    getMealsList(results);
})


const getMealsList = async (meals) => {
    const noMealsMsg = document.getElementById("noMealsMsg");
    const mealsList = document.getElementById("meals_wrap");
    mealsList.innerHTML = "";
    if (meals.length === 0 || !meals) {
        noMealsMsg.style.display = "block";
        return;
    }
    meals.forEach(meal => {
        const div = document.createElement("div");
        div.dataset.id = meal.id;
        div.classList.add("meal");

        div.innerHTML = `
                <div>
                    <a href="meal.html?mealId=${meal.id}" class="meal_link"><img class="meal_img" src="${meal.img ? meal.img : "images/no_img.jpg"}" alt="" /></a>
                </div>
                <div class="meal_name">
                    <span><a href="meal.html?mealId=${meal.id}">${meal.title}</a></span>
                </div>
                <div class="meal_actions">
                    <span class="actions_del">delete</span>
                    <span class="planner_item_actions_replace">edit</span>
                </div>`;

        let viewMeal = div.querySelector(".meal_img");
        let editMealBtn = div.querySelector(".planner_item_actions_replace");
        let deleteMealBtn = div.querySelector(".actions_del");

        viewMeal.addEventListener('click', () => {
            window.location.href = "meal.html?mealId=" + meal.id;
        });

        editMealBtn.addEventListener('click', () => {
            window.location.href = "add_meal.html?mode=edit&mealId=" + meal.id;
        });

        deleteMealBtn.addEventListener('click', async (e) => {
            if (confirm(`"Delete ${meal.title} forever?"`)) {
                if (await deleteMealInFirestore(meal.id)) {
                    e.currentTarget.closest(".meal").remove();
                }
            }



        });
        mealsList.appendChild(div);
    });

    localStorage.setObj(key, meals);
}