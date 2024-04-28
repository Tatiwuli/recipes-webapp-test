import express from "express"
import cors from "cors"
import recipes from "./api/recipes.route.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RecipesDAO from "./dao/recipesDAO.js"

// dotenv.config();
// console.log("Loaded environment variables");

// const username = process.env.MONGO_USERNAME;
// const password = process.env.MONGO_PASSWORD;
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://tatianewuli:timedrecipes-wuli@cluster0.cpdtez9.mongodb.net/`
const port = 5500;

console.log("Connecting to MongoDB...");



MongoClient.connect(
    uri,
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    })
    .then(async client => {
      console.log("Connected to MongoDB");
      await RecipesDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    });

console.log("Creating Express app...");

const app = express();

app.use(cors());
app.use(express.json());


//handle for recipes page
app.use("/api/v2/recipes", recipes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//handle for single recipe page
app.use("/api/v2/recipes/:recipeId", recipes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

console.log("Express app created");

export default app;

