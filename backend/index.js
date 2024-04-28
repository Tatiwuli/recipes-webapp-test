import app from "./backend/server.js";
import mongodb from "mongodb"
import RecipesDAO from "./backend/dao/recipesDAO.js"


// require('dotenv').config();
// const username = process.env.MONGO_USERNAME;
// const password = process.env.MONGO_PASSWORD;

const MongoClient = mongodb.MongoClient
const uri = `mongodb+srv://tatianewuli:timedrecipes-wuli@cluster0.cpdtez9.mongodb.net/`
const port = 5500;


MongoClient.connect(
    uri,
    {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true
    })
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
        await RecipesDAO.injectDB(client)
      app.listen(port, () => {
        console.log(`listening on port ${port}`)
      })
    })