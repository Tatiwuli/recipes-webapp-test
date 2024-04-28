const main = document.getElementsByClassName("recipes-container");
const IMG_PATH = './assets/recipes/';
const recipesContainer = document.querySelector('.recipes-container');
const APILINK = 'http://localhost:5500/api/v2/recipes';


// RECIPES PAGE
function fetchRecipes() {
  fetch(APILINK)
    .then(response => response.json())
    .then(data => {
      console.log('Received recipes:', data);
      recipesContainer.innerHTML = ''; // Clear previous recipes
      data.forEach(recipe => {
        const recipeElement = createRecipeElement(recipe);
        recipesContainer.appendChild(recipeElement);
      });
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}



function createRecipeElement(recipe) {
  const recipeElement = document.createElement('div');
  recipeElement.classList.add('recipe');

  const recipeHtml = `
    <div>
      <a href="/recipes/${recipe._id}">
        <img src="${recipe.recipe_img}" alt="${recipe.recipe_name}">
      </a>
      <a href="single-recipe.html?id=${recipe._id}">
        <h3>${recipe.recipe_name}</h3>
      </a>
      <p>Category: ${recipe.recipe_category}</p>
      <p>Time: ${recipe.recipe_time}</p>
    </div>
  `;

  recipeElement.innerHTML = recipeHtml;
  return recipeElement;
}

// Call the fetchRecipes function when the page loads
window.addEventListener('load', fetchRecipes);

