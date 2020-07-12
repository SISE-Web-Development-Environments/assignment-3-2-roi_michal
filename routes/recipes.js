var express = require("express");
var router = express.Router();
// const search_util = require("./utils/serchings");
const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

router.use((req, res, next) => {
    console.log("Recipes route");
    next();
});

router.get("/getRecipeByID", async (req, res, next) => {
    try {
        const recipe = await getRecipeInfo(req.query.recipe_id);
        res.send({ data: recipe.data });
    } catch (error) {
        next(error);
    }
});

// router.get("/getRecipeByIDFromDataBase", async (req, res, next) => {
//     try {

// const recipe = await DButils.getRecipeInfo(req.query.recipe_id);
//         res.send({ data: recipe.data });
//     } catch (error) {
//         next(error);
//     }
// });
//coment

router.get("/displayFullInformation", async (req, res, next) => {
    try {
        recipes_id_list = [];
        recipes_id_list.push(req.query.recipe_id)
        const recipes = await getRecipesFullInfo(recipes_id_list);
        res.send({ data: recipes });
    } catch (error) {
        next(error);
    }
});

router.get("/displayRelevantInformation", async (req, res, next) => {
    try {
        recipes_id_list = [];
        recipes_id_list.push(req.query.recipe_id)
        const recipes = await getRecipesRelevantInfo(recipes_id_list);
        res.send({ data: recipes });
    } catch (error) {
        next(error);
    }
});

router.get("/searchByTags", async (req, res, next) => {
    try {
        const { query, cuisine, diet, intolerances, number } = req.query;
        const search_response = await axios.get(`${api_domain}/search`, {
            params: {
                query: query,
                cuisine: cuisine,
                diet: diet,
                intolerances: intolerances,
                number: number,
                instructionsRequired: true,
                apiKey: process.env.spooncular_apiKey
            }
        });
        let recipes = await Promise.all(
            search_response.data.results.map((recipe_raw) =>
                getRecipeInfo(recipe_raw.id)
            )
        );
        //  recipes = recipes.map((recipe) => recipe.data);
        recipes = extractRelevantRecipeData(recipes);
        res.send({ data: recipes });
    } catch (error) {
        next(error);
    }
});

router.get("/searchByName", async (req, res, next) => {
    try {
        const { query, number } = req.query;
        const search_response = await axios.get(`${api_domain}/search`, {
            params: {
                query: query,
                number: number,
                instructionsRequired: true,
                apiKey: process.env.spooncular_apiKey
            }
        });
        let recipes = await Promise.all(
            search_response.data.results.map((recipe_raw) =>
                getRecipeInfo(recipe_raw.id)
            )
        );
        //  recipes = recipes.map((recipe) => recipe.data);
        recipes = extractRelevantRecipeData(recipes);
        res.send({ data: recipes });
    } catch (error) {
        next(error);
    }
});

router.get("/getThreeRandomRecipes", async (req, res, next) => {
    try {
        let recpies_with_intructios = [];
        while (recpies_with_intructios.length < 3) {
            const search_response = await axios.get(`${api_domain}/random`, {
                params: {
                    number: 10,
                    apiKey: process.env.spooncular_apiKey
                }
            });
            recpies_with_intructios = validRecipes(search_response);
        }
        //* extract data */
        let recipes = await Promise.all(
            recpies_with_intructios.data.recipes.map((recipe) =>
                getRecipeInfo(recipe.id)
            )
        );
        //  recipes = recipes.map((recipe) => recipe.data);
        recipes = extractRelevantRecipeData(recipes);
        res.send({ data:recipes});
    } catch (error) {
        next(error);
    }
});

function validRecipes(random_recipes) {
    let valid_recipes = [];
    random_recipes.data.recipes.forEach(recipe => {
        if (recipe.instructions && recipe.instructions.length > 0) {
            if (valid_recipes.length < 3) {
                valid_recipes.push(recipe);
            }
        }
    });
    random_recipes.data.recipes = valid_recipes;
    return random_recipes;
}

function getRecipeInfo(id) {
    return axios.get(`${api_domain}/${id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

async function getRecipesRelevantInfo(recipes_id_list) {
    let promises = [];
    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
        promises.push(axios.get(`${api_domain}/${id}/information`, {
            params: {
                includeNutrition: false,
                apiKey: process.env.spooncular_apiKey
            }
        }))
    );
    let info_response1 = await Promise.all(promises);
    relevantRecipesData = extractRelevantRecipeData(info_response1);
    return relevantRecipesData;
}

async function getRecipesFullInfo(recipes_id_list) {
    let promises = [];
    //for each id -> get promise of GET response
    recipes_id_list.map((id) =>
        promises.push(axios.get(`${api_domain}/${id}/information`, {
            params: {
                includeNutrition: false,
                apiKey: process.env.spooncular_apiKey
            }
        }))
    );
    let info_response1 = await Promise.all(promises);
    relevantRecipesData = extractFullRecipeData(info_response1);
    return relevantRecipesData;
}

function extractRelevantRecipeData(recipes_info) {
    return recipes_info.map((recipe_info) => {
        const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegan,
            glutenFree,
            image,
        } = recipe_info.data;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image
        };
    });
}

function extractFullRecipeData(recipes_info) {
    return recipes_info.map((recipe_info) => {

        const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegan,
            glutenFree,
            image,
            instructions,
            servings,
            extendedIngredients,
        } = recipe_info.data;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
            instructions: instructions,
            servings: servings,
            extendedIngredients: extendedIngredients,
        };
    });
}




module.exports = router;
