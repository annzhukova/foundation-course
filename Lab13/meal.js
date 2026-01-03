//1- Link to get a random meal
let randomMealUrl = 'https:///www.themealdb.com/api/json/v1/1/random.php';
let searchUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=


/*const getRandomMeal = () => {
    const resp = fetch(randomMealUrl);
    //console.log(resp);
    resp.then((item)=> {
        let cleanedItem = item.json();
        return cleanedItem;
        
    }).then((data)=>console.log(data))
}
*/

/*const getRandomMeal = () => {
    fetch(randomMealUrl)
    .then((item)=>item.json())
    .then((data)=>console.log(data.meals[0]))
    .catch((err)=>console.log("There was an issue in the fetching ", err));
}*/
const mealsElement = document.getElementById("meals");
const favorites = document.querySelector('.favorites');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

//async function getRandomMeal(){}
const getRandomMeal = async ()=>{
const resp = await fetch(randomMealUrl);
const data = await resp.json();
//console.log(data);
const randomMeal = data.meals[0];
mealsElement.innerHTML = "";
addMeal(randomMeal, true);
}

function addMeal(mealData, random=false){
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `<div class="meal-header">
                            ${random?`<span class="random">Meal of the Day</span>`:""}
                            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                        </div>
                        <div class="meal-body">
                                <h3>${mealData.strMeal}</h3>
                                <button class="fav-btn">
                                    <i class="fas fa-heart"></i>
                                </button>
                        </div>`;
    let favoriteButton = meal.querySelector(".fav-btn");
    favoriteButton.addEventListener("click", ()=>{
        if (favoriteButton.classList.contains('active')){
            //We need to deactivate the button (make the color back to gray)
            //favoriteButton.classList.remove('active');
            removeMealFromLocalStorage(mealData.idMeal);
        } else {
            //We need to activate the button (make the color red)
            //favoriteButton.classList.add('active');
            addMealToLocalStorage(mealData.idMeal);
        }
        //toggle instead of adding and deleting 'active' class 
        favoriteButton.classList.toggle('active');
        updateFavoriteMeals();
    })
    mealsElement.appendChild(meal);   
    //update favotite block
       
    const mealHeader = meal.querySelector('.meal-header');
    mealHeader.addEventListener('click', ()=>{
        openMealDetailsPage(mealData);
    })              
}

const initMain = () => {
    getRandomMeal();
    updateFavoriteMeals();
    searchBtn.addEventListener('click', ()=>{
    const searchWord = searchTerm.value;
    //console.log(searchWord);
    searchForMeal(searchWord);

    })

    searchTerm.addEventListener('input', ()=>{
        const searchWord = searchTerm.value;
        console.log(searchWord);
        searchForMeal(searchWord);

    })
}





//displaying search meals
const searchForMeal = async (word) => {
    const searchResults = await getMealsBySearch(word);
    //console.log(searchResults);
    mealsElement.innerHTML = "";
    if (searchResults)
    searchResults.forEach((meal)=>addMeal(meal));
}

//searching the meals
const getMealsBySearch = async (word) => {
    const resp = await fetch(searchUrl + word);
    const data = await resp.json();
    const output = data.meals;
    console.log(output);
    return output;
}

function addMealToLocalStorage(mealId) 
{
    const mealIds = getMealsfromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLocalStorage(mealId) 
{
    const mealIds = getMealsfromLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify(
        mealIds.filter(id => id != mealId)
    ))
}

function getMealsfromLocalStorage() 
{
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null?[]:mealIds;
}

const updateFavoriteMeals = () => {
    favorites.innerHTML = "";
    const mealIds = getMealsfromLocalStorage();
    //console.log(mealIds);
    let meals = [];
    mealIds.forEach(async (meal) => {
        let tmpMeal = await getMealByID(meal);
        meals.push(tmpMeal);

        addMealToFavorites(tmpMeal);
        //console.log(meal);
       
    })
}

const getMealByID = async (id) => {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const data = await resp.json();
    //console.log(data.meals[0]);
    const output = data.meals[0];

    return output;
}

const addMealToFavorites = (mealData) => {
    
    let favoriteMeal = document.createElement('li');
    favoriteMeal.innerHTML = `<img id="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                            <span>${mealData.strMeal}</span>
                            <button class="clear"><i class="fas fa-window-close"></i></button>`;
    
    const clearButton = favoriteMeal.querySelector('.clear');
    clearButton.addEventListener('click', ()=>{
        removeMealFromLocalStorage(mealData.idMeal);
        updateFavoriteMeals();
    })

    favorites.appendChild(favoriteMeal);
    const favImg = favoriteMeal.querySelector('#fav-img');  
    const favoriteImg = favoriteMeal.firstChild;
    favImg.addEventListener('click', ()=>{
        console.log(mealData);
       openMealDetailsPage(mealData);
    })                   
}

const openMealDetailsPage = (meal)=>{
    console.log(meal.idMeal);
    window.open("details.html?mealId="+meal.idMeal);
}

const initDetailsPage = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    let mealId = urlParams.get('mealId');
    console.log(mealId);
}