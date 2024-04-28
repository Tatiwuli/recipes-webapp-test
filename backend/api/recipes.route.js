import express from "express"
import RecipesCtrl from "./recipes.controller.js"

const router = express.Router()

router.route("/").get(RecipesCtrl.apiGetRecipes);
router.route("/new").post(RecipesCtrl.apiPostRecipe)
router.route("/:recipeId").get(RecipesCtrl.getRecipe);

export default router