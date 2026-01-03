import { logout, onAuthChange } from "./auth.js";

const key = "mealsData";
const urlParams = new URLSearchParams(window.location.search);
const dateStart = urlParams.get("dateStart");
const dateEnd = urlParams.get("dateEnd");
const mainElement = document.getElementById("mainElement");
let mealsData = [];
console.log(mainElement);

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
    //console.log(dateEnd - dateStart);
    const date1 = new Date(dateEnd);
    const date2 = new Date(dateStart);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    //const todayDate = new Date();
    //date1.setHours(0,0,0,0) === todaysDate.setHours(0,0,0,0);
    for (let i = 0; i < diffDays; i++) {
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

        if (breakfasts[i]) {
            breakfastHtml = `<div class="planner_item">
                                <div><span class="planner_item_category">Breakfast</span></div>
                                <div><img class="planner_item_img" src="${breakfasts[i].img != null ? breakfasts[i].img : 'images/no_img.jpg'}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${breakfasts[i].title}</span></div>
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
                                <div><img class="planner_item_img" src="${lunches[i].img != null ? lunches[i].img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${lunches[i].title}</span></div>
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
                                <div><img class="planner_item_img" src="${snacks[i].img != null ? snacks[i].img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${snacks[i].title}</span></div>
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
                                <div><img class="planner_item_img" src="${dinners[i].img != null ? dinners[i].img : "images/no_img.jpg"}" alt=""/></div>
                                <div class="planner_item_name_wrap"><span>${dinners[i].title}</span></div>
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
