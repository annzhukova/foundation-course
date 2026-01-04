import { logout, onAuthChange } from "./auth.js";

const key = "mealsData";
const urlParams = new URLSearchParams(window.location.search);
const dateStart = urlParams.get("dateStart");
const dateEnd = urlParams.get("dateEnd");
const mainElement = document.getElementById("mainElement");
const logo = document.getElementById("logo");
let mealsData = [];

//initialisation: start date, end date

//var today = new Date().toISOString().split('T')[0];
//document.getElementsByName("somedate")[0].setAttribute('min', today);

//select by category from db meals
//create plan
//date1 : cat1 meal, cat2 meal, cat3 meal, cat 4 meal
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}

onAuthChange(async (user) => {
    if (!user) {
        window.location.href = "index.html";
    }
    if (dateStart && dateEnd) {
        showPlanner();
    } else {
        window.location.href = "cook_book.html";
    }

})

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

const showPlanner = () => {
    mealsData = localStorage.getObj(key);
    const breakfasts = Array.from(mealsData).filter((meal) => {
        return meal.category === "Breakfast";
    });
    const lunches = Array.from(mealsData).filter((meal) => {
        return meal.category === "Lunch";
    });
    const snacks = Array.from(mealsData).filter((meal) => {
        return meal.category === "Snack";
    });
    const dinners = Array.from(mealsData).filter((meal) => {
        return meal.category === "Dinner";
    })
    const date1 = new Date(dateEnd);
    const date2 = new Date(dateStart);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //const todayDate = new Date();
    //date1.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0);
    for (let i = 0; i <= diffDays; i++) {
        const section = document.createElement('section');
        section.classList.add("planner_day");
        const divHeader = document.createElement('div');
        divHeader.classList.add('planner_header');
        const h3 = document.createElement('h3');
        h3.textContent = date2.toLocaleString('default', { month: 'long' }) + ", " + (date2.getDate() + i);
        divHeader.appendChild(h3);
        section.appendChild(divHeader);
        const divDay = document.createElement('div');
        divDay.classList.add('planner_day_container');
        let breakfastHtml = "";
        let lunchHtml = "";
        let snackHtml = "";
        let dinnerHtml = "";
        let randomBreakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)];
        let randomLunch = lunches[Math.floor(Math.random() * lunches.length)];
        let randomSnack = snacks[Math.floor(Math.random() * snacks.length)];
        let randomDinner = dinners[Math.floor(Math.random() * dinners.length)];
        if (breakfasts[i]) {
            breakfastHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Breakfast</span></div>
                                <div><img class="planner_item_img" src="${randomBreakfast.img != null ? randomBreakfast.img : 'images/no_img.jpg'}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${randomBreakfast.title}</span></div>
                                <div class="planner_item_actions">
                                    <span class="planner_item_actions_del">delete</span>
                                    <span class="planner_item_actions_replace">replace</span>
                                </div>
                            </div>`
        } else {
            breakfastHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Breakfast</span></div>
                                <div><img class="planner_item_img" src="images/no_img.jpg" alt=""/></div>
                                <div class="planner_item_name_wrap"><span class="add_meal">Add meal</span></div>
                            </div>`
        }
        if (lunches[i]) {
            lunchHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Lunch</span></div>
                                <div><img class="planner_item_img" src="${randomLunch.img != null ? randomLunch.img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${randomLunch.title}</span></div>
                                <div class="planner_item_actions">
                                    <span class="planner_item_actions_del">delete</span>
                                    <span class="planner_item_actions_replace">replace</span>
                                </div>
                            </div>`
        } else {
            lunchHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Lunch</span></div>
                                <div><img class="planner_item_img" src="images/no_img.jpg" alt=""/></div>
                                <div class="planner_item_name_wrap"><span class="add_meal">Add meal</span></div>
                            </div>`
        }
        if (snacks[i]) {
            snackHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Snack</span></div>
                                <div><img class="planner_item_img" src="${randomSnack.img != null ? randomSnack.img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${randomSnack.title}</span></div>
                                <div class="planner_item_actions">
                                    <span class="planner_item_actions_del">delete</span>
                                    <span class="planner_item_actions_replace">replace</span>
                                </div>
                            </div>`
        } else {
            snackHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Snack</span></div>
                                <div><img class="planner_item_img" src="images/no_img.jpg" alt=""/></div>
                                <div class="planner_item_name_wrap"><span class="add_meal">Add meal</span></div>
                            </div>`
        }
        if (dinners[i]) {
            dinnerHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Dinner</span></div>
                                <div><img class="planner_item_img" src="${randomDinner.img != null ? randomDinner.img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${randomDinner.title}</span></div>
                                <div class="planner_item_actions">
                                    <span class="planner_item_actions_del">delete</span>
                                    <span class="planner_item_actions_replace">replace</span>
                                </div>
                            </div>`
        } else {
            dinnerHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Dinner</span></div>
                                <div><img class="planner_item_img" src="images/no_img.jpg" alt=""/></div>
                                <div class="planner_item_name_wrap"><span class="add_meal">Add meal</span></div>
                            </div>`
        }
        divDay.innerHTML = breakfastHtml + lunchHtml + snackHtml + dinnerHtml;

        let deleteLink = divDay.querySelector(".planner_item_actions_del");
        let replaceLink = divDay.querySelector(".planner_item_actions_replace");
        let addMealLink = divDay.querySelector(".add_meal");

        /*deleteLink.addEventListener("click", () => {

        });
        replaceLink.addEventListener("click", () => {

        });*/
        //addMealLink.addEventListener("click", () => {

        //});
        section.appendChild(divDay);
        mainElement.appendChild(section);
    };
}
