window.onload = function() {
    search();
}

let searchField = document.getElementById("search-field");
let searchBtn = document.getElementById("search-btn");
let searchResult = document.getElementById("searchresult");

searchField.focus();

searchBtn.addEventListener("click", () => {
    search();
})
searchField.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
        return;
    }
    search();
})

function search() {
    searchresult.innerHTML = "";
    let inputValue = searchField.value;
    (async function() {
        try {
            response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
            if (!response.ok) {
                throw new Error("error");
            }
            console.log(response);
            data = await response.json();
            console.log(data);
            let counter = 1;
            for (meal of data.meals) {
                searchResult.innerHTML +=
                    `<div class="meal-container" style="display: none" id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="thumbnail-img">
                        <div class="meal-name-container">
                            <h3 class="meal-name">${meal.strMeal}</h3>
                        </div>
                    </div>`;
                if (counter === 9) {
                    break;
                }
                counter++;
            }
            let mealsDomArray = document.querySelectorAll(".meal-container");
            let delay = 0;
            $.each(mealsDomArray, function(i, meal) {
                setTimeout(() => {
                    $(meal).show("fade", 400);
                }, delay);
                delay += 75;
            });
        } catch (error) {
            console.log(error);
        }
    })(inputValue);
}