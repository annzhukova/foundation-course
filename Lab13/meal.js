//1- Link to get a random meal
let randomMealUrl = 'https:///www.themealdb.com/api/json/v1/1/random.php';

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

//async function getRandomMeal(){}
const getRandomMeal = async ()=>{
const resp = await fetch(randomMealUrl);
const data = await resp.json();
console.log(data);
}


getRandomMeal();
