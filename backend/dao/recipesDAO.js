import mongodb from "mongodb"


const ObjectId = mongodb.ObjectId;

let recipes

export default class RecipesDAO {
  static async injectDB(conn) {
    if (recipes) {
      return
    }
    try {
      recipes = await conn.db("test").collection("collection-test")
      console.log("Connected to test collection")
    } catch (e) {
      console.error(`Unable to establish collection handles in RecipesDAO: ${e}`)
      throw e
    }
  }
  

  static async addRecipe(recipeId, recipeCategory, recipe) {
    try {
      const recipeDoc = {
        recipeId: recipeId,
        recipeCategory: recipeCategory,
        recipe: recipe,
      }
      console.log("adding")
      return await recipes.insertOne(recipeDoc)
    } catch (e) {
      console.error(`Unable to post recipe: ${e}`)
      return { error: e }
    }
  }

  //get single recipe
  static async getRecipe(recipeId) {
    try {
      return await recipes.findOne({_id: ObjectId.createFromTime(parseInt(recipeId))});
    } catch (e) {
      console.error(`Unable to get recipe: ${e}`);
      return { error: e };
    }
  }
  

  //get Recipes
  static async getRecipes() {
    try {
      const cursor = await recipes.find({});
      return await cursor.toArray();
    } catch (e) {
      console.error(`Unable to get recipes: ${e}`);
      return { error: e };
    }
  }

  static async updateRecipe(recipeId, recipeCategory, recipe) {
    try {
      const updateResponse = await recipes.updateOne(
        {_id: ObjectId.createFromTime(parseInt(recipeId)) },
        { $set: { recipeCategory: recipeCategory, recipe: recipe } }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update recipe: ${e}`)
      return { error: e }
    }
  }

  static async deleteRecipe(recipeId) {

    try {
      const deleteResponse = await recipes.deleteOne({
        _id: ObjectId.createFromTime(parseInt(recipeId))
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete recipe: ${e}`)
      return { error: e }
    }
  }

  // static async getRecipesByMovieId(recipeId) {
  //   try {
  //     const cursor = await recipes.find({ recipeId: parseInt(recipeId) })
  //     return cursor.toArray()
  //   } catch (e) {
  //     console.error(`Unable to get recipe: ${e}`)
  //     return { error: e }
  //   }
  // }

}