import RecipesDAO from "../dao/recipesDAO.js"

export default class RecipesController {
  static async apiPostRecipe(req, res, next) {
    try {
      const recipeId = parseInt(req.body.recipeId)
      const recipe = req.body.recipe
      const recipeCategory = req.body.recipeCategory
      console.log('recipeid', recipeId)
      const recipeResponse = await RecipesDAO.addRecipe(
        recipeId,
        recipeCategory,
        recipe
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async getRecipe(req, res, next) {
    try {
      const recipeId = req.params.recipeId;
      const recipe = await RecipesDAO.getRecipe(recipeId);
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found" });
      }
    } catch (e) {
      console.error(`Error while retrieving recipe: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  
  static async apiGetRecipes(req, res, next) {
    try {
      const recipes = await RecipesDAO.getRecipes();
      res.json(recipes);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiUpdateRecipe(req, res, next) {
    try {
      const recipeId = req.params.id
      const recipe = req.body.recipe
      const recipeCategory = req.body.recipeCategory

      const recipeResponse = await RecipesDAO.updateRecipe(
        recipeId,
        recipeCategory,
        recipe
      )

      var { error } = recipeResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (recipeResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update recipe",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteRecipe(req, res, next) {
    try {
      const recipeId = req.params.id
      const recipeResponse = await RecipesDAO.deleteRecipe(recipeId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  
}