const APILINK = 'http://localhost:5500/api/v2/recipes';
const url = new URL(location.href);
const recipeId = url.searchParams.get("id")
// const recipeName = url.searchParams.get("recipe_name")


const recipeSection = document.getElementById('single-recipe-section');
const recipeName = document.getElementById('recipe_name');

function fetchSingleRecipe() {
  fetch(`${APILINK}/${recipeId}`)
    .then(response => response.json())
    .then(recipe => {
      console.log('Received recipe:', recipe);
      displayRecipeDetails(recipe);
    })
    .catch(error => {
      console.error('Error fetching recipe:', error);
    });
}

function createRecipeElement(recipe) {

  function displayRecipeDetails(recipe) {
    recipeName.textContent = recipe.recipe_name;
    const recipeHtml = `
      <div>
        <img src="${recipe.recipe_img}" alt="${recipe.recipe_name}">
        <p>Category: ${recipe.recipe_category}</p>
        <p>Time: ${recipe.recipe_time}</p>
        <p>Tools: ${recipe.tools.join(', ')}</p>
        <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
      </div>
    `;
    recipeSection.innerHTML = recipeHtml;
  }
}



  // Call the fetchRecipeDetails function when the page loads
 window.addEventListener('load', fetchSingleRecipe);
