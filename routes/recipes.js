const express = require("express");
const router = express.Router();

const search_util = require("./utils/search_recipes");

router.use((req, res, next) => {
    console.log("Recipes route");
    next();
});

//routes
router.get("/search/query/:searchQuery/amount/:num", (req, res) => {
    const { searchQuery, num } = req.params;
    search_params = {};
    search_params.query = searchQuery;
    search_params.number = num;
    search_params.instructionRquired = true;

//check if queries params exists
console.log(req.query);
search_util.extractQueriesParams(req.query, search_params);

search_util
    .searchForRecipes(searchQuery, num, search_params)
    .then((info_array) => res.send(info_array))
    .catch ((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});